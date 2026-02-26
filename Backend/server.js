import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();

// FIX 1: Render dynamically assigns a PORT. Hardcoding 8080 will cause a timeout.
const PORT = process.env.PORT || 8080; 

app.use(express.json());
app.use(cors());

// FIX 2: Add a root route. Render's "Health Check" needs a 200 OK response 
// at the "/" path, or it will think your server crashed.
// app.get("/", (req, res) => {
    app.get('(.*)', (req, res) => { 
    res.send("SigmaGPT API is Live and Running!");
});

app.use("/api", chatRoutes);

const connectDB = async () => {
    try {
        // Ensure your MONGODB_URI is added to Render's Environment Variables
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch (err) {
        console.log("Failed to connect with Db", err);
        // In production, if DB fails, we want to know why immediately
    }
};

// FIX 3: Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});

// app.post("/test", async (req, res) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [{
//                 role: "user",
//                 content: req.body.message
//             }]
//         })
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();
//         //console.log(data.choices[0].message.content); //reply
//         res.send(data.choices[0].message.content);
//     } catch(err) {
//         console.log(err);
//     }
// });
