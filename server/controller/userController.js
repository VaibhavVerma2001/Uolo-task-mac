var users = require("../contant/userData");

// Get all users on that Page
const getAllUsers = async(req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;
        const page = parseInt(req.query.page) || 1;
        
        // Handle Invalid page and limits
        if(page < 1){
            return res.status(400).json({error : "Invalid page"});
        }

        if(limit < 1){
            return res.status(400).json({error : "Invalid limit"});
        }

        
        let startIndex = (page - 1) * limit;
        let endIndex = startIndex + limit;

        let total = users.length;
        const user = users.slice(startIndex,endIndex);
        return res.status(200).json({user, total});

    } catch (err) {
        res.status(500).json({ msg: "Something Went Wrong!", error: err })
        console.log(err);
    }
};


//Get specific user
const getUser = async (req, res) => {
    const userId = req.params.userId;

    let FoundUser = users.filter((user) => { return userId == user.id });

    if (!FoundUser.length) {
        console.log("No user found with given Id!");
        return res.status(200).json({ "msg": "No user found with given Id!" });
    }

    return res.status(200).json(FoundUser);
};



// Add new user
const addUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            // 206 code is for partial content
            console.log("Name and Email are required.")
            return res.status(206).json("Name and Email are required.")
        }

        // to add new id by doing +1 to existing users
        let id = users.length + 1;

        let newUser = {
            id,
            name,
            email
        }

        users.push(newUser);
        console.log("New User Added.");
        res.status(201).json(newUser);

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something Went Wrong!", error: err })
    }
};



// Delete user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        let updatedUsers = users.filter((user) => { return user.id != userId })
        users = updatedUsers;
        console.log(`User with id :${userId}, deleted successfully!`,users.length);
        res.status(200).json({msg :`User with id :${userId}, deleted successfully!`});

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