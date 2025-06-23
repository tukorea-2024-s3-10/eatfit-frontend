"use client";

import { Box, Button } from "@mui/material";
import { useMealNameSearchStore } from "@/app/store/useMealNameSearchStore";
import { useRouter } from "next/navigation";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";
import axiosInstance from "@/app/lib/axiosInstance";

const MealInputName_ConfirmButton = () => {
  const router = useRouter();
  const { selectedFoods } = useMealNameSearchStore();
  const selectedTime = useMealRecordStore(state => state.selectedTime);
  const updateKcal = useMealRecordStore(state => state.updateKcal);

  const handleConfirm = async () => {
    if (!selectedTime || selectedFoods.length === 0) {
      alert("음식을 선택하거나 시간대를 설정해주세요.");
      return;
    }

    try {
      const today = new Date().toISOString().slice(0, 10);
      for (const food of selectedFoods) {
        const payload = {
          date: today,
          mealType: selectedTime,
          foodName: food.name ?? "",
          mass: Number(food.mass ?? 100),
          calorie: Number(food.calorie ?? 0),
          carbohydrate: Number(food.carbohydrate ?? 0),
          sugar: Number(food.sugar ?? 0.1),
          protein: Number(food.protein ?? 0),
          fat: Number(food.fat ?? 0),
          saturatedFat: Number(food.saturatedFat ?? 0.1),
          transFat: Number(food.transFat ?? 0.0),
          sodiumGoal: Number(food.sodiumGoal ?? 200),
          cholesterol: Number(food.cholesterol ?? 180),
        };
        console.log("서버로 보낼 데이터:", payload);
        await axiosInstance.post("/api/core/dietrecord", payload);
      }
      // 상태에 반영 (총합 계산)
      const totalKcal = selectedFoods.reduce((acc, cur) => acc + Number(cur.calorie || 0), 0);
      const totalCarbs = selectedFoods.reduce((acc, cur) => acc + Number(cur.carbohydrate || 0), 0);
      const totalProtein = selectedFoods.reduce((acc, cur) => acc + Number(cur.protein || 0), 0);
      const totalFat = selectedFoods.reduce((acc, cur) => acc + Number(cur.fat || 0), 0);

      useNutritionPlanStore.getState().setTargetCalorie(totalKcal);
      useNutritionPlanStore.getState().setMacros({
        carbs: totalCarbs,
        protein: totalProtein,
        fat: totalFat,
      });
      updateKcal(selectedTime, totalKcal);
      // 이름 방식 selectedFoods를 photoFoodList 구조로 변환
      const foodsForPhotoList = selectedFoods.map(f => ({
        name: f.name,
        weight: f.mass ? `${f.mass}g` : "100g",
        calorie: Number(f.calorie ?? 0),
        carbs: Number(f.carbohydrate ?? 0),
        protein: Number(f.protein ?? 0),
        fat: Number(f.fat ?? 0),
        imageUrl: "/food-placeholder.png",
      }));
      useMealRecordStore.getState().setPhotoFoodList(foodsForPhotoList);
      router.push("/record/meal/loading");
    } catch (error) {
      console.error("❌ 식단 저장 실패:", error);
      alert("식단 저장 중 문제가 발생했습니다.");
    }
  };

  return (
    <Box sx={{ px: 2, pt: 4, pb: 6 }}>
      <Button
        variant="contained"
        fullWidth
        onClick={handleConfirm}
        sx={{
          py: 1.5,
          fontWeight: 600,
          fontSize: 15,
          borderRadius: 2,
          backgroundColor: "#15B493",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#12C08D",
          },
        }}
      >
        선택 완료
      </Button>
    </Box>
  );
};

export default MealInputName_ConfirmButton;
