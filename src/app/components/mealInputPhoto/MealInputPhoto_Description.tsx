// components/record/meal/MealInputPhoto_Description.tsx
import { Typography, Box } from "@mui/material";

const MealInputPhoto_Description = () => {
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
                {"아래 음식이 맞는지\n확인해주세요"}
            </Typography>
        </Box>
    );
};

export default MealInputPhoto_Description;
