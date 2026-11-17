const express = require("express");
const router = express.Router();

const {
    getMemberships,
    getMembershipById,
    createMembership,
    updateMembership,
    deleteMembership
} = require("../controllers/membershipController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = authMiddleware.adminMiddleware;

router.get("/", getMemberships);
router.get("/:id", getMembershipById);
router.post("/", authMiddleware, adminMiddleware, createMembership);
router.put("/:id", authMiddleware, adminMiddleware, updateMembership);
router.delete("/:id", authMiddleware, adminMiddleware, deleteMembership);

module.exports = router;
