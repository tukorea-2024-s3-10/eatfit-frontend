"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";

const MealInputManual_ConfirmButton = () => {
    const router = useRouter();

    const selectedTime = useMealRecordStore(state => state.selectedTime);
    const updateKcal = useMealRecordStore(state => state.updateKcal);
    const manualInput = useMealRecordStore(state => state.manualInput);

    // ✅ 디버깅용 로그
    console.log("🧪 확인용 상태:", {
        name: manualInput.name,
        calorie: manualInput.calorie,
        typeofCalorie: typeof manualInput.calorie,
        selectedTime,
    });

    // ✅ 비활성화 조건 → string이면 숫자로 변환해서 비교!
    const isDisabled =
        !manualInput.name.trim() ||
        Number(manualInput.calorie) <= 0 ||
        !selectedTime;

    // ✅ 등록 버튼 클릭 핸들러
    const handleConfirm = () => {
        if (isDisabled || !selectedTime) return;

        // ✅ NutritionPlan에 저장
        useNutritionPlanStore
            .getState()
            .setTargetCalorie(Number(manualInput.calorie));
        useNutritionPlanStore.getState().setMacros({
            carbs: Number(manualInput.carbs),
            protein: Number(manualInput.protein),
            fat: Number(manualInput.fat),
        });

        // ✅ MealRecord에 kcal 저장
        updateKcal(selectedTime, Number(manualInput.calorie));

        console.log("✅ 저장 완료!", manualInput);

        // ✅ 다음 페이지 이동
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
