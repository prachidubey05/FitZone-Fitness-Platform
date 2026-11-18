require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function createOrPromoteAdmin() {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || "FitZone Admin";
    if (!process.env.MONGO_URI || !email) {
        throw new Error("Set MONGO_URI and ADMIN_EMAIL before running this command");
    }
    await mongoose.connect(process.env.MONGO_URI);
    let user = await User.findOne({ email });
    if (!user && !password) throw new Error("Set ADMIN_PASSWORD to create a new admin account");
    if (!user) user = new User({ name, email, password: await bcrypt.hash(password, 12), role: "admin" });
    else user.role = "admin";
    await user.save();
    console.log(`Admin access enabled for ${user.email}`);
    await mongoose.disconnect();
}

createOrPromoteAdmin().catch(async (error) => {
    console.error(error.message);
    await mongoose.disconnect();
    process.exitCode = 1;
});

