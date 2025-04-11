"use client";

import { Box, Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { useWeightStore } from "@/app/store/useWeightStore";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { Dayjs } from "dayjs";

// ✅ 날짜별 점 표시용 커스텀 Day 렌더링
const CustomDay = (props: PickersDayProps<Dayjs>) => {
    const { day } = props;
    const weightByDate = useWeightStore(state => state.weightByDate); // ✅ selector 방식
    const dateKey = day.format("YYYY-MM-DD");
    const hasWeight = Boolean(weightByDate[dateKey]);

    return (
        <Badge
            overlap="circular"
            variant="dot"
            color="success"
            invisible={!hasWeight}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            sx={{
                "& .MuiBadge-dot": {
                    backgroundColor: "#15B493",
                },
            }}
        >
            <PickersDay
                {...props}
                disableMargin
                sx={{
                    "&.Mui-selected": {
                        backgroundColor: "#00C092 !important",
                        color: "#fff",
                    },
                }}
            />
        </Badge>
    );
};

const WeightRecord_Calendar = () => {
    const [isClient, setIsClient] = useState(false);
    const selectedDate = useWeightStore(state => state.selectedDate);
    const setSelectedDate = useWeightStore(state => state.setSelectedDate);

    // ✅ 클라이언트 전용 렌더링
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <Box
            sx={{
                width: 320,
                height: 382,
                mx: "auto",
            }}
        >
            <DateCalendar
                value={selectedDate}
                onChange={newValue => {
                    if (newValue) setSelectedDate(newValue);
                }}
                disableFuture
                reduceAnimations
                showDaysOutsideCurrentMonth
                slots={{
                    day: CustomDay,
                }}
            />
        </Box>
    );
};

export default WeightRecord_Calendar;
