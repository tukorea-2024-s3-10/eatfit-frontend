// components/record/meal/input/photo/MealInputPhoto_ConfirmButton.tsx
"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const MealInputPhoto_ConfirmButton = () => {
    const router = useRouter();

    const handleClick = () => {
        // ✅ 홈으로 이동
        router.push("/record/meal/loading");
    };

    return (
        <Box
            sx={{
                px: 2,
                pt: 4,
                pb: 4,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                    width: 312,
                    height: 60,
                    backgroundColor: "#12C08D",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 16,
                    borderRadius: "12px",
                    "&:hover": {
                        backgroundColor: "#10B07F",
                    },
                }}
            >
                확인했어요!
            </Button>
        </Box>
    );
};

export default MealInputPhoto_ConfirmButton;
