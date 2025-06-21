/* components/record/meal/input/photo/MealInputPhoto_ItemCard.tsx */
"use client";

import { Box, Typography } from "@mui/material";

interface Props {
    name: string;
    weight: string;
    calorie: number;
    carbs: number;
    protein: number;
    fat: number;
    imageUrl?: string;
}

const MealInputPhoto_ItemCard = ({
    name,
    weight,
    calorie,
    carbs,
    protein,
    fat,
    imageUrl,
}: Props) => {
    return (
        <Box
            sx={{
                border: "1px solid #15B493",
                borderRadius: "12px",
                padding: 2,
                mb: 2,
                width: "312px",
                mx: "auto",
            }}
        >
            {/* 이미지(선택) */}
            {imageUrl && (
                <Box
                    component="img"
                    src={imageUrl}
                    alt={name}
                    sx={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        borderRadius: "8px",
                        mb: 1.5,
                    }}
                />
            )}

            {/* 이름 & 중량 */}
            <Typography fontWeight={600} fontSize={16} mb={0.5}>
                {name}{" "}
                <Typography component="span" fontWeight={400}>
                    ({weight})
                </Typography>
            </Typography>

            {/* 영양 정보 (0이면 생략) */}
            {calorie + carbs + protein + fat > 0 ? (
                <>
                    <Typography fontSize={14}>열량 : {calorie} kcal</Typography>
                    <Typography fontSize={14}>탄수화물 : {carbs} g</Typography>
                    <Typography fontSize={14}>단백질 : {protein} g</Typography>
                    <Typography fontSize={14}>지방 : {fat} g</Typography>
                </>
            ) : (
                <Typography fontSize={14} color="#909094">
                    영양 정보 없음
                </Typography>
            )}
        </Box>
    );
};

export default MealInputPhoto_ItemCard;
