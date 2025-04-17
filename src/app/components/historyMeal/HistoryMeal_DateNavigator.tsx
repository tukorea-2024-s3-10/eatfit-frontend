"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMealHistoryStore } from "@/app/store/useMealHistoryStore"; // ✅ 경로 확인!
import dayjs from "dayjs";

const HistoryMeal_DateNavigator = () => {
    const selectedDate = useMealHistoryStore(state => state.selectedDate);
    const setSelectedDate = useMealHistoryStore(state => state.setSelectedDate);

    const handlePrev = () => {
        const prevDate = dayjs(selectedDate)
            .subtract(1, "day")
            .format("YYYY-MM-DD");
        setSelectedDate(prevDate);
    };

    const handleNext = () => {
        const nextDate = dayjs(selectedDate).add(1, "day");
        const today = dayjs();

        if (nextDate.isAfter(today)) return; // 오늘 이후는 막기
        setSelectedDate(nextDate.format("YYYY-MM-DD"));
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                pt: 2,
            }}
        >
            {/* ◀ 이전 */}
            <IconButton onClick={handlePrev}>
                <ChevronLeft size={20} />
            </IconButton>

            {/* 📅 날짜 표시 */}
            <Typography fontWeight={600} fontSize={16}>
                {dayjs(selectedDate).format("YYYY.MM.DD")}
            </Typography>

            {/* ▶ 다음 */}
            <IconButton onClick={handleNext}>
                <ChevronRight size={20} />
            </IconButton>
        </Box>
    );
};

export default HistoryMeal_DateNavigator;
