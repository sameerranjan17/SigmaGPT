🤖 SigmaGPT

SigmaGPT is a minimalist, high-performance AI chat interface built with the MERN stack. It leverages the latest Gemini 3 Flash model to provide intelligent, context-aware responses while maintaining persistent chat history.
Shutterstock
🚀 Features

    Persistent Threads: Save and manage multiple chat conversations using MongoDB.

    AI Intelligence: Powered by Google's Gemini 3 Flash via the unified genai SDK.

    Modern Backend: Built with Node.js v22 (ESM) and Express.js.

    Clean UI: A distraction-free React interface for seamless communication.

🛠️ Technical Implementation
Core Architecture

The project is split into a client-server model:

    Frontend: React application utilizing functional components and fetch API for real-time interaction.

    Backend: Express server handling API routing and database persistence.

    Intelligence: A dedicated utility layer for managing Google Generative AI requests.

Key Learnings

    ESM Integration: Successfully implemented ECMAScript Modules in Node.js v22, moving away from CommonJS.

    SDK Migration: Adapted the codebase from the legacy @google/generative-ai to the modern, unified @google/genai package.

    DNS Optimization: Resolved connectivity issues by prioritizing IPv4 lookups (--dns-result-order=ipv4first).

⚙️ Setup & Installation

    Clone the repository:
    Bash

    git clone https://github.com/your-username/SigmaGPT.git
    cd SigmaGPT

    Backend Configuration:

        Create a .env file in the backend folder:
        Code snippet

        PORT=8080
        MONGO_URI=your_mongodb_atlas_uri
        GEMINI_API_KEY=your_google_ai_studio_key

        Install dependencies and start:
        Bash

        cd backend
        npm install
        npm start

    Frontend Configuration:

        Install dependencies and start:
        Bash

        cd ../frontend
        npm install
        npm run dev

🗺️ Roadmap

    [ ] Implement Redis-based Rate Limiting for API quota protection.

    [ ] Add User Authentication via JWT or Clerk.

    [ ] Support for File/Image Uploads (Multi-modal chat).

📜 License

Distributed under the MIT License.

Built by Sameer Ranjan | BCA '26
