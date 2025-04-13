// components/record/meal/MealMethod_Description.tsx
import { Typography, Box } from "@mui/material";

const MealMethod_Description = () => {
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
                {"식단을 기록할 방식을\n선택해주세요"}
            </Typography>
        </Box>
    );
};

export default MealMethod_Description;
