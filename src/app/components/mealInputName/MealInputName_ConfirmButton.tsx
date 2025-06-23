"use client";

import { Box, Button } from "@mui/material";
import { useMealNameSearchStore } from "@/app/store/useMealNameSearchStore";

const MealInputName_ConfirmButton = () => {
  const { selectedFoods } = useMealNameSearchStore();

  const handleConfirm = () => {
    if (selectedFoods.length === 0) {
      alert("선택한 음식이 없습니다.");
      return;
    }

    selectedFoods.forEach((food) => {
      console.log("✅ 선택된 음식:", {
        이름: food.name,
        무게: food.mass,
        칼로리: food.calorie,
        탄수화물: food.carbohydrate,
        단백질: food.protein,
        지방: food.fat,
      });
    });

    alert("선택한 음식 정보가 콘솔에 출력되었습니다.");
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
