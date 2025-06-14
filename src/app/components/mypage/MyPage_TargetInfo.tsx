"use client";

import { Box, Typography, Button } from "@mui/material";
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";

const MyPage_TargetInfo = () => {
    const targetCalorie = useNutritionPlanStore(state => state.targetCalorie);
    const targetWeight = useNutritionPlanStore(state => state.targetWeight);

    return (
        <Box px={3} pt={2}>
            {/* 목표 몸무게 */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1.5}
            >
                <Typography fontSize={14}>목표 몸무게</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontSize={16} fontWeight={700} color="#00A982">
                        {targetWeight.toFixed(1)} kg
                    </Typography>
                    <Button
                        size="small"
                        variant="outlined"
                        sx={{
                            fontSize: 12,
                            minWidth: 40,
                            padding: "2px 8px",
                            borderRadius: "8px",
                            color: "#00A982",
                            borderColor: "#00A982",
                        }}
                    >
                        수정
                    </Button>
                </Box>
            </Box>
            {/* 목표 칼로리 */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1.5}
                borderBottom="1px solid #E0E0E0"
            >
                <Typography fontSize={14}>목표 칼로리</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontSize={16} fontWeight={700} color="#00A982">
                        {targetCalorie.toLocaleString()} Kcal
                    </Typography>
                    <Button
                        size="small"
                        variant="outlined"
                        sx={{
                            fontSize: 12,
                            minWidth: 40,
                            padding: "2px 8px",
                            borderRadius: "8px",
                            color: "#00A982",
                            borderColor: "#00A982",
                        }}
                    >
                        수정
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default MyPage_TargetInfo;
