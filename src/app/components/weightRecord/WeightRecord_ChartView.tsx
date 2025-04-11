"use client";

import { Box } from "@mui/material";
import WeightRecord_Header from "./WeightRecord_Header";
import WeightRecord_SummaryCard from "./WeightRecord_SummaryCard";
import WeightRecord_WeeklyChart from "./WeightRecord_WeeklyChart";
import WeightRecord_WeeklyChart_Header from "./WeightRecord_WeeklyChart_Header";
import WeightRecord_GoHomeButton from "./WeightRecord_GoHomeButton";
import TabBar from "../common/TabBar";
const WeightRecord_ChartView = () => {
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
