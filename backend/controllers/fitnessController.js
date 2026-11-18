const Class = require("../models/Class");
const Booking = require("../models/Booking");
const Membership = require("../models/Membership");
const MembershipRequest = require("../models/MembershipRequest");
const Progress = require("../models/Progress");
const User = require("../models/User");

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find({ startsAt: { $gte: new Date() } })
            .populate("trainer", "name specialization image")
            .sort({ startsAt: 1 });
        const counts = await Booking.aggregate([
            { $match: { fitnessClass: { $in: classes.map((item) => item._id) }, status: "booked" } },
            { $group: { _id: "$fitnessClass", count: { $sum: 1 } } }
        ]);
        const countByClass = new Map(counts.map((item) => [String(item._id), item.count]));
        res.json(classes.map((item) => ({ ...item.toObject(), bookedCount: countByClass.get(String(item._id)) || 0 })));
    } catch (error) {
        res.status(500).json({ message: "Could not load class schedule" });
    }
};

exports.createClass = async (req, res) => {
    try {
        const { title, category, startsAt, capacity, durationMinutes, trainer, description } = req.body;
        if (!title || !category || !startsAt || Number.isNaN(Date.parse(startsAt))) {
            return res.status(400).json({ message: "Title, category, and a valid start time are required" });
        }
        const fitnessClass = await Class.create({ title, category, startsAt, capacity, durationMinutes, trainer: trainer || undefined, description });
        res.status(201).json({ fitnessClass });
    } catch (error) {
        res.status(400).json({ message: "Could not create class" });
    }
};

exports.updateClass = async (req, res) => {
    try {
        const fitnessClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!fitnessClass) return res.status(404).json({ message: "Class not found" });
        res.json({ fitnessClass });
    } catch (error) {
        res.status(400).json({ message: "Could not update class" });
    }
};

exports.deleteClass = async (req, res) => {
    try {
        const fitnessClass = await Class.findByIdAndDelete(req.params.id);
        if (!fitnessClass) return res.status(404).json({ message: "Class not found" });
        await Booking.deleteMany({ fitnessClass: fitnessClass._id });
        res.json({ message: "Class deleted" });
    } catch (error) {
        res.status(400).json({ message: "Could not delete class" });
    }
};

exports.bookClass = async (req, res) => {
    try {
        const fitnessClass = await Class.findById(req.params.id);
        if (!fitnessClass || fitnessClass.startsAt <= new Date()) return res.status(404).json({ message: "Upcoming class not found" });
        const existing = await Booking.findOne({ user: req.user.id, fitnessClass: fitnessClass._id });
        if (existing?.status === "booked") return res.status(409).json({ message: "You have already booked this class" });
        const bookedCount = await Booking.countDocuments({ fitnessClass: fitnessClass._id, status: "booked" });
        if (bookedCount >= fitnessClass.capacity) return res.status(409).json({ message: "This class is full" });
        const booking = existing
            ? await Booking.findByIdAndUpdate(existing._id, { status: "booked" }, { new: true })
            : await Booking.create({ user: req.user.id, fitnessClass: fitnessClass._id });
        res.status(201).json({ booking, message: "Class booked" });
    } catch (error) {
        res.status(500).json({ message: "Could not book class" });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id, status: "booked" },
            { status: "cancelled" }, { new: true }
        );
        if (!booking) return res.status(404).json({ message: "Active booking not found" });
        res.json({ message: "Booking cancelled" });
    } catch (error) {
        res.status(400).json({ message: "Could not cancel booking" });
    }
};

exports.requestMembership = async (req, res) => {
    try {
        const membership = await Membership.findById(req.body.membershipId);
        if (!membership) return res.status(404).json({ message: "Membership plan not found" });
        const pending = await MembershipRequest.findOne({ user: req.user.id, status: "pending" });
        if (pending) return res.status(409).json({ message: "You already have a pending membership request" });
        const request = await MembershipRequest.create({ user: req.user.id, membership: membership._id, note: req.body.note || "" });
        res.status(201).json({ request, message: "Membership request submitted" });
    } catch (error) {
        res.status(500).json({ message: "Could not submit membership request" });
    }
};

exports.getDashboard = async (req, res) => {
    try {
        const [user, request, bookings, progress] = await Promise.all([
            User.findById(req.user.id).select("name email role"),
            MembershipRequest.findOne({ user: req.user.id }).populate("membership").sort({ createdAt: -1 }),
            Booking.find({ user: req.user.id, status: "booked" }).populate({ path: "fitnessClass", populate: { path: "trainer", select: "name" } }).sort({ createdAt: -1 }),
            Progress.find({ user: req.user.id }).sort({ recordedAt: -1 }).limit(12)
        ]);
        res.json({ user, membershipRequest: request, bookings, progress });
    } catch (error) {
        res.status(500).json({ message: "Could not load dashboard" });
    }
};

exports.addProgress = async (req, res) => {
    try {
        const weightKg = Number(req.body.weightKg);
        if (!Number.isFinite(weightKg) || weightKg < 20 || weightKg > 400) {
            return res.status(400).json({ message: "Enter a weight between 20 and 400 kg" });
        }
        const entry = await Progress.create({ user: req.user.id, weightKg, note: req.body.note || "" });
        res.status(201).json({ entry });
    } catch (error) {
        res.status(400).json({ message: "Could not save progress" });
    }
};

exports.getAdminOverview = async (req, res) => {
    try {
        const [members, requests, bookings, classes] = await Promise.all([
            User.find({ role: "member" }).select("name email createdAt").sort({ createdAt: -1 }),
            MembershipRequest.find().populate("user", "name email").populate("membership", "name price duration").sort({ createdAt: -1 }),
            Booking.find().populate("user", "name email").populate("fitnessClass", "title startsAt").sort({ createdAt: -1 }).limit(100),
            Class.find().populate("trainer", "name").sort({ startsAt: 1 })
        ]);
        res.json({ members, requests, bookings, classes });
    } catch (error) {
        res.status(500).json({ message: "Could not load admin overview" });
    }
};

exports.updateMembershipRequest = async (req, res) => {
    if (!["approved", "declined", "pending"].includes(req.body.status)) {
        return res.status(400).json({ message: "Invalid request status" });
    }
    try {
        const request = await MembershipRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true })
            .populate("user", "name email").populate("membership", "name price duration");
        if (!request) return res.status(404).json({ message: "Membership request not found" });
        res.json({ request });
    } catch (error) {
        res.status(400).json({ message: "Could not update request" });
    }
};

// PHASE 3 UPDATE: Class scheduling, bookings, membership requests, member dashboard, progress, and admin handlers.
const Class = require("../models/Class");
const Booking = require("../models/Booking");
const Membership = require("../models/Membership");
const MembershipRequest = require("../models/MembershipRequest");
const Progress = require("../models/Progress");
const User = require("../models/User");

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find({ startsAt: { $gte: new Date() } })
            .populate("trainer", "name specialization image")
            .sort({ startsAt: 1 });
        const counts = await Booking.aggregate([
            { $match: { fitnessClass: { $in: classes.map((item) => item._id) }, status: "booked" } },
            { $group: { _id: "$fitnessClass", count: { $sum: 1 } } }
        ]);
        const countByClass = new Map(counts.map((item) => [String(item._id), item.count]));
        res.json(classes.map((item) => ({ ...item.toObject(), bookedCount: countByClass.get(String(item._id)) || 0 })));
    } catch (error) {
        res.status(500).json({ message: "Could not load class schedule" });
    }
};

exports.createClass = async (req, res) => {
    try {
        const { title, category, startsAt, capacity, durationMinutes, trainer, description } = req.body;
        if (!title || !category || !startsAt || Number.isNaN(Date.parse(startsAt))) {
            return res.status(400).json({ message: "Title, category, and a valid start time are required" });
        }
        const fitnessClass = await Class.create({ title, category, startsAt, capacity, durationMinutes, trainer: trainer || undefined, description });
        res.status(201).json({ fitnessClass });
    } catch (error) {
        res.status(400).json({ message: "Could not create class" });
    }
};

exports.updateClass = async (req, res) => {
    try {
        const fitnessClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!fitnessClass) return res.status(404).json({ message: "Class not found" });
        res.json({ fitnessClass });
    } catch (error) {
        res.status(400).json({ message: "Could not update class" });
    }
};

exports.deleteClass = async (req, res) => {
    try {
        const fitnessClass = await Class.findByIdAndDelete(req.params.id);
        if (!fitnessClass) return res.status(404).json({ message: "Class not found" });
        await Booking.deleteMany({ fitnessClass: fitnessClass._id });
        res.json({ message: "Class deleted" });
    } catch (error) {
        res.status(400).json({ message: "Could not delete class" });
    }
};

exports.bookClass = async (req, res) => {
    try {
        const fitnessClass = await Class.findById(req.params.id);
        if (!fitnessClass || fitnessClass.startsAt <= new Date()) return res.status(404).json({ message: "Upcoming class not found" });
        const existing = await Booking.findOne({ user: req.user.id, fitnessClass: fitnessClass._id });
        if (existing?.status === "booked") return res.status(409).json({ message: "You have already booked this class" });
        const bookedCount = await Booking.countDocuments({ fitnessClass: fitnessClass._id, status: "booked" });
        if (bookedCount >= fitnessClass.capacity) return res.status(409).json({ message: "This class is full" });
        const booking = existing
            ? await Booking.findByIdAndUpdate(existing._id, { status: "booked" }, { new: true })
            : await Booking.create({ user: req.user.id, fitnessClass: fitnessClass._id });
        res.status(201).json({ booking, message: "Class booked" });
    } catch (error) {
        res.status(500).json({ message: "Could not book class" });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id, status: "booked" },
            { status: "cancelled" }, { new: true }
        );
        if (!booking) return res.status(404).json({ message: "Active booking not found" });
        res.json({ message: "Booking cancelled" });
    } catch (error) {
        res.status(400).json({ message: "Could not cancel booking" });
    }
};

exports.requestMembership = async (req, res) => {
    try {
        const membership = await Membership.findById(req.body.membershipId);
        if (!membership) return res.status(404).json({ message: "Membership plan not found" });
        const pending = await MembershipRequest.findOne({ user: req.user.id, status: "pending" });
        if (pending) return res.status(409).json({ message: "You already have a pending membership request" });
        const request = await MembershipRequest.create({ user: req.user.id, membership: membership._id, note: req.body.note || "" });
        res.status(201).json({ request, message: "Membership request submitted" });
    } catch (error) {
        res.status(500).json({ message: "Could not submit membership request" });
    }
};

exports.getDashboard = async (req, res) => {
    try {
        const [user, request, bookings, progress] = await Promise.all([
            User.findById(req.user.id).select("name email role"),
            MembershipRequest.findOne({ user: req.user.id }).populate("membership").sort({ createdAt: -1 }),
            Booking.find({ user: req.user.id, status: "booked" }).populate({ path: "fitnessClass", populate: { path: "trainer", select: "name" } }).sort({ createdAt: -1 }),
            Progress.find({ user: req.user.id }).sort({ recordedAt: -1 }).limit(12)
        ]);
        res.json({ user, membershipRequest: request, bookings, progress });
    } catch (error) {
        res.status(500).json({ message: "Could not load dashboard" });
    }
};

exports.addProgress = async (req, res) => {
    try {
        const weightKg = Number(req.body.weightKg);
        if (!Number.isFinite(weightKg) || weightKg < 20 || weightKg > 400) {
            return res.status(400).json({ message: "Enter a weight between 20 and 400 kg" });
        }
        const entry = await Progress.create({ user: req.user.id, weightKg, note: req.body.note || "" });
        res.status(201).json({ entry });
    } catch (error) {
        res.status(400).json({ message: "Could not save progress" });
    }
};

exports.getAdminOverview = async (req, res) => {
    try {
        const [members, requests, bookings, classes] = await Promise.all([
            User.find({ role: "member" }).select("name email createdAt").sort({ createdAt: -1 }),
            MembershipRequest.find().populate("user", "name email").populate("membership", "name price duration").sort({ createdAt: -1 }),
            Booking.find().populate("user", "name email").populate("fitnessClass", "title startsAt").sort({ createdAt: -1 }).limit(100),
            Class.find().populate("trainer", "name").sort({ startsAt: 1 })
        ]);
        res.json({ members, requests, bookings, classes });
    } catch (error) {
        res.status(500).json({ message: "Could not load admin overview" });
    }
};

exports.updateMembershipRequest = async (req, res) => {
    if (!["approved", "declined", "pending"].includes(req.body.status)) {
        return res.status(400).json({ message: "Invalid request status" });
    }
    try {
        const request = await MembershipRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true })
            .populate("user", "name email").populate("membership", "name price duration");
        if (!request) return res.status(404).json({ message: "Membership request not found" });
        res.json({ request });
    } catch (error) {
        res.status(400).json({ message: "Could not update request" });
    }
};

