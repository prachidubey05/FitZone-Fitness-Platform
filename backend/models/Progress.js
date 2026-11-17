const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    weightKg: { type: Number, min: 20, max: 400, required: true },
    note: { type: String, trim: true, maxlength: 240, default: "" },
    recordedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);