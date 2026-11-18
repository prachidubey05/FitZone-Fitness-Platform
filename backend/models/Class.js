const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer" },
    startsAt: { type: Date, required: true },
    durationMinutes: { type: Number, min: 15, default: 45 },
    capacity: { type: Number, min: 1, default: 12 },
    description: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Class", classSchema);