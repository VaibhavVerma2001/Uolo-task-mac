const mongoose = require("mongoose");
require('dotenv').config();


mongoose.set('strictQuery', false);
const url = process.env.MONGO_URL;

// Connect with database -> seperate
mongoose.connect(url)
    .then(function () {
        console.log('Successfully connected to Database...');
    })
    .catch(function (err) {
        console.log("Error while connecting to Database ",err);
    });