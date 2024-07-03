const User = require("../models/userModel");


// Get all users on that Page
exports.getAllUsers = async (page, limit) => {
    try {

        const skipValue = (page - 1) * limit;

        // count total number of documents for adding pages in frontend
        let total = await User.countDocuments();

        const user = await User.find().limit(limit).skip(skipValue);
        return { user, total };

    } catch (err) {
        console.log("Error getting all users:", err);
        throw new Error("Something went wrong");
    }
};


// Get specific user
exports.getUser = async (userId) => {
    try {
        const foundUser = await User.findById(userId);
        return foundUser;
    } catch (err) {
        console.log("Error getting user:", err);
        throw new Error("Something went wrong");
    }
};


// Add new user
exports.addUser = async (body) => {
    try {
        // Create a new user instance
        const newUser = new User(body);

        // Save the new user to the database
        await newUser.save();
        return newUser;

    } catch (error) {
        console.log("Error adding user:", error);
        throw new Error("Something went wrong");
    }
}


// Delete user
exports.deleteUser = async (userId) =>{
    try {
        let deletedUser = await User.findByIdAndDelete(userId);
        return deletedUser;
    } catch (error) {
        console.log("Error deleting user:", error);
        throw new Error("Something went wrong");
    }
}