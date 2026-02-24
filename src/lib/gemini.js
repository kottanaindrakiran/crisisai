import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const withTimeout = (promise, ms) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms))
    ]);
};

export async function analyzeEmergencyMessage(text) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        const prompt = `You are an emergency response AI.

Classify urgency: Critical, Urgent, Stable.
Give one-line reason.
Give immediate advice.
Give short summary (max 12 words).

Message: "${text}"

Return JSON only with fields:
urgency, reason, advice, summary`;

        const result = await withTimeout(model.generateContent(prompt), 8000);
        const responseText = result.response.text();
        return JSON.parse(responseText);
    } catch (error) {
        console.error("Gemini Error:", error);
        return {
            urgency: "urgent",
            summary: "Emergency reported",
            advice: "Stay safe and contact local responders",
            reason: "Could not analyze the message details."
        };
    }
}

export async function generateCrisisSummary(reports) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Combine report summaries or messages
        const reportsText = reports.map(r => `[${r.urgency}] ${r.summary || r.message}`).join("\n");

        const prompt = `You are a disaster response coordinator AI.
Summarize current disaster situation in 2 lines.
Suggest what responders should prioritize.

Reports:
${reportsText}

Return plain text.`;

        const result = await withTimeout(model.generateContent(prompt), 8000);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Summary Error:", error);
        return "Multiple emergency reports detected. Monitor high-risk zones.";
    }
}
