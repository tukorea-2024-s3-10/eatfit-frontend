"use client";

import { Box, Typography, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useWeightStore } from "@/app/store/useWeightStore";
import dayjs from "dayjs";

const WeightRecord_WeeklyChart_Header = () => {
    const centerDate = useWeightStore(state => state.centerDate);
    const setCenterDate = useWeightStore(state => state.setCenterDate);

    const handlePrevWeek = () => {
        setCenterDate(centerDate.subtract(1, "week"));
    };

    const handleNextWeek = () => {
        setCenterDate(centerDate.add(1, "week"));
    };

    const formatted = `${centerDate.format("YYYY.MM")} ${Math.ceil(
        centerDate.date() / 7
    )}주차`;

    const startOfWeek = centerDate.startOf("week").add(1, "day"); // 월~일
    const today = dayjs();

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const date = startOfWeek.add(i, "day");
        return {
            dayLabel: date.format("dd"), // 월, 화, ...
            dateLabel: date.format("D"), // 1, 2, ...
            isSunday: i === 6,
            isSaturday: i === 5,
            isToday: date.isSame(today, "day"),
        };
    });

    return (
        <Box px={3} pt={5}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1} // 버튼 사이 간격
                mb={1}
            >
                <Typography fontWeight={600} fontSize={16}>
                    [ 이번주 몸무게 변화 ]
                </Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={1}
            >
                <IconButton onClick={handlePrevWeek} size="small">
                    <ChevronLeft />
                </IconButton>
                <Typography fontSize={14} fontWeight={600}>
                    {formatted}
                </Typography>
                <IconButton onClick={handleNextWeek} size="small">
                    <ChevronRight />
                </IconButton>
            </Box>
            <hr />
            {/* ✅ 요일 & 날짜 라벨 */}
            <Box
                display="flex"
                justifyContent="space-between"
                px={1}
                sx={{ gap: "8px" }}
            >
                {weekDays.map(
                    (
                        { dayLabel, dateLabel, isSunday, isSaturday, isToday },
                        idx
                    ) => (
                        <Box
                            key={idx}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            width="100%"
                            height={48}
                            borderRadius="8px"
                            sx={{
                                backgroundColor: isToday
                                    ? "#F5F5FD"
                                    : "transparent",
                            }}
                        >
                            <Typography
                                fontSize={12}
                                fontWeight={500}
                                color={
                                    isSunday
                                        ? "#FF5C5C"
                                        : isSaturday
                                        ? "#4C6EF5"
                                        : "#666"
                                }
                            >
                                {dayLabel}
                            </Typography>
                            <Typography
                                fontSize={13}
                                fontWeight={600}
                                color={
                                    isSunday
                                        ? "#FF5C5C"
                                        : isSaturday
                                        ? "#4C6EF5"
                                        : "#2F3033"
                                }
                            >
                                {dateLabel}
                            </Typography>
                        </Box>
                    )
                )}
            </Box>
        </Box>
    );
};

export default WeightRecord_WeeklyChart_Header;
