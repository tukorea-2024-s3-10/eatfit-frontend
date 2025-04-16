import { NextResponse } from "next/server";

export async function GET() {
    const mockData = [
        {
            date: "2025-04-14",
            meals: [
                { time: "아침", totalKcal: 320 },
                { time: "점심", totalKcal: 610 },
                { time: "간식", totalKcal: 180 },
            ],
        },
        {
            date: "2025-04-13",
            meals: [
                { time: "점심", totalKcal: 480 },
                { time: "저녁", totalKcal: 500 },
            ],
        },
        {
            date: "2025-04-12",
            meals: [],
        },
    ];

    return NextResponse.json({ history: mockData });
}
