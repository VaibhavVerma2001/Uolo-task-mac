const userService = require("../services/user");
const { isValidEmail, isValidObjectId, isNullOrUndefined } = require(("../utils/inputValidation"));
require('dotenv').config();
const config = require('config');


// Get all users on that Page
const getAllUsers = async (req, res) => {
    try {
        let { limit, page } = req.query;
        limit = parseInt(limit) || config.get('limit');
        page = parseInt(page);

        // Handle invalid or missing page parameter
        if (isNaN(page) || page < 1) {
            return res.invalid({ msg: "Invalid page" });
        }
        if (limit < 1) {
            return res.invalid({ msg: "Invalid limit" });
        }

        const result = await userService.getAllUsers(page, limit);

        if (!result.ok) {
            return res.failure({ msg: result.error });
        }

        const { users, total } = result.data;

        return res.success({ data: { users, total } });

    } catch (err) {
        console.log(err);
        res.failure({ msg: "Something Went Wrong!" });
    }
};


//Get specific user
const getUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!isValidObjectId(userId)) {
            return res.invalid({ msg: "Invalid User Id" });
        }

        const result = await userService.getUser(userId);

        if (!result.ok) {
            return res.failure({ msg: result.error });
        }

        const foundUser = result.data;

        return res.success({ data: { foundUser } });
    } catch (err) {
        console.log(err);
        res.failure({ msg: "Something Went Wrong!" });
        
    }
};


// Add new user
const addUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (isNullOrUndefined(name) || isNullOrUndefined(email)) {
            return res.invalid({ msg: "Name and Email are required." });
        }

        if (!isValidEmail(email)) {
            return res.invalid({ msg: "Invalid Email." });
        }

        if (!req.file) {
            return res.invalid({ msg: "Image is required." });
        }

        // Add image to S3 bucket
        // console.log("req.body is : ",req.body);
        // console.log("req.file is : ", req.file);
        // console.log(req.file.buffer); //  this is the actual image we need to upload on s3
        // console.log(req.file.mimetype); format of the file


        const result = await userService.addUser(name, email, req.file);

        if (!result.ok) {
            return res.failure({ msg: result.error });
        }

        const newUser = result.data;

        console.log("New User Added.");
        res.success({ data: { newUser } });

    } catch (error) {
        console.log(error.message);
        res.failure({ msg: "Something Went Wrong!" });
    }
};



// Delete user
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!isValidObjectId(userId)) {
            return res.invalid({ msg: "Invalid User Id" });
        }

        const result = await userService.deleteUser(userId);

        if (!result.ok) {
            return res.failure({ msg: result.error });
        }

        console.log("User Deleted.");
        res.success({ data: { msg: `User with id :${userId}, deleted successfully!` } });

    } catch (err) {
        console.log(err);
        res.failure({ msg: "Something Went Wrong!" });
    }
};

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    deleteUser
};