"use client";

import { Box, Chip, Typography } from "@mui/material";
import { useMealNameSearchStore } from "@/app/store/useMealNameSearchStore";
import axios from "axios";

// ✅ 여기서 바로 타입 정의
interface FoodApiItem {
    name: string;
    mass: number;
    calorie: number;
    carbohydrate: number;
    protein: number;
    fat: number;
}

const MealInputName_RecentKeywords = () => {
    const {
        recentKeywords,
        deleteRecentKeyword,
        setSearchResults,
        setKeyword,
    } = useMealNameSearchStore();

    const handleClick = async (keyword: string) => {
        setKeyword(keyword);

        try {
            const res = await axios.get(
                `https://api.eatfit.site/api/core/food?name=${encodeURIComponent(
                    keyword
                )}`
            );

            const converted = (res.data.data as FoodApiItem[]).map(item => ({
                name: item.name,
                weight: `${item.mass}g`,
                calorie: item.calorie,
                carbs: item.carbohydrate,
                protein: item.protein,
                fat: item.fat,
            }));

            setSearchResults(converted);
        } catch (e) {
            console.error("📛 최근 검색 재요청 실패", e);
        }
    };

    if (recentKeywords.length === 0) return null;

    return (
        <Box sx={{ px: 2, pt: 2 }}>
            <Typography fontWeight={600} fontSize={14} mb={1}>
                최근 검색어
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {recentKeywords.map((keyword, idx) => (
                    <Chip
                        key={idx}
                        label={keyword}
                        onClick={() => handleClick(keyword)}
                        onDelete={() => deleteRecentKeyword(keyword)}
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

export default MealInputName_RecentKeywords;
