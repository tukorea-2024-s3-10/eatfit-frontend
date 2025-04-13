// components/record/meal/input/name/MealInputName_SelectedList.tsx
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
                {selectedFoods.map((item, idx) => (
                    <Chip
                        key={idx}
                        label={`${item.name} (${item.weight})`}
                        onDelete={() => removeSelectedFood(item.name)}
                        sx={{
                            backgroundColor: "#F5F5FD",
                            color: "#2F3033",
                            fontSize: 13,
                            borderRadius: "999px",
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default MealInputName_SelectedList;
