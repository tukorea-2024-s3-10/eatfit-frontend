"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const HistoryMeal_ConfirmButton = () => {
    const router = useRouter();

    const handleConfirm = () => {
        router.push("/report"); // ✅ 오타 주의!
    };

    return (
        <Box
            sx={{
                px: 2,

                pb: 6,
                display: "flex",
                justifyContent: "center",
                minHeight: "100px",
            }}
        >
            <Button
                onClick={handleConfirm}
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
                건강 리포트 보기
            </Button>
        </Box>
    );
};

export default HistoryMeal_ConfirmButton;
