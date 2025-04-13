// components/mealInputManual/MealInputManual_Nutrients.tsx
"use client";

import { Box, Typography } from "@mui/material";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";

const MealInputManual_Nutrients = () => {
    // ✅ Zustand에서 상태 가져오기
    const manualInput = useMealRecordStore(state => state.manualInput);
    const setManualInput = useMealRecordStore(state => state.setManualInput);

    // ✅ 입력값 변경 시 상태 업데이트
    const handleChange = (field: keyof typeof manualInput, value: string) => {
        const parsed = parseFloat(value.trim()); // 공백 제거 후 숫자로 파싱
        setManualInput({
            ...manualInput,
            [field]: isNaN(parsed) ? 0 : parsed, // 숫자 아니면 0으로 처리
        });
    };

    // ✅ 각각의 카드 렌더링 함수 (칼로리, 탄수화물 등)
    const renderCard = (
        label: string,
        field: keyof typeof manualInput,
        unit: string
    ) => (
        <Box
            key={field}
            sx={{
                width: "154px",
                height: "100px",
                border: "1.5px solid #12C08D",
                borderRadius: "12px",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            {/* ✅ 항목 이름 (ex. 칼로리) */}
            <Typography fontSize={14} color="#2F3033">
                {label}
            </Typography>

            {/* ✅ 숫자 입력 필드와 단위 */}
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap={0.5}
            >
                <input
                    type="number"
                    value={manualInput[field] ?? ""} // ✅ 0도 유지되도록 nullish check
                    onChange={e => handleChange(field, e.target.value)}
                    style={{
                        border: "none",
                        outline: "none",
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#12C08D",
                        background: "transparent",
                        textAlign: "right",
                        width: "60px",
                    }}
                />
                <Typography fontSize={14} color="#2F3033">
                    {unit}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ px: 2, pt: 4 }}>
            {/* 📝 타이틀 */}
            <Typography fontSize={14} fontWeight={600} mb={1}>
                음식 영양소 입력하기
            </Typography>

            {/* ✅ 카드 리스트 (2행 2열 정렬) */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                }}
            >
                {renderCard("칼로리", "calorie", "Kcal")}
                {renderCard("탄수화물", "carbs", "g")}
                {renderCard("단백질", "protein", "g")}
                {renderCard("지방", "fat", "g")}
            </Box>
        </Box>
    );
};

export default MealInputManual_Nutrients;
