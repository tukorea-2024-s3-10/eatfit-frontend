"use client";

import { Box } from "@mui/material";
import {
    LineChart,
    LineSeriesType,
    ChartsReferenceLine,
    ChartsXAxis,
    ChartsYAxis,
} from "@mui/x-charts";
import { useWeightStore } from "@/app/store/useWeightStore";
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

// 📅 중심 날짜 기준으로 한 주간 날짜 배열 만들기 (월~일)
const getWeekDates = (centerDate: dayjs.Dayjs) => {
    const startOfWeek = centerDate.startOf("week").add(1, "day"); // 월요일 시작
    return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
};

const WeightRecord_WeeklyChart = () => {
    const weightByDate = useWeightStore(state => state.weightByDate);
    const centerDate = useWeightStore(state => state.centerDate);
    const targetWeight = useNutritionPlanStore(state => state.targetWeight);

    const [weekDates, setWeekDates] = useState(() => getWeekDates(centerDate));

    useEffect(() => {
        setWeekDates(getWeekDates(centerDate));
    }, [centerDate]);

    // ✅ 차트 데이터 구성
    const data = weekDates.map(date => {
        const key = date.format("YYYY-MM-DD");
        return weightByDate[key] ?? null;
    });

    const validWeights = data.filter((w): w is number => w !== null);
    const minWeight = Math.min(...validWeights, targetWeight);
    const maxWeight = Math.max(...validWeights, targetWeight);

    const buffer = Math.max((maxWeight - minWeight) * 0.2, 1.5);
    const yMin = Math.floor(minWeight - buffer);
    const yMax = Math.ceil(maxWeight + buffer);

    const labels = weekDates.map(date => date.format("dd")); // 요일 (월~일)

    return (
        <Box px={3}>
            <LineChart
                xAxis={[{ id: "요일", data: labels, scaleType: "point" }]}
                yAxis={[{ min: yMin, max: yMax }]}
                series={[
                    {
                        data,
                        color: "#00C092",
                        type: "line",
                        curve: "linear",
                        showMark: true,
                        showMarkLabel: true, // ✅ 각 점 위에 값 표시
                        valueFormatter: val =>
                            val !== null ? `${val.toFixed(1)}kg` : "",
                    } as LineSeriesType,
                ]}
                height={200}
                grid={{ horizontal: true }}
                sx={{
                    ".MuiLineElement-root": {
                        strokeWidth: 2,
                    },
                    ".MuiChartsAxis-tickLabel": {
                        fontSize: 12,
                    },
                    ".MuiChartsMarkLabel-root": {
                        fontSize: 10,
                        fill: "#333",
                    },
                }}
            >
                {/* 🎯 목표 체중선 */}
                <ChartsReferenceLine
                    y={targetWeight}
                    label="목표"
                    labelAlign="end" // ✅ 오른쪽 끝 정렬
                    lineStyle={{
                        stroke: "#9E8DFF",
                        strokeWidth: 2,
                        strokeDasharray: "4 2",
                    }}
                    labelStyle={{
                        fill: "#9E8DFF",
                        fontSize: 12,
                    }}
                />
                <ChartsXAxis />
                <ChartsYAxis />
            </LineChart>
        </Box>
    );
};

export default WeightRecord_WeeklyChart;
