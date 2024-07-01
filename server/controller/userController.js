var users = require("../contant/userData");


// Get all users on that Page
const getAllUsers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;
        const page = parseInt(req.query.page) || 1;

        // Handle Invalid page and limits
        if (isNaN(page) || page < 1) {
            return res.status(400).json({ success : false, error: "Invalid page" });
        }

        if (isNaN(limit) || limit < 1) {
            return res.status(400).json({success : false, error: "Invalid limit" });
        }

        let startIndex = (page - 1) * limit;
        let endIndex = startIndex + limit;

        let total = users.length;
        const user = users.slice(startIndex, endIndex);
        return res.status(200).json({success : true, user, total });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something Went Wrong!", error: err });
    }
};


//Get specific user
const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Validate userId
        if (!userId || isNaN(userId)) {
            return res.status(400).json({success : false, error: "Invalid userId. It must be a number." });
        }

        let FoundUser = users.find((user) => { return user.id === parseInt(userId) });

        if (!FoundUser) {
            console.log("No user found with given Id!");
            return res.status(200).json({success : false, "msg": "No user found with given Id!" });
        }

        return res.status(200).json({success : true, FoundUser});
    } catch (error) {
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
            return res.status(206).json({success : false, error: "Name and Email are required." })
        }

        if (typeof name !== 'string' || typeof email !== 'string') {
            return res.status(400).json({success : false, error: "Name and Email must be strings." });
        }

        //check valid email
        let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

        if (!regex.test(email)) {
            return res.status(400).json({success : false, error: "Invalid Email."});
        }

        // Check if email already exists
        if (users.some(user => user.email === email)) {
            return res.status(400).json({success : false, error: "Email already exists." });
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
        res.status(201).json({success: true, newUser});

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something Went Wrong!", error: err })
    }
};



// Delete user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Validate userId
        if (!userId || isNaN(userId)) {
            return res.status(400).json({success : false, error: "Invalid userId. It must be a number." });
        }

        let updatedUsers = users.filter((user) => { return user.id != userId })

        users = updatedUsers;

        // console.log(`User with id :${userId}, deleted successfully!`, users.length);
        res.status(200).json({success: true, msg: `User with id :${userId}, deleted successfully!` });

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