"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Box, Typography, CircularProgress } from "@mui/material";
import axiosInstance from "@/app/lib/axiosInstance";
import Report_WeeklyCalendar from "@/app/components/report/Report_WeeklyCalendar";
import Report_WeeklyBarChart from "@/app/components/report/Report_WeeklyBarChart";
import { useMealHistoryStore } from "@/app/store/useMealHistoryStore";
import type {
    MealTime,
    MealHistoryEntry,
} from "@/app/store/useMealHistoryStore";

// 🔹 주간 요약 데이터 타입
type WeeklyDataItem = {
    date: string;
    dayLabel: string;
    kcal: number;
    hasMeal: boolean;
};

// 🔹 mealType(string) → MealTime 유니언 타입으로 변환
const toMealTime = (type: string): MealTime => {
    const valid: MealTime[] = ["아침", "점심", "저녁", "간식"];
    return valid.includes(type as MealTime) ? (type as MealTime) : "아침";
};

const Report_Datagram = () => {
    const [selectedDate, setSelectedDate] = useState(
        dayjs().format("YYYY-MM-DD")
    );
    const [weekStartDate, setWeekStartDate] = useState(dayjs().startOf("week"));
    const [weeklyData, setWeeklyData] = useState<WeeklyDataItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 🔁 이전 주차 이동
    const handlePrevWeek = () => {
        const newStart = weekStartDate.subtract(7, "day");
        setWeekStartDate(newStart);
        setSelectedDate(newStart.format("YYYY-MM-DD"));
    };

    // 🔁 다음 주차 이동
    const handleNextWeek = () => {
        const newStart = weekStartDate.add(7, "day");
        setWeekStartDate(newStart);
        setSelectedDate(newStart.format("YYYY-MM-DD"));
    };

    // 📦 식단 기록 API 호출 + 데이터 가공
    useEffect(() => {
        const fetchDietRecord = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await axiosInstance.get("/api/core/dietrecord");
                const rawData = res.data.data as {
                    date: string;
                    mealType: string;
                    foodName: string;
                    mass: number;
                    calorie: number;
                    carbohydrate: number;
                    sugar: number;
                    protein: number;
                    fat: number;
                    saturatedFat: number;
                    transFat: number;
                    sodiumGoal: number;
                    cholesterol: number;
                    id: number;
                }[];

                console.log("✅ API 응답 데이터:", rawData);

                // 📍 날짜별로 그룹핑
                const grouped: Record<string, MealHistoryEntry> = {};

                rawData.forEach(item => {
                    const food = {
                        name: item.foodName,
                        weight: `${item.mass}g`,
                        calorie: item.calorie,
                        carbs: item.carbohydrate,
                        protein: item.protein,
                        fat: item.fat,
                    };

                    if (!grouped[item.date]) {
                        grouped[item.date] = {
                            date: item.date,
                            meals: [],
                        };
                    }

                    const mealTime = toMealTime(item.mealType);
                    const existingMeal = grouped[item.date].meals.find(
                        meal => meal.time === mealTime
                    );

                    if (existingMeal) {
                        existingMeal.foods.push(food);
                    } else {
                        grouped[item.date].meals.push({
                            time: mealTime,
                            foods: [food],
                        });
                    }
                });

                const result = Object.values(grouped);
                console.log("📦 가공된 MealHistoryEntry 배열:", result);
                useMealHistoryStore.getState().setHistoryList(result);

                // ✅ 주간 요약 데이터 생성
                const week: WeeklyDataItem[] = [];
                for (let i = 0; i < 7; i++) {
                    const dateObj = weekStartDate.add(i, "day");
                    const date = dateObj.format("YYYY-MM-DD");
                    const dayLabel = ["일", "월", "화", "수", "목", "금", "토"][
                        dateObj.day()
                    ];

                    const entry = result.find(h => h.date === date);
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

                console.log("📊 주간 차트 데이터:", week);
                setWeeklyData(week);
            } catch (error) {
                console.error("❌ 식단 기록 불러오기 실패:", error);
                setError("식단 데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchDietRecord();
    }, [weekStartDate]);

    const weekText = `${weekStartDate.format("YYYY.MM")} ${Math.ceil(
        weekStartDate.date() / 7
    )}주차`;

    return (
        <Box sx={{ px: 2 }}>
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

            {/* 🔹 로딩 스피너 */}
            {loading && (
                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <CircularProgress size={24} />
                </Box>
            )}

            {/* 🔹 에러 메시지 */}
            {error && (
                <Typography
                    color="error"
                    fontSize={14}
                    fontWeight={500}
                    textAlign="center"
                    mt={2}
                >
                    {error}
                </Typography>
            )}

            {/* 🔹 데이터 있을 때만 렌더링 */}
            {!loading && !error && (
                <>
                    <Box
                        sx={{
                            width: "100%",
                            height: "1px",
                            backgroundColor: "#D9F3ED",
                            mb: 2.5,
                        }}
                    />

                    <Report_WeeklyCalendar
                        data={weeklyData}
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                    />

                    <Box
                        sx={{
                            width: "100%",
                            height: "1px",
                            backgroundColor: "#D9F3ED",
                            my: 1,
                        }}
                    />

                    <Report_WeeklyBarChart
                        data={weeklyData.map(d => ({
                            dayLabel: d.dayLabel,
                            kcal: d.kcal,
                        }))}
                    />
                </>
            )}
        </Box>
    );
};

export default Report_Datagram;
