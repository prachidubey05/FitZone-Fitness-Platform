<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
const express = require("express");
const router = express.Router();

const {
    getTrainers,
    getTrainerById,
    createTrainer,
    updateTrainer,
    deleteTrainer
} = require("../controllers/trainerController");
<<<<<<< Updated upstream

router.get("/", getTrainers);
router.get("/:id", getTrainerById);
router.post("/", createTrainer);
router.put("/:id", updateTrainer);
router.delete("/:id", deleteTrainer);
=======
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = authMiddleware.adminMiddleware;

router.get("/", getTrainers);
router.get("/:id", getTrainerById);
router.post("/", authMiddleware, adminMiddleware, createTrainer);
router.put("/:id", authMiddleware, adminMiddleware, updateTrainer);
router.delete("/:id", authMiddleware, adminMiddleware, deleteTrainer);
>>>>>>> Stashed changes

module.exports = router;
