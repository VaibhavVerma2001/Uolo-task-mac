const mongoose = require("mongoose");
require('dotenv').config();


mongoose.set('strictQuery', false);
const url = "mongodb+srv://vaibhav_verma:Vaibhav2001@cluster0.2dazz.mongodb.net/Uolo-task?retryWrites=true&w=majority&appName=Cluster0";

// Connect with database
mongoose.connect(url)
    .then(function () {
        console.log('Successfully connected to Database User Schema ...');
    })
    .catch(function (err) {
        console.log(err);
    });


const userSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        default : "https://winaero.com/blog/wp-content/uploads/2017/12/User-icon-256-blue.png"
    },
    name : {
        type : String
    },
    email : {
        type : String,
        unique : true
    }
},
    // to store time by default
    { timestamps: true }
);



const User = new mongoose.model("User", userSchema);


module.exports = User;