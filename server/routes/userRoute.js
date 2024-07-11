const router = require("express").Router();
const {getAllUsers, getUser, addUser, deleteUser, userLogin} = require("../controller/user");
const upload = require("../middleware/multer.js");




// Get all users
router.get("/", getAllUsers);

// Get particular user by his id
router.get("/:userId", getUser);

// Add new user -> register
router.post("/",upload.single("image") ,addUser);

// Login user
router.post("/login", userLogin);

// delete user with specific Id
router.put("/:userId", deleteUser);


module.exports = router;