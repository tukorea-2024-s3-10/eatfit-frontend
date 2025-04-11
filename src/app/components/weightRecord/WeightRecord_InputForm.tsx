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

    const handleSave = () => {
        const numeric = parseFloat(weight);
        if (isNaN(numeric)) return;
        setWeight(selectedDate, numeric);

        // ✅ 입력한 날짜 기준으로 주간 차트도 이동시키자!
        setCenterDate(selectedDate);

        setOpenSnackbar(true);
        setTimeout(() => setIsEditing(false), 500);
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
