// components/record/meal/input/photo/MealInputPhoto_ItemCard.tsx
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

const MealInputPhoto_ItemCard = ({
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
                border: "1px solid #15B493",
                borderRadius: "12px",
                padding: 2,
                mb: 2,
                width: "312px",
                mx: "auto",
            }}
        >
            <Typography fontWeight={600} fontSize={16} mb={0.5}>
                {name}{" "}
                <Typography component="span" fontWeight={400}>
                    ({weight})
                </Typography>
            </Typography>
            <Typography fontSize={14}>열량: {calorie} kcal</Typography>
            <Typography fontSize={14}>탄수화물: {carbs} g</Typography>
            <Typography fontSize={14}>단백질: {protein} g</Typography>
            <Typography fontSize={14}>지방: {fat} g</Typography>
        </Box>
    );
};

export default MealInputPhoto_ItemCard;
