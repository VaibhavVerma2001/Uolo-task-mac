const userService = require("../services/user");
const { isValidEmail, isValidObjectId, isNullOrUndefined } = require(("../utils/inputValidation"));
require('dotenv').config();


// Get all users on that Page
const getAllUsers = async (req, res) => {
    try {
        let { limit, page } = req.query;
        limit = parseInt(limit) || 8;
        page = parseInt(page);

        // Handle invalid or missing page parameter
        if (isNaN(page) || page < 1) {
            return res.status(400).json({ success: false, error: "Invalid page" });
        }
        if (limit < 1) {
            return res.status(400).json({ success: false, error: "Invalid limit" });
        }

        const result = await userService.getAllUsers(page, limit);

        if (!result.ok) {
            return res.status(500).json({ success: false, error: result.error });
        }

        const { users, total } = result.data;

        return res.status(200).json({ success: true, users, total });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something Went Wrong!", error: err });
    }
};


//Get specific user
const getUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ success: false, msg: "Invalid User Id" });
        }

        const result = await userService.getUser(userId);

        if (!result.ok) {
            console.log(result.error);
            return res.status(500).json({ success: false, error: result.error });
        }

        const foundUser = result.data;

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
        if (isNullOrUndefined(name) || isNullOrUndefined(email)) {
            console.log("Name and Email are required.")
            return res.status(206).json({ success: false, error: "Name and Email are required." })
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, error: "Invalid Email." });
        }

        if (!req.file) {
            console.log("Image is required");
            return res.status(400).json({ success: false, error: "Image is required." });
        }

        // Add image to S3 bucket
        // console.log("req.body is : ",req.body);
        // console.log("req.file is : ", req.file);
        // console.log(req.file.buffer); //  this is the actual image we need to upload on s3
        // console.log(req.file.mimetype); format of the file


        const result = await userService.addUser(name, email, req.file);

        if (!result.ok) {
            return res.status(400).json({ success: false, error: result.error });
        }

        const newUser = result.data;

        console.log("New User Added.");
        res.status(201).json({ success: true, newUser });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, msg: "Something Went Wrong!", error: error.message });
    }
};



// Delete user
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ success: false, msg: "Invalid User Id" });
        }

        const result = await userService.deleteUser(userId);

        if (!result.ok) {
            return res.status(500).json({ success: false, error: result.error });
        }

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