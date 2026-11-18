const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        duration: {
            type: String,
            required: true
        },

        features: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Membership", membershipSchema);