<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
const express = require("express");
const router = express.Router();

const {
    registerUser,
<<<<<<< Updated upstream
    loginUser
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
=======
    loginUser,
    getCurrentUser
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;

>>>>>>> Stashed changes
