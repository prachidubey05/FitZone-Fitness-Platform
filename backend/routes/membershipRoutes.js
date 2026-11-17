
<<<<<<< Updated upstream
=======
// PHASE 3 UPDATE: Membership create, update, and delete routes now require administrator authorization.
>>>>>>> Stashed changes
const express = require("express");
const router = express.Router();

const {
    getMemberships,
    getMembershipById,
    createMembership,
    updateMembership,
    deleteMembership
} = require("../controllers/membershipController");
<<<<<<< Updated upstream

router.get("/", getMemberships);
router.get("/:id", getMembershipById);
router.post("/", createMembership);
router.put("/:id", updateMembership);
router.delete("/:id", deleteMembership);
=======
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = authMiddleware.adminMiddleware;

router.get("/", getMemberships);
router.get("/:id", getMembershipById);
router.post("/", authMiddleware, adminMiddleware, createMembership);
router.put("/:id", authMiddleware, adminMiddleware, updateMembership);
router.delete("/:id", authMiddleware, adminMiddleware, deleteMembership);
>>>>>>> Stashed changes

module.exports = router;
