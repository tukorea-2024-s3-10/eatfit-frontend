"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface Props {
    keyword: string; // 예: "단백질"
    description: string; // 예: 단백질이 풍부한...
    imageSrc: string; // 예: "/images/health_salmon.png"
}

const Report_AnalysisCard = ({ keyword, description, imageSrc }: Props) => {
    return (
        <Box
            sx={{
                border: "1.5px solid #15B493",
                borderRadius: "16px",
                px: 2,
                py: 3,
                backgroundColor: "#fff",
                width: "312px",
                mx: "auto",
                textAlign: "center",
                my: 4,
            }}
        >
            {/* 🔸 타이틀 */}
            <Typography fontSize={14} color="#2F3033" fontWeight={500} mb={1}>
                이번주 영양소 분석 결과,
            </Typography>

            {/* 🔸 분석 메시지 */}
            <Typography fontSize={18} fontWeight={700} color="#2F3033" mb={1}>
                <span style={{ color: "#7C73C0" }}>{keyword}이 부족</span>
                하네요!
            </Typography>

            {/* 🔸 설명 */}
            <Typography fontSize={18} fontWeight={400} color="#2F3033" mb={2}>
                {description}
            </Typography>

            {/* 🔸 이미지 */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Image
                    src={imageSrc}
                    alt={`${keyword} 이미지`}
                    width={114}
                    height={114}
                    style={{ objectFit: "contain" }}
                />
            </Box>
        </Box>
    );
};

export default Report_AnalysisCard;
