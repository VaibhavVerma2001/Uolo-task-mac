const router = require("express").Router();
const {getAllUsers, getUser, addUser, deleteUser, userLogin} = require("../controller/user");
const upload = require("../middleware/multer.js");
const verify = require("../middleware/verifyToken");




// Get all users -> protected route
router.get("/",verify, getAllUsers);

// Get particular user by his id -> protected route
router.get("/:userId",verify, getUser);

// Add new user -> register -> protected route
router.post("/", verify, upload.single("image") ,addUser);

// Login user
router.post("/login", userLogin);

// delete user with specific Id -> protected route
router.put("/:userId",verify ,deleteUser);


module.exports = router;