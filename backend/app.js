const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://scheduler-kolz.vercel.app"
];

// CORS setup
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/meetings", meetingRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Scheduler backend is running ✅");
});

// 404 + error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
