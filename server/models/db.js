const mongoose = require("mongoose");
require('dotenv').config();
const config = require('config');


mongoose.set('strictQuery', false);
const url = config.get('mongo_url');

// Connect with database -> seperate
mongoose.connect(url)
    .then(function () {
        console.log('Successfully connected to Database...');
    })
    .catch(function (err) {
        console.log("Error while connecting to Database ",err);
    });