import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import chatRoutes from "./routes/chat.js";

// 1. Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080; 

app.use(express.json());
app.use(cors());

// 2. Serve the static files from the dist folder
// This makes sure your CSS and JS files are loaded
app.use(express.static(path.join(__dirname, "dist")));

// 3. API Routes 
app.use("/api", chatRoutes);

// 4. Serve the Frontend index.html for the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 5. React Router Support (The "Catch-all")
// Instead of a 404 JSON, we send index.html so React can handle the route
app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch (err) {
        console.error("CRITICAL: Failed to connect with Db", err);
    }
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});