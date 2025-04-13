// components/mealInputManual/MealInputManual_Header.tsx
"use client";

import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const MealInputManual_Header = () => {
    const router = useRouter();

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: "#fff",
                color: "#2F3033",
                borderBottom: "1px solid #E0E0E0",
            }}
        >
            <Toolbar
                sx={{
                    minHeight: "56px",
                    px: 2,
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                {/* 🔙 뒤로가기 */}
                <IconButton onClick={() => router.back()} edge="start">
                    <ArrowLeft size={20} />
                </IconButton>

                {/* 💬 페이지 타이틀 */}
                <Typography
                    variant="h6"
                    fontSize={16}
                    fontWeight={600}
                    textAlign="center"
                >
                    수동으로 입력
                </Typography>

                {/* 오른쪽 공간 확보용 (아이콘 없음) */}
                <Box sx={{ width: 40 }} />
            </Toolbar>
        </AppBar>
    );
};

export default MealInputManual_Header;
