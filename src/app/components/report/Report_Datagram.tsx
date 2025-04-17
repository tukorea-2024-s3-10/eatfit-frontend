"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Report_WeeklyCalendar from "@/app/components/report/Report_WeeklyCalendar";
import Report_WeeklyBarChart from "@/app/components/report/Report_WeeklyBarChart";
import type { MealHistoryEntry } from "@/app/store/useMealHistoryStore";
import { Box, Typography } from "@mui/material";
import { useMealHistoryStore } from "@/app/store/useMealHistoryStore";

type WeeklyDataItem = {
    date: string;
    dayLabel: string;
    kcal: number;
    hasMeal: boolean;
};

const Report_Datagram = () => {
    const [selectedDate, setSelectedDate] = useState(
        dayjs().format("YYYY-MM-DD")
    );
    const [weekStartDate, setWeekStartDate] = useState(
        dayjs().startOf("week") // ✅ 일요일 기준
    );
    const [weeklyData, setWeeklyData] = useState<WeeklyDataItem[]>([]);

    // 🔁 주차 이동 핸들러
    const handlePrevWeek = () => {
        const newStart = weekStartDate.subtract(7, "day");
        setWeekStartDate(newStart);
        setSelectedDate(newStart.format("YYYY-MM-DD"));
    };

    const handleNextWeek = () => {
        const newStart = weekStartDate.add(7, "day");
        setWeekStartDate(newStart);
        setSelectedDate(newStart.format("YYYY-MM-DD"));
    };

    // 📦 API → 주간 데이터 생성
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get<{ history: MealHistoryEntry[] }>(
                "/api/mock/history-meal"
            );
            const history = res.data.history;
            useMealHistoryStore.getState().setHistoryList(history);
            const week: WeeklyDataItem[] = [];

            for (let i = 0; i < 7; i++) {
                const dateObj = weekStartDate.add(i, "day");
                const date = dateObj.format("YYYY-MM-DD");
                const dayLabel = ["일", "월", "화", "수", "목", "금", "토"][
                    dateObj.day()
                ];

                const entry = history.find(h => h.date === date);
                const hasMeal = !!entry;
                const kcal = entry
                    ? entry.meals.reduce(
                          (sum, meal) =>
                              sum +
                              meal.foods.reduce(
                                  (acc, food) => acc + food.calorie,
                                  0
                              ),
                          0
                      )
                    : 0;

                week.push({ date, dayLabel, kcal, hasMeal });
            }

            setWeeklyData(week);
        };

        fetchData();
    }, [weekStartDate]);

    // 🗓 현재 주차 텍스트
    const weekText = `${weekStartDate.format("YYYY.MM")} ${Math.ceil(
        weekStartDate.date() / 7
    )}주차`;

    return (
        <Box sx={{ px: 2 }}>
            {/* 🔹 상단 제목 */}
            <Typography
                fontSize={14}
                fontWeight={700}
                color="#2F3033"
                textAlign="center"
                mt={2}
                mb={2}
            >
                {"<이번주 섭취 칼로리>"}
            </Typography>

            {/* 🔹 주차 네비게이션 */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    px: 1,
                }}
            >
                <Box onClick={handlePrevWeek} sx={{ cursor: "pointer" }}>
                    &lt;
                </Box>
                <Typography fontSize={14} fontWeight={600}>
                    {weekText}
                </Typography>
                <Box onClick={handleNextWeek} sx={{ cursor: "pointer" }}>
                    &gt;
                </Box>
            </Box>

            {/* 🔹 구분선 (초록색 연한 선) */}
            <Box
                sx={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#D9F3ED", // 연한 초록색
                    mb: 2.5,
                }}
            />

            {/* 🔹 캘린더 + 그래프 */}
            <Report_WeeklyCalendar
                data={weeklyData}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
            />

            {/* 🔹 구분선 (초록색 연한 선) */}
            <Box
                sx={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#D9F3ED", // 연한 초록색
                    mb: 1,
                    mt: 1,
                }}
            />
            <Report_WeeklyBarChart
                data={weeklyData.map(d => ({
                    dayLabel: d.dayLabel,
                    kcal: d.kcal,
                }))}
            />
        </Box>
    );
};

export default Report_Datagram;
