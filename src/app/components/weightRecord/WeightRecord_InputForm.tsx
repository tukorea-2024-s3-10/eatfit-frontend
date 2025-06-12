// WeightRecord_InputForm.tsx
"use client";

import {
    Box,
    Button,
    InputAdornment,
    OutlinedInput,
    Snackbar,
    Typography,
} from "@mui/material";
import { IoScale } from "react-icons/io5";
import { useWeightStore } from "@/app/store/useWeightStore";
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "@/app/lib/axiosInstance";

const WeightRecord_InputForm = () => {
    const selectedDate = useWeightStore(state => state.selectedDate);
    const weightByDate = useWeightStore(state => state.weightByDate);
    const setWeight = useWeightStore(state => state.setWeight);
    const setIsEditing = useWeightStore(state => state.setIsEditing);
    const setCenterDate = useWeightStore(state => state.setCenterDate);

    const dateKey = selectedDate.format("YYYY-MM-DD");
    const defaultValue = useMemo(
        () => weightByDate[dateKey],
        [dateKey, weightByDate]
    );

    const [weight, setInput] = useState(defaultValue?.toString() || "");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        setInput(defaultValue?.toString() || "");
    }, [defaultValue, selectedDate]);

    const handleSave = async () => {
        const numeric = parseFloat(weight);
        if (isNaN(numeric)) return;

        try {
            if (defaultValue) {
                // 🔁 수정 (PATCH)
                await axiosInstance.patch("/api/core/users/weight", {
                    id: defaultValue.id,
                    weight: numeric,
                });

                // ✅ 상태 업데이트
                setWeight(selectedDate, numeric, defaultValue.id);
            } else {
                // 🆕 새로 기록 (POST)
                const res = await axiosInstance.post("/api/core/users/weight", {
                    weight: numeric,
                    date: selectedDate.format("YYYY-MM-DD"),
                });

                const newId = res.data.data?.id ?? Date.now(); // 안전하게 id 가져오기
                setWeight(selectedDate, numeric, newId);
            }

            setCenterDate(selectedDate);
            setOpenSnackbar(true);
            setTimeout(() => setIsEditing(false), 500);
        } catch (error) {
            console.error("체중 기록 저장 실패:", error);
        }
    };

    return (
        <Box px={3} py={2}>
            <Typography fontWeight={600} mb={1.5}>
                {selectedDate.format("YYYY년 M월 D일")} 체중을 기록해주세요
            </Typography>
            <OutlinedInput
                fullWidth
                value={weight}
                onChange={e => {
                    const val = e.target.value.trim();
                    if (/^\d*\.?\d*$/.test(val)) setInput(val);
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <IoScale size={20} color="#15B493" />
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">kg</InputAdornment>
                }
                sx={{
                    borderRadius: "12px",
                    fontSize: 14,
                    height: 48,
                    backgroundColor: "#fff",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#9BE8D8",
                    },
                }}
            />
            {weight && (
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                        mt: 3,
                        borderRadius: "12px",
                        backgroundColor: "#00C092",
                        fontWeight: 600,
                        fontSize: 16,
                        height: 48,
                        ":hover": { backgroundColor: "#00A982" },
                    }}
                >
                    {defaultValue ? "수정하기" : "기록하기"}
                </Button>
            )}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                message="기록이 저장되었습니다!"
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </Box>
    );
};

export default WeightRecord_InputForm;
