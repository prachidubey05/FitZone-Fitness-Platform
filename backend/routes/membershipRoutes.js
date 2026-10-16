
const express = require("express");
const router = express.Router();

const {
    getMemberships,
    getMembershipById,
    createMembership,
    updateMembership,
    deleteMembership
} = require("../controllers/membershipController");

router.get("/", getMemberships);
router.get("/:id", getMembershipById);
router.post("/", createMembership);
router.put("/:id", updateMembership);
router.delete("/:id", deleteMembership);

module.exports = router;
