
// PHASE 3 UPDATE: Trainer create, update, and delete routes now require administrator authorization.
const express = require("express");
const router = express.Router();

const {
    getTrainers,
    getTrainerById,
    createTrainer,
    updateTrainer,
    deleteTrainer
} = require("../controllers/trainerController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = authMiddleware.adminMiddleware;

router.get("/", getTrainers);
router.get("/:id", getTrainerById);
router.post("/", authMiddleware, adminMiddleware, createTrainer);
router.put("/:id", authMiddleware, adminMiddleware, updateTrainer);
router.delete("/:id", authMiddleware, adminMiddleware, deleteTrainer);

module.exports = router;
