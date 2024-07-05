var users = require("../contant/userData");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const userService = require("../services/userService");
const crypto = require("crypto"); //to generate a unique file name
const sharp = require('sharp'); // to resize the image

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

require('dotenv').config();



// default 32 bytes
const randomImageName = (bytes = 32) => {
    return crypto.randomBytes(bytes).toString('hex');
}

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;


// create new s3 object
const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
});


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
            const getObjectParams = {
                Bucket: bucketName,
                Key: user.imageName
            };

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
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

        // get signed url for all images in the post
        const getObjectParams = {
            Bucket: bucketName,
            Key: foundUser.imageName
        };

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
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

        // resize the image -> height and width given in css
        const buffer = await sharp(req.file.buffer).resize({ height: 250, width: 268, fit: "cover" }).toBuffer();

        const imageName = randomImageName();

        const params = {
            Bucket: bucketName,
            Key: imageName,
            Body: buffer,
            ContentType: req.file.mimetype
        }
        const command = new PutObjectCommand(params);

        // this is asynchronous so await
        await s3.send(command);

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

        if (!user) {
            return res.status(400).json({ success: false, msg: "No user found with given userId." });
        }

        // delete image from s3 bucket
        const params = {
            Bucket: bucketName,
            Key: user.imageName
        }
        const command = new DeleteObjectCommand(params);
        await s3.send(command);

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