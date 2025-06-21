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
    /* ---------- Zustand 상태 ---------- */
    const selectedDate = useWeightStore(s => s.selectedDate);
    const weightByDate = useWeightStore(s => s.weightByDate); // { [date]: { id, weight } }
    const setWeight = useWeightStore(s => s.setWeight);
    const setIsEditing = useWeightStore(s => s.setIsEditing);
    const setCenterDate = useWeightStore(s => s.setCenterDate);

    /* ---------- 현재 날짜/기본 값 ---------- */
    const dateKey = selectedDate.format("YYYY-MM-DD");

    // 👉 weight 객체에서 숫자만 뽑아옴
    const defaultEntry = useMemo(
        () => weightByDate[dateKey],
        [weightByDate, dateKey]
    );
    const defaultWeight = defaultEntry?.weight; // 숫자 | undefined
    const defaultId = defaultEntry?.id; // 숫자 | undefined

    /* ---------- 로컬 상태 ---------- */
    const [weight, setInput] = useState(defaultWeight?.toString() ?? "");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    /* 날짜 바뀔 때 입력창 값 초기화 */
    useEffect(() => {
        setInput(defaultWeight?.toString() ?? "");
    }, [defaultWeight, selectedDate]);

    /* ---------- 저장/수정 ---------- */
    const handleSave = async () => {
        const numeric = parseFloat(weight);
        if (isNaN(numeric)) return; // 숫자 입력이 아닐 때 무시

        try {
            if (defaultEntry) {
                /* PATCH (수정) */
                await axiosInstance.patch("/api/core/users/weight", {
                    id: defaultId,
                    weight: numeric,
                });
                setWeight(selectedDate, numeric, defaultId); // Zustand 갱신
            } else {
                /* POST (신규) */
                const res = await axiosInstance.post("/api/core/users/weight", {
                    weight: numeric,
                    date: dateKey,
                });
                const newId = res.data.data?.id ?? Date.now();
                setWeight(selectedDate, numeric, newId); // Zustand 갱신
            }

            setCenterDate(selectedDate);
            setOpenSnackbar(true);
            setTimeout(() => setIsEditing(false), 500);
        } catch (err) {
            console.error("체중 기록 저장 실패:", err);
        }
    };

    /* ---------- 렌더 ---------- */
    return (
        <Box px={3} py={2}>
            <Typography fontWeight={600} mb={1.5}>
                {selectedDate.format("YYYY년 M월 D일")} 체중을 기록해주세요
            </Typography>

            {/* 입력창 */}
            <OutlinedInput
                fullWidth
                value={weight}
                onChange={e => {
                    const val = e.target.value.trim();
                    if (/^\d*\.?\d*$/.test(val)) setInput(val); // 숫자·소수점만 허용
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

            {/* 저장 / 수정 버튼 */}
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
                    {defaultEntry ? "수정하기" : "기록하기"}
                </Button>
            )}

            {/* 저장 완료 알림 */}
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
