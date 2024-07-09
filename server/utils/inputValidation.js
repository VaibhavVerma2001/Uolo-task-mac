const mongoose = require("mongoose");

// Function to validate email format
const isValidEmail = (email) => {
    const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return regex.test(email);
};

// Function to check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

// Function to check if a value is null or undefined
const isNullOrUndefined = (value) => {
    return value === null || value === undefined;
};

module.exports = {
    isValidEmail,
    isValidObjectId,
    isNullOrUndefined
};
