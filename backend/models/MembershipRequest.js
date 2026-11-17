const mongoose = require("mongoose");

const membershipRequestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    membership: { type: mongoose.Schema.Types.ObjectId, ref: "Membership", required: true },
    status: { type: String, enum: ["pending", "approved", "declined"], default: "pending" },
    note: { type: String, trim: true, maxlength: 500, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("MembershipRequest", membershipRequestSchema);