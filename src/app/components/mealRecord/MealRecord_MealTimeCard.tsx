// components/record/meal/MealTimeCard.tsx
import { Box, Typography } from "@mui/material";
import { CheckCircle } from "lucide-react";

interface MealTimeCardProps {
    label: string;
    kcal: number;
    selected: boolean;
    onClick: () => void;
}

const MealRecord_MealTimeCard = ({
    label,
    kcal,
    selected,
    onClick,
}: MealTimeCardProps) => {
    const showCheck = kcal > 0;

    return (
        <Box
            onClick={onClick}
            sx={{
                width: 154,
                height: 100,
                border: "1.5px solid",
                borderColor: "#7C73C0",
                borderRadius: "12px",
                backgroundColor: selected ? "#E2DEFD" : "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                px: 2,
                py: 1.5,
                cursor: "pointer",
                position: "relative",
            }}
        >
            {/* ✅ 체크 아이콘 */}
            {showCheck && (
                <CheckCircle
                    size={18}
                    strokeWidth={2}
                    color="#32C671" // 초록색
                    style={{ position: "absolute", top: 8, right: 8 }}
                />
            )}

            {/* 식사 시간 라벨 */}
            <Typography
                sx={{ fontSize: 14, fontWeight: 400, color: "#2F3033" }}
            >
                {label}
            </Typography>

            {/* 칼로리 (오른쪽 하단 정렬) */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <Typography
                    sx={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#2F3033",
                    }}
                >
                    {kcal} Kcal
                </Typography>
            </Box>
        </Box>
    );
};

export default MealRecord_MealTimeCard;
