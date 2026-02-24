export type Urgency = "critical" | "urgent" | "stable";

export interface CrisisReport {
    id: string;
    message: string;
    location: string;
    urgency: Urgency;
    timestamp: string;
}

export const mockLocations = [
    "North Zone",
    "East Area",
    "South Sector",
    "West Bridge",
    "Central District",
    "Harbor Front",
    "Airport Region",
];

export const mockStats = {
    totalReports: 847,
    criticalCases: 23,
    activeZones: 12,
};

export const mockAISummary = `Current crisis assessment indicates a multi-vector emergency situation concentrated primarily in the North Zone and East Area. Seismic activity has triggered structural failures in 3 buildings, with an estimated 45 individuals requiring immediate extraction. Concurrent flooding along the eastern corridor has displaced approximately 1,200 residents.

Priority response should focus on search and rescue operations at the downtown collapse site. Medical triage teams are recommended for deployment within the next 15 minutes. Secondary attention should address rising water levels threatening the East Area power infrastructure.

Overall threat level: ELEVATED. Recommend maintaining Stage 3 emergency protocols for the next 6-8 hours.`;

export const mockRecommendations = [
    "Deploy 3 medical teams to North Zone collapse site immediately",
    "Increase food and water supply distribution in East Area shelters",
    "Reroute traffic from Main Street — flood risk zones",
    "Station hazmat unit near South Sector industrial park",
    "Activate backup communication channels for Central District",
    "Request mutual aid from neighboring jurisdictions",
];

export const mockTimelineEvents = [
    {
        title: "Critical report received",
        description: "Building collapse reported in North Zone — auto-classified as Critical",
        time: "2 min ago",
        variant: "critical" as const,
        type: "report" as const,
    },
    {
        title: "Zone flagged: North Zone",
        description: "AI elevated North Zone to high-priority based on 3 clustered incidents",
        time: "3 min ago",
        variant: "urgent" as const,
        type: "zone" as const,
    },
    {
        title: "Resource suggestion generated",
        description: "AI recommends deploying 3 medical teams to North Zone collapse site",
        time: "4 min ago",
        variant: "default" as const,
        type: "resource" as const,
    },
    {
        title: "Urgent report received",
        description: "Power outage affecting hospital in Central District",
        time: "12 min ago",
        variant: "urgent" as const,
        type: "report" as const,
    },
    {
        title: "Zone status updated: East Area",
        description: "Flooding situation stabilizing — downgraded from Critical to Urgent",
        time: "15 min ago",
        variant: "stable" as const,
        type: "zone" as const,
    },
    {
        title: "Resource deployed",
        description: "Hazmat unit dispatched to South Sector industrial park",
        time: "20 min ago",
        variant: "default" as const,
        type: "resource" as const,
    },
];

export const mockReports: CrisisReport[] = [
    {
        id: "1",
        message: "Building collapse in downtown area, multiple people trapped under debris. Emergency services needed immediately.",
        location: "North Zone",
        urgency: "critical",
        timestamp: "2 min ago",
    },
    {
        id: "2",
        message: "Flooding reported on Main Street. Water levels rising rapidly, residents evacuating.",
        location: "East Area",
        urgency: "critical",
        timestamp: "5 min ago",
    },
    {
        id: "3",
        message: "Power outage affecting 3 blocks. Hospital running on backup generators.",
        location: "Central District",
        urgency: "urgent",
        timestamp: "12 min ago",
    },
    {
        id: "4",
        message: "Chemical spill near industrial park. Perimeter being established.",
        location: "South Sector",
        urgency: "urgent",
        timestamp: "18 min ago",
    },
    {
        id: "5",
        message: "Minor road accident cleared. Traffic returning to normal flow.",
        location: "West Bridge",
        urgency: "stable",
        timestamp: "25 min ago",
    },
    {
        id: "6",
        message: "Shelter at community center fully operational. 120 people accommodated.",
        location: "North Zone",
        urgency: "stable",
        timestamp: "30 min ago",
    },
    {
        id: "7",
        message: "Gas leak detected in residential block. Evacuation in progress.",
        location: "East Area",
        urgency: "urgent",
        timestamp: "35 min ago",
    },
    {
        id: "8",
        message: "Fire contained at warehouse. No casualties reported.",
        location: "South Sector",
        urgency: "stable",
        timestamp: "42 min ago",
    },
];

export const demoScenarioReports: CrisisReport[] = [
    {
        id: "demo-1",
        message: "Earthquake magnitude 6.2 detected. Multiple structures compromised in the downtown corridor. Mass casualty event declared.",
        location: "North Zone",
        urgency: "critical",
        timestamp: "Just now",
    },
    {
        id: "demo-2",
        message: "Tsunami warning issued for coastal areas. Mandatory evacuation order in effect for Harbor Front residents.",
        location: "Harbor Front",
        urgency: "critical",
        timestamp: "1 min ago",
    },
    {
        id: "demo-3",
        message: "Major gas pipeline rupture near residential area. Fire department en route. 500m exclusion zone established.",
        location: "South Sector",
        urgency: "critical",
        timestamp: "3 min ago",
    },
    {
        id: "demo-4",
        message: "Bridge structural integrity compromised. All traffic halted. Engineering assessment team dispatched.",
        location: "West Bridge",
        urgency: "urgent",
        timestamp: "5 min ago",
    },
    {
        id: "demo-5",
        message: "Hospital emergency department at 95% capacity. Requesting patient diversion to alternate facilities.",
        location: "Central District",
        urgency: "urgent",
        timestamp: "8 min ago",
    },
    {
        id: "demo-6",
        message: "Emergency shelters activated at 4 locations. Capacity for 2,000 evacuees. Supply trucks en route.",
        location: "East Area",
        urgency: "stable",
        timestamp: "10 min ago",
    },
    {
        id: "demo-7",
        message: "Communication towers restored in Airport Region. Cell service back online for first responders.",
        location: "Airport Region",
        urgency: "stable",
        timestamp: "12 min ago",
    },
];

export const markerSuggestedActions: Record<string, string> = {
    "1": "Dispatch search and rescue teams immediately. Establish triage point at nearby parking structure.",
    "2": "Deploy sandbag crews and water pumps. Evacuate basement-level residents within 2 blocks.",
    "3": "Reroute power through secondary grid. Deploy mobile generators to hospital.",
    "4": "Establish hazmat perimeter. Evacuate 500m radius. Deploy chemical response unit.",
    "5": "Clear debris and reopen alternate route via South Avenue.",
    "6": "Continue shelter operations. Request additional supply delivery by 1800hrs.",
    "7": "Monitor gas levels. Maintain evacuation perimeter until all-clear from engineering team.",
    "8": "Assign fire watch crew for 24hr monitoring. Release scene to investigators.",
    "demo-1": "Activate full earthquake response protocol. Deploy all available SAR teams to downtown corridor.",
    "demo-2": "Execute coastal evacuation plan. Open inland emergency shelters immediately.",
    "demo-3": "Shut off gas supply at main valve. Expand exclusion zone if wind shifts.",
    "demo-4": "Establish detour routes. Station structural engineers for continuous monitoring.",
    "demo-5": "Activate mutual aid agreements with neighboring hospitals. Deploy field medical units.",
    "demo-6": "Coordinate supply chain logistics. Assign shelter management teams.",
    "demo-7": "Verify all emergency communication channels are operational. Run system check.",
};
