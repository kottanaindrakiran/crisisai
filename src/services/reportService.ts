import { supabase } from "@/lib/supabaseClient";
import { analyzeEmergencyMessage } from "@/lib/gemini";

const locationCoordinates: Record<string, { lat: number; lng: number }> = {
    "North Zone": { lat: 40.75, lng: -73.98 },
    "East Area": { lat: 40.73, lng: -73.95 },
    "South Sector": { lat: 40.71, lng: -74.00 },
    "West Bridge": { lat: 40.74, lng: -74.01 },
    "Central District": { lat: 40.75, lng: -73.99 },
    "Harbor Front": { lat: 40.70, lng: -74.02 },
    "Airport Region": { lat: 40.64, lng: -73.78 },
};

export async function submitEmergencyReport(message: string, location: string) {
    if (!message || !location) throw new Error("Missing fields");

    // 1) Send user message to Gemini AI
    const analysis = await analyzeEmergencyMessage(message);

    // 2) Get coordinates
    const coords = locationCoordinates[location] || { lat: 40.70, lng: -74.00 };

    // 3) Insert into Supabase
    const { data, error } = await supabase.from("reports").insert({
        message,
        urgency: analysis.urgency.toLowerCase(),
        summary: analysis.summary,
        advice: analysis.advice,
        lat: coords.lat,
        lng: coords.lng,
    });

    if (error) {
        throw error;
    }

    return { data, analysis };
}
