const { User, insert, find, findOne, updateOne, updateMany } = require("../models/userModel");
const { getSignedUrlForObject, uploadImage, deleteImage } = require("../utils/s3Client");
const sharp = require('sharp'); // to resize the image
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { addDocument, updateDocument, searchDocuments } = require("../utils/elasticSearch");
require('dotenv').config();
const config = require('config');


const indexName = config.get('indexName');

// Get all users on that Page
const getAllUsers = async (page, limit, query) => {
    try {
        if (query) {
            const skipValue = (page - 1) * limit;
            // Use Elasticsearch to search for users based on the query
            const esResult = await searchDocuments(indexName, query);

            if (esResult.ok) {
                // Extract found users and total count from Elasticsearch response
                let foundUsers = esResult.data.foundusers
                    .filter(hit => !hit._source.isDeleted) // Filter out deleted users
                    .map(hit => ({
                        _id: hit._id,
                        ...hit._source
                    }));
                const total = esResult.data.total;

                // Slice the results for pagination
                foundUsers = foundUsers.slice(skipValue, skipValue + limit);

                // Get signed URLs for all images in the result
                const usersWithUrls = await Promise.all(foundUsers.map(async (user) => {
                    const url = await getSignedUrlForObject(user.imageName);
                    user.imgUrl = url;
                    return user;
                }));
                
                return { ok: true, data: { users: usersWithUrls, total } };
            } else {
                return { ok: false, error: esResult.error };
            }
        }
        // if no search is provided
        else {
            const skipValue = (page - 1) * limit;

            // Define the aggregation pipeline
            const pipeline = [
                {
                    $match: { isDeleted: false }
                },
                {
                    $facet: {
                        total: [{ $count: "count" }],
                        users: [
                            { $skip: skipValue },
                            { $limit: limit }
                        ]
                    }
                }
            ];

            // Execute the aggregation
            const result = await User.aggregate(pipeline);

            // Extract the total count and users
            const total = result[0].total[0] ? result[0].total[0].count : 0;
            const users = result[0].users;


            // get signed url for all images in the post
            const usersWithUrls = await Promise.all(users.map(async (user) => {
                const url = await getSignedUrlForObject(user.imageName);
                user.imgUrl = url;
                return user;
            }));

            return { ok: true, data: { users: usersWithUrls, total } };
        }

    } catch (err) {
        console.log("Error getting all users:", err);
        return { ok: false, error: "Something went wrong" };
    }
};


// Get specific user
const getUser = async (userId) => {
    try {
        const foundUser = await findOne({ query: { _id: userId } });

        if (!foundUser) {
            return { ok: false, error: "No user found with given Id" };
        }

        // Get signed URL for image
        const url = await getSignedUrlForObject(foundUser.imageName);
        foundUser.imgUrl = url;

        return { ok: true, data: foundUser };
    } catch (err) {
        console.log("Error getting user:", err);
        return { ok: false, error: "Something went wrong" };
    }
};


// Add new user
const addUser = async (name, email, file, userPassword) => {
    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already exists.")
            return { ok: false, error: "Email already exists" };
        }
        // resize the image -> height and width given in css
        const buffer = await sharp(file.buffer).resize({ height: 250, width: 268, fit: "cover" }).toBuffer();

        // Upload image to S3 bucket
        const imageName = await uploadImage(buffer, file.mimetype);

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);
        const newUser = new User({
            name,
            email,
            imageName,
            password: hashedPassword
        });

        const user = await insert({ insertDict: newUser });

        const { password, ...info } = user._doc; // send all fields except password

        // add in elastic search
        const result = await addDocument(indexName, { name: user.name, email: user.email, imageName: user.imageName, isDeleted: user.isDeleted }, user._id.toString());

        if (!result.ok) {
            // Rollback from mongoDB
            console.log("Rolling back");
            await User.findByIdAndDelete(user._id);
            return { ok: false, error: result.error };
        }

        return { ok: true, data: { ...info } };

    } catch (error) {
        console.log("Error adding user:", error);
        return { ok: false, error: "Something went wrong" };
    }
}


// Delete user
const deleteUser = async (userId) => {
    try {
        const user = await findOne({ query: { _id: userId } });
        if (!user || user.isDeleted) {
            return { ok: false, error: "No user found with given Id" };
        }

        await User.updateOne({ _id: userId }, { isDeleted: true });

        // update in elastic search 
        const response = await updateDocument(indexName, user._id);

        if (!response.ok) {
            // Rollback from mongoDB -> make it non deleted
            console.log("Rollback in delete");
            await User.updateOne({ _id: userId }, { isDeleted: false })
            return { ok: false, error: response.error };
        }

        return { ok: true, data: user };
    } catch (error) {
        console.log("Error deleting user:", error);
        return { ok: false, error: "Something went wrong" };
    }
}


const userLogin = async (email, userPassword) => {
    try {
        const user = await User.findOne({ email: email });

        if (!user || user.isDeleted) {
            return { ok: false, error: "User not found or has been deleted." };
        }

        //compare entered password with that found user hashed password
        const passwordCompare = await bcrypt.compare(userPassword, user.password); //returns true or false
        if (!passwordCompare) {
            return { ok: false, error: "Login with correct credentials!" }
        }

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "5d" }
        );

        const { password, ...info } = user._doc; // send all fields except password
        return { ok: true, data: { ...info, accessToken } };

    } catch (error) {
        console.log("Error while login : ", error);
        return { ok: false, error: "Something went wrong" };
    }

}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    deleteUser,
    userLogin
}