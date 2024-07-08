var users = require("../contant/userData");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const userService = require("../services/userService");
const sharp = require('sharp'); // to resize the image
const { getSignedUrlForObject, uploadImage, deleteImage } = require("../utils/s3Client");

require('dotenv').config();


// Get all users on that Page
const getAllUsers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;
        let page = parseInt(req.query.page);

        // Handle invalid or missing page parameter
        if (isNaN(page) || page < 1) {
            return res.status(400).json({ success: false, error: "Invalid page" });
        }
        if (limit < 1) {
            return res.status(400).json({ success: false, error: "Invalid limit" });
        }

        const { users, total } = await userService.getAllUsers(page, limit);

        // get signed url for all images in the post
        for (const user of users) {
            const url = await getSignedUrlForObject(user.imageName);
            user.imgUrl = url;
        }

        return res.status(200).json({ success: true, users, total });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something Went Wrong!", error: err });
    }
};


//Get specific user
const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Use built-in function for checking ObjectID.
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, msg: "Invalid User Id" });
        }

        const foundUser = await userService.getUser(userId);

        // Get signed URL for image
        const url = await getSignedUrlForObject(foundUser.imageName);
        foundUser.imgUrl = url;


        if (!foundUser) {
            console.log("No user found with given Id!");
            return res.status(200).json({ success: false, "msg": "No user found with given Id!" });
        }

        return res.status(200).json({ success: true, foundUser });
    } catch (err) {
        res.status(500).json({ msg: "Something Went Wrong!", error: err })
        console.log(err);
    }
};


// Add new user
const addUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            // 206 code is for partial content
            console.log("Name and Email are required.")
            return res.status(206).json({ success: false, error: "Name and Email are required." })
        }

        if (typeof name !== 'string' || typeof email !== 'string') {
            return res.status(400).json({ success: false, error: "Name and Email must be strings." });
        }

        //check valid email
        let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

        if (!regex.test(email)) {
            return res.status(400).json({ success: false, error: "Invalid Email." });
        }

        if(!req.file){
            console.log("Image is required");
            return res.status(400).json({ success: false, error: "Image is required." });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already exists.")
            return res.status(400).json({ success: false, error: "Email already exists" });
        }

        // Add image to S3 bucket
        // console.log("req.body is : ",req.body);
        // console.log("req.file is : ", req.file);
        // console.log(req.file.buffer); //  this is the actual image we need to upload on s3
        // console.log(req.file.mimetype); format of the file

        // resize the image -> height and width given in css
        const buffer = await sharp(req.file.buffer).resize({ height: 250, width: 268, fit: "cover" }).toBuffer();

        // Upload image to S3 bucket
        const imageName = await uploadImage(buffer, req.file.mimetype);

        const newUser = await userService.addUser(name, email, imageName);

        console.log("New User Added.");
        res.status(201).json({ success: true, newUser });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Something Went Wrong!", error: error.message })
    }
};



// Delete user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Use built-in function for checking ObjectID.
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, msg: "Invalid User Id" });
        }

        let user = await userService.deleteUser(userId);

        if (user.isDeleted ) {
            return res.status(400).json({ success: false, msg: "No user found with given userId." });
        }

        // Delete image from S3 bucket
        await deleteImage(user.imageName);

        await User.findByIdAndUpdate(userId,{isDeleted : true});

        console.log("User Deleted.");
        res.status(200).json({ success: true, msg: `User with id :${userId}, deleted successfully!` });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something Went Wrong!", error: err });
    }
};

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    deleteUser
};