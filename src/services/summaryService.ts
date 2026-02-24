import { generateCrisisSummary as geminiGenerateSummary } from "@/lib/gemini";
import type { DBReport } from "@/hooks/useReports";

export async function generateLiveSummary(dbReports: DBReport[]): Promise<string> {
    const summary = await geminiGenerateSummary(dbReports);
    return summary;
}
