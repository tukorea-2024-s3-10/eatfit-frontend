"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface Props {
    name: string;
    image: string;
    calorie: number;
}

const Dinner_RecommendCard = ({ name, image, calorie }: Props) => {
    return (
        <Box
            sx={{
                width: "149px",
                height: "137px",
                border: "1.5px solid #12C08D",
                borderRadius: "12px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column", // 🔁 col로 세로 쪼개기
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 1,
                boxSizing: "border-box",
            }}
        >
            {/* 🖼 이미지 */}
            <Image
                src={image}
                alt={name}
                width={129}
                height={0}
                style={{ objectFit: "cover", borderRadius: 8 }}
            />

            {/* 🍽 이름 + 칼로리 (row 정렬) */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    mt: 1,
                }}
            >
                <Typography
                    fontSize={13}
                    fontWeight={600}
                    color="#2F3033"
                    noWrap
                >
                    {name}
                </Typography>
                <Typography fontSize={11} color="#909094">
                    {calorie} kcal
                </Typography>
            </Box>
        </Box>
    );
};

export default Dinner_RecommendCard;
