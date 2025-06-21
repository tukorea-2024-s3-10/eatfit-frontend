"use client";

import { Box, Typography } from "@mui/material";
import { useMealHistoryStore } from "@/app/store/useMealHistoryStore";
import MealInputName_ResultCard from "../mealInputName/MealInputName_ResultCard";
import type { MealTime } from "@/app/store/useMealHistoryStore";

// 시간대 순서 고정용
const MEAL_ORDER: MealTime[] = ["아침", "점심", "저녁", "간식"];

const HistoryMeal_FoodList = () => {
    const { historyList, selectedDate } = useMealHistoryStore();

    const todayData = historyList.find(item => item.date === selectedDate);

    // ❗ todayData 또는 meals가 없을 때 early return
    if (!todayData || !Array.isArray(todayData.meals)) {
        return (
            <Box sx={{ px: 2, pb: 4 }}>
                <Typography
                    fontSize={16}
                    fontWeight={600}
                    mt={2}
                    mb={2}
                    textAlign="center"
                >
                    &lt;오늘의 영양소 섭취&gt;
                </Typography>
                <Typography textAlign="center" color="gray">
                    기록된 식단 정보가 없습니다.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ px: 2, pb: 4 }}>
            <Typography
                fontSize={16}
                fontWeight={600}
                mt={2}
                mb={2}
                textAlign="center"
            >
                &lt;오늘의 영양소 섭취&gt;
            </Typography>

            {MEAL_ORDER.map(mealTime => {
                const meal = todayData.meals.find(m => m.time === mealTime);

                if (
                    !meal ||
                    !Array.isArray(meal.foods) ||
                    meal.foods.length === 0
                )
                    return null;

                return (
                    <Box key={mealTime} sx={{ mb: 3 }}>
                        <Typography
                            fontWeight={700}
                            fontSize={16}
                            color="#2F3033"
                            mb={1}
                            textAlign="center"
                        >
                            {mealTime}
                        </Typography>

                        {meal.foods.map((food, idx) => (
                            <MealInputName_ResultCard
                                key={`${mealTime}-${idx}`}
                                name={food.name}
                                weight={food.weight}
                                calorie={food.calorie}
                                carbs={food.carbs}
                                protein={food.protein}
                                fat={food.fat}
                            />
                        ))}
                    </Box>
                );
            })}
        </Box>
    );
};

export default HistoryMeal_FoodList;
