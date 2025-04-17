// components/historyMeal/HistoryMeal_List.tsx
"use client";

import { Box, Typography } from "@mui/material";
import { useMealHistoryStore } from "@/app/store/useMealHistoryStore";
import HistoryMeal_Card from "./HistoryMeal_Card";

const HistoryMeal_List = () => {
    const { historyList, selectedDate } = useMealHistoryStore();
    console.log("📅 현재 선택된 날짜:", selectedDate);
    const todayData = historyList.find(item => item.date === selectedDate);
    console.log("🔍 찾은 데이터:", todayData);
    return (
        <Box sx={{ px: 2, pt: 2 }}>
            {todayData?.meals?.length ? (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 2,
                    }}
                >
                    {todayData.meals.map(meal => (
                        <HistoryMeal_Card
                            key={meal.time}
                            time={meal.time}
                            kcal={meal.foods.reduce(
                                (sum, food) => sum + food.calorie,
                                0
                            )}
                        />
                    ))}
                </Box>
            ) : (
                <Typography
                    textAlign="center"
                    color="#909094"
                    fontSize={14}
                    fontWeight={500}
                    mt={4}
                >
                    등록된 식단 기록이 없습니다.
                </Typography>
            )}
        </Box>
    );
};

export default HistoryMeal_List;
