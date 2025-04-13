// components/record/meal/input/name/MealInputName_ConfirmButton.tsx
"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMealNameSearchStore } from "@/app/store/useMealNameSearchStore";
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";

const MealInputName_ConfirmButton = () => {
    const router = useRouter();
    const selectedFoods = useMealNameSearchStore(state => state.selectedFoods);

    const isDisabled = selectedFoods.length === 0;

    const handleConfirm = () => {
        if (selectedFoods.length === 0) return;

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

        // ✅ NutritionPlanStore에 저장
        useNutritionPlanStore.getState().setTargetCalorie(total.calorie);
        useNutritionPlanStore.getState().setMacros({
            carbs: total.carbs,
            protein: total.protein,
            fat: total.fat,
        });

        console.log("🍽️ 저장된 총 섭취량:", total);

        // ✅ 페이지 이동 (예: 대시보드 또는 리포트)
        router.push("/dashboard");
    };

    return (
        <Box
            sx={{
                px: 2,
                pt: 4,
                pb: 6,
                display: "flex",
                justifyContent: "center",
                minHeight: "100px", // ✅ 위아래 밀림 방지
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
