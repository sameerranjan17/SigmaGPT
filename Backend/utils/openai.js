import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Use 'export' right before the function definition
export async function getGeminiResponse(message) {
  try {
    const response = await ai.models.generateContent({
    //   model: "gemini-2.0-flash", // Use the model you have access to
      model: "gemini-2.5-flash-lite", // Use the model you have access to
      contents: [{ role: "user", parts: [{ text: message }] }],
    });
    return response.text;
  } catch (err) {
    console.error("Gemini Error:", err);
    return "AI is currently unavailable.";
  }
}