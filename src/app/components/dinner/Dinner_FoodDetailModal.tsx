"use client";

import { Box, Typography, Modal, IconButton } from "@mui/material";
import Image from "next/image";
import { X } from "lucide-react"; // ✅ Lucide 아이콘

interface Props {
    open: boolean;
    onClose: () => void;
    food: {
        name: string;
        image: string;
        calorie: number;
        carbs: number;
        protein: number;
        fat: number;
    };
}

const Dinner_FoodDetailModal = ({ open, onClose, food }: Props) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 312,
                    bgcolor: "#fff",
                    borderRadius: "16px",
                    p: 3,
                    outline: "none",
                    textAlign: "center",
                }}
            >
                {/* ❌ 닫기 버튼 (Lucide X) */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 10,
                    }}
                    aria-label="close"
                >
                    <X size={20} color="#2F3033" />
                </IconButton>

                {/* 이미지 */}
                <Image
                    src={food.image}
                    alt={food.name}
                    width={250}
                    height={160}
                    style={{ borderRadius: "12px", objectFit: "cover" }}
                />

                {/* 음식 이름 */}
                <Typography fontWeight={700} fontSize={16} mt={2} mb={2}>
                    {food.name}
                </Typography>

                {/* 영양 정보 */}
                <Box sx={{ textAlign: "left", px: 3 }}>
                    <Typography fontSize={14} mb={1}>
                        칼로리: <strong>{food.calorie}</strong> Kcal
                    </Typography>
                    <Typography fontSize={14} mb={1}>
                        탄수화물: <strong>{food.carbs}</strong> g
                    </Typography>
                    <Typography fontSize={14} mb={1}>
                        단백질: <strong>{food.protein}</strong> g
                    </Typography>
                    <Typography fontSize={14}>
                        지방: <strong>{food.fat}</strong> g
                    </Typography>
                </Box>
            </Box>
        </Modal>
    );
};

export default Dinner_FoodDetailModal;
