var users = require("../contant/userData");
const User = require("../db/user");
const mongoose = require("mongoose");

// Add defauilt users
const defaultData = async () => {
    try {
        const data = await User.insertMany(users);
        console.log("Default data saved successfully.", data.length);
    } catch (err) {
        console.log(err);
    }
}

// defaultData();


// Get all users on that Page
const getAllUsers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;
        let page = parseInt(req.query.page);

        // Handle invalid or missing page parameter
        if (isNaN(page) || page < 1) {
            return res.status(400).json({ success: false, error: "Invalid page" });
        }

        const skipValue = (page - 1) * limit;

        if (limit < 1) {
            return res.status(400).json({ success: false, error: "Invalid limit" });
        }

        // count total number of documents for adding pages in frontend
        let total = await User.countDocuments();

        const user = await User.find().limit(limit).skip(skipValue);
        return res.status(200).json({ success: true, user, total });

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

        const foundUser = await User.findById(userId);

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

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "Email already exists." });
        }

        // Create a new user instance
        const newUser = new User(req.body);

        // Save the new user to the database
        await newUser.save();

        console.log("New User Added.");
        res.status(201).json({ success: true, newUser });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something Went Wrong!", error: err })
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

        let deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(400).json({ success: false, msg: "No user found with given userId." });
        }
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