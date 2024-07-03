const router = require("express").Router();
var users = require("../contant/userData");
const {getAllUsers, getUser, addUser, deleteUser} = require("../controller/userController");

// Get all users
router.get("/", getAllUsers);

// Get particular user by his id
router.get("/:userId", getUser);

// Add new user
router.post("/", addUser);

// delete user with specific Id
router.delete("/:userId", deleteUser);


module.exports = router;