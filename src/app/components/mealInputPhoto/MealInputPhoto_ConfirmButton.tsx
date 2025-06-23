"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";
import axiosInstance from "@/app/lib/axiosInstance";

const MealInputPhoto_ConfirmButton = () => {
  const router = useRouter();

  const selectedTime = useMealRecordStore(state => state.selectedTime);
  const updateKcal = useMealRecordStore(state => state.updateKcal);
  const photoFoodList = useMealRecordStore(state => state.photoFoodList);

  const handleClick = async () => {
    if (!selectedTime || photoFoodList.length === 0) {
      alert("음식을 선택하거나 시간대를 설정해주세요.");
      return;
    }

    try {
      const today = new Date().toISOString().slice(0, 10); // 예: 2025-06-23

      // 여러 음식 등록
      for (const food of photoFoodList) {
        const payload = {
          date: today,
          mealType: selectedTime,
          foodName: food.name ?? "",
          mass: Number(food.weight ?? 100),
          calorie: Number(food.calorie ?? 0),
          carbohydrate: Number(food.carbs ?? 0),
          sugar: 0.1,
          protein: Number(food.protein ?? 0),
          fat: Number(food.fat ?? 0),
          saturatedFat: 0.1,
          transFat: 0.0,
          sodiumGoal: 200,
          cholesterol: 180,
        };
        console.log("서버로 보낼 데이터:", payload);
        await axiosInstance.post("/api/core/dietrecord", payload);
      }

      // 🔄 상태에 반영 (총합 계산)
      const totalKcal = photoFoodList.reduce((acc, cur) => acc + Number(cur.calorie || 0), 0);
      const totalCarbs = photoFoodList.reduce((acc, cur) => acc + Number(cur.carbs || 0), 0);
      const totalProtein = photoFoodList.reduce((acc, cur) => acc + Number(cur.protein || 0), 0);
      const totalFat = photoFoodList.reduce((acc, cur) => acc + Number(cur.fat || 0), 0);

      useNutritionPlanStore.getState().setTargetCalorie(totalKcal);
      useNutritionPlanStore.getState().setMacros({
        carbs: totalCarbs,
        protein: totalProtein,
        fat: totalFat,
      });

      updateKcal(selectedTime, totalKcal);

      console.log("✅ 사진 음식 저장 완료:", photoFoodList);
      router.push("/record/meal/loading");
    } catch (error) {
      console.error("❌ 식단 저장 실패:", error);
      alert("식단 저장 중 문제가 발생했습니다.");
    }
  };

  return (
    <Box
      sx={{
        px: 2,
        pt: 4,
        pb: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        onClick={handleClick}
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
        확인했어요!
      </Button>
    </Box>
  );
};

export default MealInputPhoto_ConfirmButton;
