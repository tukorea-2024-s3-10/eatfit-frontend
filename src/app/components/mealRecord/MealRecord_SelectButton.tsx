// components/record/meal/MealRecord_SelectButton.tsx
"use client";

import { Box, Button } from "@mui/material";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";
import { useRouter } from "next/navigation";

const MealRecord_SelectButton = () => {
    const router = useRouter();
    const selectedTime = useMealRecordStore(state => state.selectedTime);

    const isEnabled = !!selectedTime;

    // 버튼 문구 조건 분기
    const buttonText = selectedTime === "간식" ? "추가하기" : "입력하기";

    const handleClick = () => {
        console.log("✅ 선택된 시간대:", selectedTime);
        router.push("/record/meal/input");
    };

    return (
        <Box
            sx={{
                px: 2,
                pt: 4,
                pb: 2,
                display: "flex",
                justifyContent: "center",
                mt: 2,
            }}
        >
            <Button
                variant="contained"
                onClick={handleClick}
                disabled={!isEnabled}
                sx={{
                    width: 312,
                    height: 60,
                    backgroundColor: isEnabled ? "#12C08D" : "#C3C6CF",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 16,
                    borderRadius: "12px",
                    "&:hover": {
                        backgroundColor: isEnabled ? "#10B07F" : "#C3C6CF",
                    },
                }}
            >
                {buttonText}
            </Button>
        </Box>
    );
};

export default MealRecord_SelectButton;
