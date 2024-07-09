const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    imgUrl: {
        type: String 
    },
    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        unique : true,
        required: true
    },
    imageName : {
        type : String,
        required : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},
    // to store time by default
    { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

module. exports = {
    User,
    insert : ({insertDict}) => new User(insertDict).save(),
    find : ({query}) => User.find(query),
    findOne : ({query}) => User.findOne(query),
    updateOne : ({query, updateDict}) => User.updateOne(query,updateDict),
    updateMany : ({query, updateDict}) => User.updateMany(query,updateDict)
}