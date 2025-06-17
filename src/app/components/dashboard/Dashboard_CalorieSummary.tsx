"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ✅ 상태관리 store
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";

// ✅ axios 인스턴스
import axiosInstance from "@/app/lib/axiosInstance";

// ✅ chart.js 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard_CalorieSummary = () => {
    
    // 새로 추가된 부분 (시작)
    const [todayNutrition, setTodayNutrition] = useState({
        calorie: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
    });

    useEffect(() => {
        const fetchTodayNutrition = async () => {
            try {
                const res = await axiosInstance.get("/api/users/me/nutrition/today");
                const data = res.data.data;
                setTodayNutrition({
                    calorie: data.calorie,
                    carbs: data.carbohydratesG,
                    protein: data.proteinG,
                    fat: data.fatG,
                });
            } catch (err) {
                console.error("당일 섭취량 조회 오류", err);
            }
        };
        fetchTodayNutrition();
    }, []);
    // 새로 추가된 부분 (끝)

    // Zustand에서 값 불러오기
    const targetCalorie = useNutritionPlanStore(state => state.targetCalorie);
    const carbs = useNutritionPlanStore(state => state.carbs);
    const protein = useNutritionPlanStore(state => state.protein);
    const fat = useNutritionPlanStore(state => state.fat);

    // Zustand 액션: 목표 섭취량 설정
    const setGoalsFromAPI = useNutritionPlanStore(
        state => state.setGoalsFromAPI
    );

    // ✅ 목표 섭취량 API 호출
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const res = await axiosInstance.get(
                    "/api/core/users/intake-goal"
                );
                const data = res.data.data;
                setGoalsFromAPI(data);
            } catch (err) {
                console.error("🥲 목표 섭취량 조회 실패", err);
            }
        };

        fetchGoals();
    }, [setGoalsFromAPI]);

    // 오늘 날짜 포맷
    const today = new Date();
    const formattedDate = `${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${today.getDate().toString().padStart(2, "0")}`;

    // 🔸 도넛 차트 데이터
    const chartData = {
        datasets: [
            {
                data: [
                    todayNutrition.calorie,
                    Math.max(targetCalorie - todayNutrition.calorie, 0),
                ],
                backgroundColor: ["#15B493", "#9BE8D8"],
                borderWidth: 0,
            },
        ],
    };

    // 🔸 도넛 차트 옵션
    const chartOptions = {
        cutout: "70%",
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <section className="w-full mt-4 px-4 flex justify-center">
            <Box
                sx={{
                    width: "312px",
                    height: "457px",
                    border: "1px solid #C8C4E9",
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    px: 3,
                    py: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* 🔹 상단 제목 */}
                <Typography
                    sx={{ fontSize: "14px", fontWeight: 700, color: "#2F3033" }}
                >
                    {"<오늘의 칼로리>"}
                </Typography>

                {/* 🔹 목표 칼로리 */}
                <Typography
                    sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "#2F3033",
                        mt: 0.5,
                    }}
                >
                    목표량: {targetCalorie.toLocaleString()} Kcal
                </Typography>

                {/* 🔹 도넛 차트 */}
                <Box
                    sx={{
                        width: 160,
                        height: 160,
                        my: 2,
                        mb: 4,
                        position: "relative",
                    }}
                >
                    <Doughnut data={chartData} options={chartOptions} />
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: 700,
                                color: "#2F3033",
                            }}
                        >
                            {todayNutrition.calorie} Kcal
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "12px",
                                fontWeight: 400,
                                color: "#909094",
                            }}
                        >
                            &lt;{formattedDate}&gt;
                        </Typography>
                    </Box>
                </Box>

                {/* 🔹 안내 문구 */}
                <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#2F3033",
                        textAlign: "center",
                        mb: 3,
                    }}
                >
                    오늘의 목표량이
                    <br />다 채워지지 않았어요!
                </Typography>

                {/* 🔹 하루 섭취 영양소 */}
                <Typography
                    sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#909094",
                        mb: 1,
                    }}
                >
                    하루 섭취 영양소
                </Typography>

                {/* 🔹 탄단지 리스트 */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "100%",
                        px: 1,
                    }}
                >
                    {[
                        { label: "탄수화물", value: todayNutrition.carbs },
                        { label: "단백질", value: todayNutrition.protein },
                        { label: "지방", value: todayNutrition.fat },
                    ].map(nutrient => (
                        <Box key={nutrient.label} sx={{ textAlign: "center" }}>
                            <Typography
                                sx={{
                                    fontSize: "24px",
                                    fontWeight: 700,
                                    color: "#7C69EF",
                                    display: "inline",
                                }}
                            >
                                {nutrient.value}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    color: "#7C69EF",
                                    display: "inline",
                                    ml: "2px",
                                }}
                            >
                                g
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    fontWeight: 400,
                                    color: "#2F3033",
                                    mt: 0.5,
                                }}
                            >
                                {nutrient.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </section>
    );
};

export default Dashboard_CalorieSummary;
