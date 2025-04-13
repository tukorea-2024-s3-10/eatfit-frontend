"use client";

import { Box } from "@mui/material";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";
import MealRecord_MealTimeCard from "./MealRecord_MealTimeCard";

const MealRecord_MealTimeGrid = () => {
    // ✅ Zustand에서 상태 가져오기
    const mealData = useMealRecordStore(state => state.mealData);
    const selectedTime = useMealRecordStore(state => state.selectedTime);
    const selectTime = useMealRecordStore(state => state.selectTime);

    // ✅ 디버깅용 로그 출력
    console.log("📌 현재 선택된 시간대:", selectedTime);

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
                px: 2,
                pt: 2,
            }}
        >
            {mealData.map(item => (
                <MealRecord_MealTimeCard
                    key={item.label}
                    label={item.label}
                    kcal={item.kcal}
                    selected={selectedTime === item.label}
                    onClick={() => {
                        console.log("🖱️ 선택한 시간대:", item.label);
                        selectTime(item.label); // ✅ 선택한 시간 저장
                    }}
                />
            ))}
        </Box>
    );
};

export default MealRecord_MealTimeGrid;
