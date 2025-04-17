"use client";

import { Box, Typography } from "@mui/material";
import Dinner_RecommendCard from "./Dinner_RecommendCard";

interface FoodItem {
    name: string;
    image: string;
    calorie: number;
    carbs: number;
    protein: number;
    fat: number;
}

interface Props {
    title: string;
    items: FoodItem[];
    onFoodClick: (food: FoodItem) => void;
}

const Dinner_RecommendSection = ({ title, items, onFoodClick }: Props) => {
    return (
        <Box sx={{ px: 4, pb: 3 }}>
            <Typography fontSize={14} fontWeight={600} color="#2F3033" mb={1.5}>
                {title}
            </Typography>

            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                {items.map((food, i) => (
                    <div key={i} onClick={() => onFoodClick(food)}>
                        <Dinner_RecommendCard {...food} />
                    </div>
                ))}
            </Box>
        </Box>
    );
};

export default Dinner_RecommendSection;
