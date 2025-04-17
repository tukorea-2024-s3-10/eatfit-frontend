"use client";

import { Box, Typography } from "@mui/material";
import { MealTime } from "@/app/store/useMealHistoryStore";
import { CheckCircle } from "lucide-react"; // ✅ 체크 아이콘 추가

interface Props {
    time: MealTime;
    kcal: number;
}

const HistoryMeal_Card = ({ time, kcal }: Props) => {
    const showCheck = kcal > 0;

    return (
        <Box
            sx={{
                width: 154,
                height: 100,
                border: "1.5px solid #7C73C0",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                px: 2,
                py: 1.5,
                position: "relative", // ✅ 아이콘 위치 고정을 위해 필요
            }}
        >
            {/* ✅ 체크 아이콘 조건부 표시 */}
            {showCheck && (
                <CheckCircle
                    size={18}
                    strokeWidth={2}
                    color="#32C671"
                    style={{ position: "absolute", top: 8, right: 8 }}
                />
            )}

            {/* 식사 시간 라벨 */}
            <Typography fontSize={14} color="#2F3033">
                {time}
            </Typography>

            {/* 칼로리 */}
            <Box display="flex" justifyContent="flex-end">
                <Typography fontSize={16} fontWeight={600} color="#2F3033">
                    {kcal} Kcal
                </Typography>
            </Box>
        </Box>
    );
};

export default HistoryMeal_Card;
