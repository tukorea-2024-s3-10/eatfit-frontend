// /src/app/components/historyMeal/historyMeal_HistoryCard.tsx
"use client";

import { Box, Typography, Chip } from "@mui/material";

interface Props {
    date: string;
    meals: { time: string; totalKcal: number }[];
}

const HistoryMeal_HistoryCard = ({ date, meals }: Props) => {
    return (
        <Box
            sx={{
                border: "1px solid #E0E0E0",
                borderRadius: "12px",
                padding: 2,
                mb: 2,
                backgroundColor: "#fff",
            }}
        >
            <Typography fontWeight={600} fontSize={16} mb={1}>
                {date}
            </Typography>

            {meals.length === 0 ? (
                <Typography fontSize={14} color="#999">
                    기록 없음
                </Typography>
            ) : (
                meals.map(meal => (
                    <Box
                        key={meal.time}
                        display="flex"
                        justifyContent="space-between"
                        mt={0.5}
                    >
                        <Chip label={meal.time} size="small" />
                        <Typography fontSize={14}>
                            {meal.totalKcal} kcal
                        </Typography>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default HistoryMeal_HistoryCard;
