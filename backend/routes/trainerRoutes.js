
const express = require("express");
const router = express.Router();

const {
    getTrainers,
    getTrainerById,
    createTrainer,
    updateTrainer,
    deleteTrainer
} = require("../controllers/trainerController");

router.get("/", getTrainers);
router.get("/:id", getTrainerById);
router.post("/", createTrainer);
router.put("/:id", updateTrainer);
router.delete("/:id", deleteTrainer);

module.exports = router;
