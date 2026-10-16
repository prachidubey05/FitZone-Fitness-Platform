
const Membership = require("../models/Membership");

exports.getMemberships = async (req, res) => {
    try {
        const memberships = await Membership.find();
        res.status(200).json(memberships);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch membership plans"
        });
    }
};

exports.getMembershipById = async (req, res) => {
    try {
        const membership = await Membership.findById(
            req.params.id
        );

        if (!membership) {
            return res.status(404).json({
                message: "Membership not found"
            });
        }

        res.status(200).json(membership);
    } catch (error) {
        res.status(400).json({
            message: "Invalid membership ID"
        });
    }
};

exports.createMembership = async (req, res) => {
    try {
        const { name, price, duration, features } = req.body;

        if (
            !name ||
            price == null ||
            !Number.isFinite(Number(price)) ||
            Number(price) < 0 ||
            !duration
        ) {
            return res.status(400).json({
                message: "Valid name, price and duration are required"
            });
        }

        const membership = await Membership.create({
            name,
            price: Number(price),
            duration,
            features: features || []
        });

        res.status(201).json({
            message: "Membership created successfully",
            membership
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not create membership"
        });
    }
};

exports.updateMembership = async (req, res) => {
    try {
        const membership = await Membership.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!membership) {
            return res.status(404).json({
                message: "Membership not found"
            });
        }

        res.status(200).json({
            message: "Membership updated successfully",
            membership
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not update membership"
        });
    }
};

exports.deleteMembership = async (req, res) => {
    try {
        const membership = await Membership.findByIdAndDelete(
            req.params.id
        );

        if (!membership) {
            return res.status(404).json({
                message: "Membership not found"
            });
        }

        res.status(200).json({
            message: "Membership deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not delete membership"
        });
    }
};
