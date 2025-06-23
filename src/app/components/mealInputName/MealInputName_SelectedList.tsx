"use client";

import { Box, Chip, Typography } from "@mui/material";
import { useMealNameSearchStore } from "@/app/store/useMealNameSearchStore";

const MealInputName_SelectedList = () => {
  const { selectedFoods, removeSelectedFood } = useMealNameSearchStore();
  if (selectedFoods.length === 0) return null;

  return (
    <Box sx={{ px: 2, pt: 4 }}>
      <Typography fontWeight={600} fontSize={14} mb={1}>
        선택한 음식
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {selectedFoods.map((f) => (
          <Chip
          key={f.name}
          label={`${f.name} (${f.mass}g)`} // ✅ mass 사용
          onDelete={() => removeSelectedFood(f.name)}
          sx={{ backgroundColor: "#F5F5FD", borderRadius: "999px" }}
        />
        ))}
      </Box>
    </Box>
  );
};
export default MealInputName_SelectedList;
