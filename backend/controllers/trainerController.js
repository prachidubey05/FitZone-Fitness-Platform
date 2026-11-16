
const Trainer = require("../models/Trainer");

exports.getTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find();
        res.status(200).json(trainers);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch trainers"
        });
    }
};

exports.getTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);

        if (!trainer) {
            return res.status(404).json({
                message: "Trainer not found"
            });
        }

        res.status(200).json(trainer);
    } catch (error) {
        res.status(400).json({
            message: "Invalid trainer ID"
        });
    }
};

exports.createTrainer = async (req, res) => {
    try {
        const {
            name,
            specialization,
            experience,
            image,
            description
        } = req.body;

        if (
            !name ||
            !specialization ||
            experience == null ||
            !Number.isFinite(Number(experience)) ||
            Number(experience) < 0
        ) {
            return res.status(400).json({
                message: "Valid name, specialization and experience are required"
            });
        }

        const trainer = await Trainer.create({
            name,
            specialization,
            experience: Number(experience),
            image,
            description
        });

        res.status(201).json({
            message: "Trainer added successfully",
            trainer
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not add trainer"
        });
    }
};

exports.updateTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!trainer) {
            return res.status(404).json({
                message: "Trainer not found"
            });
        }

        res.status(200).json({
            message: "Trainer updated successfully",
            trainer
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not update trainer"
        });
    }
};

exports.deleteTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findByIdAndDelete(
            req.params.id
        );

        if (!trainer) {
            return res.status(404).json({
                message: "Trainer not found"
            });
        }

        res.status(200).json({
            message: "Trainer deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not delete trainer"
        });
    }
};
