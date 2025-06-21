"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button, Collapse } from "@mui/material";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import axiosInstance from "@/app/lib/axiosInstance";

interface WeeklyKcalItem {
    dayLabel: string;
    kcal: number;
}

interface DietRecord {
    date: string;
    calorie: number;
}

const Dashboard_HealthReport = () => {
    const router = useRouter();
    const [weeklyKcal, setWeeklyKcal] = useState<WeeklyKcalItem[]>([]);
    const [feedbackText, setFeedbackText] = useState<string>("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchDietRecords = async () => {
            try {
                const res = await axiosInstance.get("/api/core/dietrecord");
                const records: DietRecord[] = res.data.data;

                const grouped = records.reduce<Record<string, number>>(
                    (acc, cur) => {
                        const date = cur.date;
                        const kcal = cur.calorie || 0;
                        acc[date] = (acc[date] || 0) + kcal;
                        return acc;
                    },
                    {}
                );

                const startOfWeek = dayjs().startOf("week");
                const days = ["일", "월", "화", "수", "목", "금", "토"];
                const result: WeeklyKcalItem[] = [];

                for (let i = 0; i < 7; i++) {
                    const date = startOfWeek.add(i, "day").format("YYYY-MM-DD");
                    const kcal = grouped[date] || 0;
                    result.push({ dayLabel: days[i], kcal });
                }

                setWeeklyKcal(result);
            } catch (error) {
                console.error("🥲 식단 기록 불러오기 실패", error);
            }
        };

        fetchDietRecords();
    }, []);

    useEffect(() => {
        const fetchNutritionData = async () => {
            try {
                const res = await axiosInstance.get(
                    "/api/users/me/nutrition/today"
                );
                const data = res.data.data;
                const nutritionData = {
                    calorie: data.calorie,
                    carbs: data.carbohydratesG,
                    fat: data.fatG,
                    protein: data.proteinG,
                };

                console.log("오늘의 영양소 정보:", nutritionData);
            } catch (error) {
                console.error("영양소 정보 불러오기 실패:", error);
            }
        };

        fetchNutritionData();
    }, []);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const res = await axiosInstance.get("/api/users/me/feedback");
                const feedback: string = res.data.data.feedback;
                setFeedbackText(feedback);
            } catch (error) {
                console.error("피드백 불러오기 실패:", error);
                setFeedbackText("피드백 정보를 불러올 수 없습니다.");
            }
        };

        fetchFeedback();
    }, []);

    return (
        <section className="w-full px-4 pt-4 flex flex-col items-center">
            <Box
                sx={{
                    width: 312,
                    minHeight: 248,
                    border: "1px solid #C8C4E9",
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    px: 2,
                    py: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
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
                        const safeKcal = kcal ?? 0;
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

                {/* ✅ 피드백 카드: 아코디언형 */}
                <Box
                    sx={{
                        width: "100%",
                        backgroundColor: "#fff",
                        border: "1px solid #E8E6FF",
                        borderRadius: "12px",
                        p: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        cursor: "pointer",
                    }}
                    onClick={() => setOpen(prev => !prev)}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 4,
                                    height: 16,
                                    backgroundColor: "#15B493",
                                    borderRadius: 2,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: "#2F3033",
                                }}
                            >
                                AI 건강 피드백
                            </Typography>
                        </Box>

                        <Typography
                            sx={{
                                fontSize: 12,
                                color: "#7C69EF",
                                fontWeight: 500,
                            }}
                        >
                            {open ? "접기 ▲" : "더보기 ▼"}
                        </Typography>
                    </Box>

                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Typography
                            sx={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: "#2F3033",
                                lineHeight: 1.5,
                                mt: 1.5,
                                whiteSpace: "pre-wrap",
                            }}
                        >
                            {feedbackText}
                        </Typography>
                    </Collapse>
                </Box>
            </Box>

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
