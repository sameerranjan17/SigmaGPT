import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 8080; 

app.use(express.json());
app.use(cors());

// 1. Health Check / Root Route
// Using "/" specifically for Render's health check
app.get("/", (req, res) => {
    res.status(200).send("SigmaGPT API is Live and Running!");
});

// 2. API Routes 
// These MUST come before the catch-all wildcard
app.use("/api", chatRoutes);

// 3. The "Catch-all" 404 Handler (Express v5 Style)
// This captures any undefined routes using the new named wildcard syntax
app.all('/*splat', (req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: `The route ${req.originalUrl} does not exist.`
    });
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch (err) {
        console.error("CRITICAL: Failed to connect with Db", err);
        // On Render, if DB fails at startup, the service might fail health checks
    }
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});