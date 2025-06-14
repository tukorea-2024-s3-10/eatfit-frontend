"use client";

import { Box, Typography, Button } from "@mui/material";
import { useMealNameSearchStore } from "@/app/store/useMealNameSearchStore";
import { FoodInfo } from "@/app/store/useMealNameSearchStore";

const MealInputName_Results = () => {
    const { keyword, searchResults, selectedFoods, addSelectedFood } =
        useMealNameSearchStore();

    const isSelected = (name: string) =>
        selectedFoods.some(item => item.name === name);

    if (keyword.trim() === "") return null;

    if (searchResults.length === 0) {
        return (
            <Box sx={{ px: 2, pt: 4 }}>
                <Typography fontSize={14} color="#909094">
                    &quot;{keyword}&quot;에 대한 검색 결과가 없습니다.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ px: 2, pt: 2 }}>
            {searchResults.map((item: FoodInfo, idx) => (
                <Box
                    key={idx}
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
                        {item.name}{" "}
                        <Typography component="span" fontWeight={400}>
                            ({item.weight})
                        </Typography>
                    </Typography>

                    {["칼로리", "탄수화물", "단백질", "지방"].map(
                        (label, i) => (
                            <Box
                                key={label}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography fontSize={14}>{label}</Typography>
                                <Typography fontSize={14}>
                                    {
                                        [
                                            item.calorie + " kcal",
                                            item.carbs + " g",
                                            item.protein + " g",
                                            item.fat + " g",
                                        ][i]
                                    }
                                </Typography>
                            </Box>
                        )
                    )}

                    <Button
                        onClick={() => addSelectedFood(item)}
                        disabled={isSelected(item.name)}
                        fullWidth
                        sx={{
                            mt: 2,
                            backgroundColor: isSelected(item.name)
                                ? "#E0E0E0"
                                : "#12C08D",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 14,
                            borderRadius: "8px",
                            "&:hover": {
                                backgroundColor: isSelected(item.name)
                                    ? "#E0E0E0"
                                    : "#10B07F",
                            },
                        }}
                    >
                        {isSelected(item.name) ? "추가됨" : "추가하기"}
                    </Button>
                </Box>
            ))}
        </Box>
    );
};

export default MealInputName_Results;
