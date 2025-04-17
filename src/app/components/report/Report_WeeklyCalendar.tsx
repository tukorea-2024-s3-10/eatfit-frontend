"use client";

import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

type WeeklyDataItem = {
    date: string; // YYYY-MM-DD
    dayLabel: string; // 일 ~ 토
    hasMeal: boolean;
};

interface Props {
    data: WeeklyDataItem[];
    selectedDate: string;
    onSelectDate: (date: string) => void;
}

const Report_WeeklyCalendar = ({ data, selectedDate, onSelectDate }: Props) => {
    const today = dayjs().format("YYYY-MM-DD");

    const getBackgroundColor = (item: WeeklyDataItem, index: number) => {
        if (item.date === today) {
            return index % 2 === 0 ? "#15B493" : "#7C73C0";
        }
        if (item.hasMeal) {
            return index % 2 === 0 ? "#9BE8D8" : "#E2DEFD";
        }
        return "#F3F3F3"; // 기본 회색 배경
    };

    const getTextColor = (item: WeeklyDataItem) => {
        return item.date === selectedDate ? "#ffffff" : "#2F3033";
    };

    return (
        <Box sx={{ px: 4, pb: 2 }}>
            {/* 요일 헤더 */}
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
                {data.map((item, idx) => (
                    <Typography
                        key={`day-${idx}`}
                        fontSize={12}
                        fontWeight={500}
                        textAlign="center"
                        sx={{ width: 32 }}
                    >
                        {item.dayLabel}
                    </Typography>
                ))}
            </Box>

            {/* 날짜 원형 표시 */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {data.map((item, idx) => {
                    const isSelected = item.date === selectedDate;
                    const bgColor = getBackgroundColor(item, idx);
                    const textColor = getTextColor(item);

                    return (
                        <Box
                            key={`date-${idx}`}
                            onClick={() => onSelectDate(item.date)}
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                backgroundColor: bgColor,
                                border: isSelected
                                    ? "2px solid #2F3033"
                                    : "none",
                                color: textColor,
                                fontSize: 13,
                                fontWeight: 600,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                transition: "all 0.2s",
                            }}
                        >
                            {dayjs(item.date).date()}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default Report_WeeklyCalendar;
