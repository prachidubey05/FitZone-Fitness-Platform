const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173").split(",").map((origin) => origin.trim());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/trainers", require("./routes/trainerRoutes"));
app.use("/api/memberships", require("./routes/membershipRoutes"));
app.use("/api/fitness", require("./routes/fitnessRoutes"));

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to FitZone API"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

