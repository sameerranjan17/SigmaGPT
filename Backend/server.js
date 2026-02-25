import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import path from "path"; // Added at the top
import { fileURLToPath } from "url"; // Added at the top
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

// Since you're using ES Modules (import/export), we need to manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); 
app.use(cors());

// 1. API Routes (Check these first)
app.use("/api", chatRoutes);

// 2. Serve Frontend Static Files
// This assumes your React build folder is in a folder named 'client/dist' relative to server.js
const frontendPath = path.join(__dirname, "../client/dist"); 
app.use(express.static(frontendPath));

// 3. Catch-all: Send the index.html for any other route (Essential for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database!");
  } catch (err) {
    console.log("Failed to connect with Db", err);
  }
};