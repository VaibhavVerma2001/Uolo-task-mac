const { User, insert, find, findOne, updateOne, updateMany } = require("../models/userModel");
const { getSignedUrlForObject, uploadImage, deleteImage } = require("../utils/s3Client");
const sharp = require('sharp'); // to resize the image


// Get all users on that Page
const getAllUsers = async (page, limit) => {
    try {
        const skipValue = (page - 1) * limit;

        // count total number of documents whose isDeleted is false for adding pages in frontend
        const total = await User.countDocuments({ isDeleted: false });

        const users = await User.find({ isDeleted: false }).limit(limit).skip(skipValue);

        // get signed url for all images in the post
        const usersWithUrls = await Promise.all(users.map(async (user) => {
            const url = await getSignedUrlForObject(user.imageName);
            user.imgUrl = url;
            return user;
        }));

        return { ok: true, data: { users : usersWithUrls, total } };

    } catch (err) {
        console.log("Error getting all users:", err);
        return { ok: false, error: "Something went wrong" };
    }
};


// Get specific user
const getUser = async (userId) => {
    try {
        const foundUser = await findOne({ query: { _id: userId } });

        if(!foundUser) {
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
const addUser = async (name, email, file) => {
    try {
        // Check if email already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            console.log("Email already exists.")
            return { ok: false, error: "Email already exists" };
        }

        // resize the image -> height and width given in css
        const buffer = await sharp(file.buffer).resize({ height: 250, width: 268, fit: "cover" }).toBuffer();

        // Upload image to S3 bucket
        const imageName = await uploadImage(buffer, file.mimetype);
        const newUser = await insert({ insertDict: { name, email, imageName } });

        return { ok: true, data: newUser };

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

        // Delete image from S3 bucket
        
        // await deleteImage(user.imageName);
        // await User.updateOne({_id : userId} ,{ isDeleted: true });

        await Promise.all([
            deleteImage(user.imageName),
            User.updateOne({ _id: userId }, { isDeleted: true })
        ]);
        return { ok: true, data: user };
    } catch (error) {
        console.log("Error deleting user:", error);
        return { ok: false, error: "Something went wrong" };
    }
}


module.exports = {
    getAllUsers,
    getUser,
    addUser,
    deleteUser
}