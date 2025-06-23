"use client";

import { Box, Chip, Typography } from "@mui/material";
import { useMealNameSearchStore } from "@/app/store/useMealNameSearchStore";
import axiosInstance from "@/app/lib/axiosInstance";

const MealInputName_RecentKeywords = () => {
  const {
    recentKeywords,
    deleteRecentKeyword,
    setSearchResults,
    setKeyword,
  } = useMealNameSearchStore();

  if (recentKeywords.length === 0) return null;

  const onClickChip = async (word: string) => {
    setKeyword(word);
    try {
      const res = await axiosInstance.get(
        `/api/core/food?name=${encodeURIComponent(word)}`
      );
      setSearchResults(res.data.data ?? []);
    } catch (e) {
      console.error("📛 최근 검색 재조회 실패:", e);
    }
  };

  return (
    <Box sx={{ px: 2, pt: 3 }}>
      <Typography
        fontWeight={600}
        fontSize={14}
        mb={1}
        sx={{ color: "#2F3033" }}
      >
        최근 검색어
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {recentKeywords.map((kw) => (
          <Chip
            key={kw}
            label={kw}
            onClick={() => onClickChip(kw)}
            onDelete={() => deleteRecentKeyword(kw)}
            sx={{
              borderRadius: "999px",
              backgroundColor: "#E0F7F3",
              fontSize: 13,
              color: "#2F3033",
              "&:hover": {
                backgroundColor: "#D1F2EC",
              },
              "& .MuiChip-deleteIcon": {
                color: "#909094",
                "&:hover": {
                  color: "#6D6D6D",
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MealInputName_RecentKeywords;
