"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import HistoryMeal_HistoryCard from "./HistoryMeal_HistoryCard";

interface MealEntry {
    date: string;
    meals: { time: string; totalKcal: number }[];
}

const HistoryMeal_List = () => {
    const [data, setData] = useState<MealEntry[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/mock/history-meal");
            const json = await res.json();
            setData(json.history);
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ px: 2, pt: 2 }}>
            {data.map(entry => (
                <HistoryMeal_HistoryCard
                    key={entry.date}
                    date={entry.date}
                    meals={entry.meals}
                />
            ))}
        </Box>
    );
};

export default HistoryMeal_List;
