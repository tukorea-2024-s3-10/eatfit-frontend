// components/record/meal/MealRecord_Description.tsx
import { Typography, Box } from "@mui/material";

const MealRecord_Description = () => {
    return (
        <Box
            sx={{
                px: 2,
                py: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 4,
            }}
        >
            <Typography
                sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: "center",
                    whiteSpace: "pre-line", // 줄바꿈 적용
                    color: "#2F3033",
                }}
            >
                {"기록할 식사 시간을\n선택해주세요"}
            </Typography>
        </Box>
    );
};

export default MealRecord_Description;
