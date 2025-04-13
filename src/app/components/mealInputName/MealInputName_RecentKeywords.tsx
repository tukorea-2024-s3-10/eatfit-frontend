// components/record/meal/input/name/MealInputName_RecentKeywords.tsx
"use client";

import { Box, Chip, Typography } from "@mui/material";
import { useMealNameSearchStore } from "@/app/store/useMealNameSearchStore";
import axios from "axios";

const MealInputName_RecentKeywords = () => {
    const {
        recentKeywords,
        deleteRecentKeyword,
        setSearchResults,
        setKeyword,
    } = useMealNameSearchStore();

    // 🔄 태그 클릭 시 재검색 실행
    const handleClick = async (keyword: string) => {
        setKeyword(keyword); // 상태에도 반영

        try {
            const res = await axios.get("/api/mock/photo-foods"); // mock API 호출
            setSearchResults(res.data.foods);
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
