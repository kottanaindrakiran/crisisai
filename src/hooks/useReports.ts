import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface DBReport {
    id: string;
    message: string;
    urgency: "critical" | "urgent" | "stable";
    summary: string;
    advice: string;
    lat: number;
    lng: number;
    created_at: string;
}

export function useReports() {
    const [reports, setReports] = useState<DBReport[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function fetchReports() {
            const { data, error } = await supabase
                .from("reports")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(50);

            if (error) {
                console.error("Error fetching reports:", error);
            } else if (mounted) {
                setReports(data || []);
            }
            setLoading(false);
        }

        fetchReports();

        const subscription = supabase
            .channel("reports_channel")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "reports" },
                (payload) => {
                    setReports((current) => [payload.new as DBReport, ...current].slice(0, 50));
                }
            )
            .subscribe();

        return () => {
            mounted = false;
            supabase.removeChannel(subscription);
        };
    }, []);

    return { reports, loading };
}
