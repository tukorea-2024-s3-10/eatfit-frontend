"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useMealHistoryStore } from "@/app/store/useMealHistoryStore";

// 각 요일별 데이터 구조
interface WeeklyKcalItem {
    dayLabel: string;
    kcal: number;
}

const Dashboard_HealthReport = () => {
    const router = useRouter();
    const { historyList, setHistoryList } = useMealHistoryStore();

    const [weeklyKcal, setWeeklyKcal] = useState<WeeklyKcalItem[]>([]);

    // ✅ 최초 mock 데이터 fetch → zustand 저장
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/mock/history-meal");
            const data = await res.json();
            setHistoryList(data.history);
        };
        fetchData();
    }, [setHistoryList]);

    // ✅ 요일별 총 섭취 칼로리 계산
    useEffect(() => {
        const startOfWeek = dayjs().startOf("week"); // 일요일 기준
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const result: WeeklyKcalItem[] = [];

        for (let i = 0; i < 7; i++) {
            const date = startOfWeek.add(i, "day").format("YYYY-MM-DD");
            const dayLabel = days[i];

            const entry = historyList.find(item => item.date === date);
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

            result.push({ dayLabel, kcal });
        }

        setWeeklyKcal(result);
    }, [historyList]);

    return (
        <section className="w-full px-4 pt-4 flex flex-col items-center">
            {/* 🔸 건강 리포트 카드 */}
            <Box
                sx={{
                    width: "312px",
                    height: "248px",
                    border: "1px solid #C8C4E9",
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    px: 2,
                    py: 3,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                {/* 🔹 제목 */}
                <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#2F3033",
                        textAlign: "center",
                    }}
                >
                    {"<건강 리포트>"}
                </Typography>

                {/* 🔹 요일별 막대 그래프 */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1.5,
                        alignItems: "end",
                        height: 100,
                        px: 1,
                        mt: 1,
                    }}
                >
                    {weeklyKcal.map(({ dayLabel, kcal }, i) => {
                        const safeKcal = kcal ?? 0; // 혹시 모를 undefined 대비
                        const barHeight = Math.min(safeKcal / 30, 80);
                        const color = i % 2 === 0 ? "#15B493" : "#7C69EF";

                        return (
                            <Box
                                key={i}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: 30,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "8px",
                                        fontWeight: 500,
                                        color,
                                        mb: 0.5,
                                        textAlign: "center",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {safeKcal.toLocaleString()}Kcal
                                </Typography>
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: `${barHeight}px`,
                                        backgroundColor: color,
                                        borderRadius: "4px",
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        color: "#2F3033",
                                        mt: 0.5,
                                    }}
                                >
                                    {dayLabel}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>

                {/* 🔹 하단 멘트 */}
                <Typography
                    sx={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#2F3033",
                        textAlign: "center",
                        mt: 1,
                    }}
                >
                    이번주는 목표 칼로리를 잘 유지하고 있어요!
                </Typography>
            </Box>

            {/* 🔹 자세히 보기 버튼 */}
            <Box sx={{ width: "312px", textAlign: "right", mt: "4px" }}>
                <Button
                    onClick={() => router.push("/report")}
                    sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "#15B493",
                        textTransform: "none",
                        padding: 0,
                        minWidth: 0,
                        mr: 1,
                    }}
                >
                    자세히 보기 &gt;
                </Button>
            </Box>
        </section>
    );
};

export default Dashboard_HealthReport;
