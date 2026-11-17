const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = auth.adminMiddleware;
const fitness = require("../controllers/fitnessController");

router.get("/classes", fitness.getClasses);
router.post("/classes", auth, admin, fitness.createClass);
router.put("/classes/:id", auth, admin, fitness.updateClass);
router.delete("/classes/:id", auth, admin, fitness.deleteClass);
router.post("/classes/:id/book", auth, fitness.bookClass);
router.post("/bookings/:id/cancel", auth, fitness.cancelBooking);
router.post("/membership-requests", auth, fitness.requestMembership);
router.get("/dashboard", auth, fitness.getDashboard);
router.post("/progress", auth, fitness.addProgress);
router.get("/admin/overview", auth, admin, fitness.getAdminOverview);
router.patch("/admin/membership-requests/:id", auth, admin, fitness.updateMembershipRequest);

module.exports = router;

