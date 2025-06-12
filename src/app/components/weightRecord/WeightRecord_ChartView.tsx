"use client";

import { useEffect } from "react";
import axios from "@/app/lib/axiosInstance";
import { useWeightStore } from "@/app/store/useWeightStore";
import { Box } from "@mui/material";
import WeightRecord_Header from "./WeightRecord_Header";
import WeightRecord_SummaryCard from "./WeightRecord_SummaryCard";
import WeightRecord_WeeklyChart from "./WeightRecord_WeeklyChart";
import WeightRecord_WeeklyChart_Header from "./WeightRecord_WeeklyChart_Header";
import WeightRecord_GoHomeButton from "./WeightRecord_GoHomeButton";
import TabBar from "../common/TabBar";

// ✅ 백엔드 응답 타입 명확히 지정
interface ApiWeightRecord {
    id: number;
    weight: number;
    date: string; // "YYYY-MM-DD"
}

const WeightRecord_ChartView = () => {
    const setWeightByDate = useWeightStore(state => state.setWeightByDate);

    useEffect(() => {
        const fetchWeights = async () => {
            try {
                const res = await axios.get(
                    "https://api.eatfit.co.kr/api/core/users/weight"
                );
                const records: ApiWeightRecord[] = res.data.data;

                const formatted: Record<
                    string,
                    { id: number; weight: number }
                > = {};
                records.forEach(record => {
                    formatted[record.date] = {
                        id: record.id,
                        weight: record.weight,
                    };
                });

                setWeightByDate(formatted);
            } catch (err) {
                console.error("❌ 체중 기록 불러오기 실패", err);
            }
        };

        fetchWeights();
    }, [setWeightByDate]);

    return (
        <Box>
            <WeightRecord_Header />
            <WeightRecord_SummaryCard />
            <WeightRecord_WeeklyChart_Header />
            <WeightRecord_WeeklyChart />
            <WeightRecord_GoHomeButton />
            <TabBar />
        </Box>
    );
};

export default WeightRecord_ChartView;
