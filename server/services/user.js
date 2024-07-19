const { User, insert, find, findOne, updateOne } = require("../models/userModel");
const { getSignedUrlForObject, uploadImage, deleteImage } = require("../utils/s3Client");
const sharp = require('sharp'); // to resize the image
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { addToElastic, updateElastic, searchFromElastic } = require("../utils/elasticSearch");
require('dotenv').config();
const config = require('config');


const indexName = config.get('indexName');

// Get all users on that Page
const getAllUsers = async (page, limit, query) => {
    try {
        const skipValue = (page - 1) * limit;
        // Use Elasticsearch to search for users based on the query
        const result = await searchFromElastic(indexName, query, skipValue);

        if (result.ok) {
            // Extract found users and total count from Elasticsearch response
            let foundUsers = result.data.foundusers
                .map(hit => ({
                    _id: hit._id,
                    ...hit._source
                }));
            const total = result.data.total;

            // Get signed URLs for all images in the result
            const usersWithUrls = await Promise.all(foundUsers.map(async (user) => {
                const url = await getSignedUrlForObject(user.imageName);
                user.imgUrl = url;
                return user;
            }));

            return { ok: true, data: { users: usersWithUrls, total } };
        } else {
            return { ok: false, error: result.error };
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
    const session = await User.startSession();
    session.startTransaction();

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser && !existingUser.isDeleted) {
            console.log("Email already exists.");
            await session.abortTransaction();
            session.endSession();
            return { ok: false, error: "Email already exists" };
        }

        // Resize the image -> height and width given in CSS
        const buffer = await sharp(file.buffer).resize({ height: 250, width: 268, fit: "cover" }).toBuffer();

        // Upload image to S3 bucket
        const imageName = await uploadImage(buffer, file.mimetype);

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        let user;
        if (existingUser && existingUser.isDeleted) {
            // Update the existing user
            existingUser.name = name;
            existingUser.imageName = imageName;
            existingUser.password = hashedPassword;
            existingUser.isDeleted = false;
            user = await existingUser.save({ session });
        } else {
            // Create a new user
            const newUser = new User({
                name,
                email,
                imageName,
                password: hashedPassword
            });
            user = await newUser.save({ session });
        }

        const { password, ...info } = user._doc; // send all fields except password

        // Add or update in Elasticsearch
        const result = await addToElastic(indexName, { name: user.name, email: user.email, imageName: user.imageName, isDeleted: user.isDeleted }, user._id.toString());

        if (!result.ok) {
            // console.log("Rolling back");
            await session.abortTransaction();
            session.endSession();
            return { ok: false, error: result.error };
        }

        await session.commitTransaction();
        session.endSession();

        return { ok: true, data: { ...info } };

    } catch (error) {
        console.log("Error adding user:", error);
        await session.abortTransaction();
        session.endSession();
        return { ok: false, error: "Something went wrong" };
    }
}



// Delete user
const deleteUser = async (userId) => {
    const session = await User.startSession();
    session.startTransaction();

    try {
        const user = await findOne({ query: { _id: userId } }).session(session);
        if (!user || user.isDeleted) {
            await session.abortTransaction();
            session.endSession();
            return { ok: false, error: "No user found with given Id" };
        }

        await User.updateOne({ _id: userId }, { isDeleted: true }, { session });

        // Update in Elasticsearch
        const response = await updateElastic(indexName, user._id.toString());

        if (!response.ok) {
            // console.log("Rollback in delete");
            await session.abortTransaction();
            session.endSession();
            return { ok: false, error: response.error };
        }

        await session.commitTransaction();
        session.endSession();

        return { ok: true, data: user };
    } catch (error) {
        console.log("Error deleting user:", error);
        await session.abortTransaction();
        session.endSession();
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
            return { ok: false, error: "Wrong username of password!" }
        }

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "5h" }
        );

        const url = await getSignedUrlForObject(user.imageName);
        user.imgUrl = url;

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