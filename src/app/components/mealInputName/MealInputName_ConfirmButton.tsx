"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMealNameSearchStore } from "@/app/store/useMealNameSearchStore";
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";
import axiosInstance from "@/app/lib/axiosInstance";

const MealInputName_ConfirmButton = () => {
    const router = useRouter();
    const selectedFoods = useMealNameSearchStore(state => state.selectedFoods);
    const selectedTime = useMealRecordStore(state => state.selectedTime);
    const updateKcal = useMealRecordStore(state => state.updateKcal);

    const isDisabled = selectedFoods.length === 0 || !selectedTime;

    const handleConfirm = async () => {
        if (isDisabled) return;

        const today = new Date().toISOString().slice(0, 10);

        // ✅ 전체 영양소 합산
        const total = selectedFoods.reduce(
            (acc, food) => {
                acc.calorie += food.calorie;
                acc.carbs += food.carbs;
                acc.protein += food.protein;
                acc.fat += food.fat;
                return acc;
            },
            { calorie: 0, carbs: 0, protein: 0, fat: 0 }
        );

        try {
            // ✅ 선택된 음식들을 각각 등록
            for (const food of selectedFoods) {
                await axiosInstance.post("/api/core/dietrecord", {
                    date: today,
                    mealType: selectedTime,
                    foodName: food.name,
                    mass: Number(food.weight.replace("g", "")) || 100,
                    calorie: food.calorie,
                    carbohydrate: food.carbs,
                    sugar: 0.1,
                    protein: food.protein,
                    fat: food.fat,
                    saturatedFat: 0.1,
                    transFat: 0.0,
                    sodiumGoal: 200,
                    cholesterol: 180,
                });
            }

            // ✅ NutritionPlanStore에 저장
            useNutritionPlanStore.getState().setTargetCalorie(total.calorie);
            useNutritionPlanStore.getState().setMacros({
                carbs: total.carbs,
                protein: total.protein,
                fat: total.fat,
            });

            // ✅ 기록된 kcal 저장
            updateKcal(selectedTime, total.calorie);

            console.log("✅ 식단 전체 등록 완료:", selectedFoods);
            router.push("/record/meal/loading");
        } catch (error) {
            console.error("❌ 식단 등록 중 오류 발생:", error);
            alert("식단 등록 중 문제가 발생했어요!");
        }
    };

    return (
        <Box
            sx={{
                px: 2,
                pt: 4,
                pb: 6,
                display: "flex",
                justifyContent: "center",
                minHeight: "100px",
            }}
        >
            {!isDisabled && (
                <Button
                    onClick={handleConfirm}
                    sx={{
                        width: 312,
                        height: 60,
                        backgroundColor: "#12C08D",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 16,
                        borderRadius: "12px",
                        "&:hover": {
                            backgroundColor: "#10B07F",
                        },
                    }}
                >
                    확인하고 등록하기
                </Button>
            )}
        </Box>
    );
};

export default MealInputName_ConfirmButton;
