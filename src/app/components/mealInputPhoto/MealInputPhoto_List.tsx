"use client";

import { Box, Typography } from "@mui/material";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";
import MealInputPhoto_ItemCard from "./MealInputPhoto_ItemCard";

export default function MealInputPhoto_List() {
    const list = useMealRecordStore(s => s.photoFoodList);

    if (list.length === 0) {
        return (
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography sx={{ fontSize: 14, color: "#909094" }}>
                    음식 인식 중입니다...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ px: 2, pt: 2 }}>
            {list.map((f, i) => (
                <MealInputPhoto_ItemCard key={i} {...f} />
            ))}
        </Box>
    );
}
