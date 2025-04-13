// components/mealInputManual/MealInputManual_NameField.tsx
"use client";

import { Box, TextField, Typography, InputAdornment } from "@mui/material";
import { Utensils } from "lucide-react"; // 🍴 음식 아이콘
import { useMealRecordStore } from "@/app/store/useMealRecordStore"; // ✅ Zustand 상태 연결

const MealInputManual_NameField = () => {
    // ✅ Zustand 상태 가져오기
    const name = useMealRecordStore(state => state.manualInput.name);
    const manualInput = useMealRecordStore(state => state.manualInput);
    const setManualInput = useMealRecordStore(state => state.setManualInput);

    // ✅ 입력 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;

        // 🔄 Zustand 상태 업데이트 (기존 값 보존)
        setManualInput({
            ...manualInput,
            name: newName,
        });
    };

    return (
        <Box sx={{ px: 2, pt: 4 }}>
            {/* 📝 섹션 제목 */}
            <Typography fontSize={14} fontWeight={600} mb={1}>
                음식 이름 입력하기
            </Typography>

            {/* ✏️ 이름 입력 필드 */}
            <TextField
                fullWidth
                placeholder="음식 이름을 작성해주세요!"
                value={name}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Utensils
                                size={18}
                                strokeWidth={1.8}
                                color="#7C73C0"
                            />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "& fieldset": {
                            borderColor: name.trim() ? "#12C08D" : "#E0E0E0", // ✅ 입력값 있으면 초록 테두리
                        },
                        "&:hover fieldset": {
                            borderColor: name.trim() ? "#12C08D" : "#BDBDBD",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#12C08D", // ✅ 포커스 시도 초록색
                        },
                    },
                }}
            />
        </Box>
    );
};

export default MealInputManual_NameField;
