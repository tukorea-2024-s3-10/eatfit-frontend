// components/record/meal/input/name/MealInputName_ResultCard.tsx
"use client";

import { Box, Typography } from "@mui/material";

interface Props {
    name: string;
    weight: string;
    calorie: number;
    carbs: number;
    protein: number;
    fat: number;
}

const MealInputName_ResultCard = ({
    name,
    weight,
    calorie,
    carbs,
    protein,
    fat,
}: Props) => {
    return (
        <Box
            sx={{
                border: "1.5px solid #12C08D",
                borderRadius: "12px",
                padding: 2,
                width: "312px",
                mx: "auto",
                mb: 2,
            }}
        >
            <Typography fontWeight={600} fontSize={16} mb={1}>
                {name}{" "}
                <Typography component="span" fontWeight={400}>
                    ({weight})
                </Typography>
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontSize={14}>칼로리</Typography>
                <Typography fontSize={14}>{calorie} kcal</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontSize={14}>탄수화물</Typography>
                <Typography fontSize={14}>{carbs} g</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontSize={14}>단백질</Typography>
                <Typography fontSize={14}>{protein} g</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontSize={14}>지방</Typography>
                <Typography fontSize={14}>{fat} g</Typography>
            </Box>
        </Box>
    );
};

export default MealInputName_ResultCard;
