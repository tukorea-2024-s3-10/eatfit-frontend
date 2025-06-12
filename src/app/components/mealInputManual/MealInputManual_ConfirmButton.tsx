"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";
import axiosInstance from "@/app/lib/axiosInstance"; // ✅ axiosInstance 사용

const MealInputManual_ConfirmButton = () => {
    const router = useRouter();

    const selectedTime = useMealRecordStore(state => state.selectedTime);
    const updateKcal = useMealRecordStore(state => state.updateKcal);
    const manualInput = useMealRecordStore(state => state.manualInput);

    const isDisabled =
        !manualInput.name.trim() ||
        Number(manualInput.calorie) <= 0 ||
        !selectedTime;

    const handleConfirm = async () => {
        if (isDisabled || !selectedTime) return;

        try {
            const today = new Date().toISOString().slice(0, 10); // ex: "2025-06-07"

            await axiosInstance.post(
                "https://api.eatfit.site/api/core/dietrecord",
                {
                    date: today,
                    mealType: selectedTime,
                    foodName: manualInput.name,
                    mass: 100, // ✳️ 입력 UI 없음 → 임시값
                    calorie: manualInput.calorie,
                    carbohydrate: manualInput.carbs,
                    sugar: 0.1, // ✳️ 고정값 (UI 없음)
                    protein: manualInput.protein,
                    fat: manualInput.fat,
                    saturatedFat: 0.1, // ✳️ 고정값 (UI 없음)
                    transFat: 0.0,
                    sodiumGoal: 200,
                    cholesterol: 180,
                }
            );

            // ✅ 상태 저장
            useNutritionPlanStore
                .getState()
                .setTargetCalorie(Number(manualInput.calorie));
            useNutritionPlanStore.getState().setMacros({
                carbs: Number(manualInput.carbs),
                protein: Number(manualInput.protein),
                fat: Number(manualInput.fat),
            });

            updateKcal(selectedTime, Number(manualInput.calorie));

            console.log("✅ 저장 및 API 등록 완료!", manualInput);

            router.push("/record/meal/loading");
        } catch (error) {
            console.error("❌ 식단 등록 실패:", error);
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
            <Button
                onClick={handleConfirm}
                disabled={isDisabled}
                sx={{
                    width: 312,
                    height: 60,
                    backgroundColor: isDisabled ? "#C3C6CF" : "#12C08D",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 16,
                    borderRadius: "12px",
                    "&:hover": {
                        backgroundColor: isDisabled ? "#C3C6CF" : "#10B07F",
                    },
                }}
            >
                등록하기
            </Button>
        </Box>
    );
};

export default MealInputManual_ConfirmButton;
