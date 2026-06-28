// Import required packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Create Express application
const db = require("./config/db");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 License Management System Backend is Running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});