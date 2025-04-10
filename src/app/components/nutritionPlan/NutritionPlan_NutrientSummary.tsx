"use client";

import { Box, Typography } from "@mui/material";
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";

const NutritionPlan_NutrientSummary = () => {
    const carbs = useNutritionPlanStore(state => state.carbs);
    const protein = useNutritionPlanStore(state => state.protein);
    const fat = useNutritionPlanStore(state => state.fat);
    return (
        <section className="w-full px-4 pt-4 flex justify-center">
            <Box
                sx={{
                    width: "312px",
                    border: "1px solid #C8C4E9",
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    py: 3,
                    px: 2,
                    textAlign: "center",
                    mb: 2,
                }}
            >
                {/* 상단 제목 */}
                <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#2F3033",
                        mb: 3,
                    }}
                >
                    하루 영양소는 이렇게 추천해요!
                </Typography>

                {/* 영양소 리스트 */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        px: 2,
                    }}
                >
                    {[
                        { label: "탄수화물", value: carbs },
                        { label: "단백질", value: protein },
                        { label: "지방", value: fat },
                    ].map(nutrient => (
                        <Box
                            key={nutrient.label}
                            sx={{ textAlign: "center", flex: 1 }}
                        >
                            {/* 수치 */}
                            <Typography
                                sx={{
                                    fontSize: "20px",
                                    fontWeight: 700,
                                    color: "#7C69EF",
                                    display: "inline",
                                }}
                            >
                                {nutrient.value}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "#7C69EF",
                                    display: "inline",
                                    ml: "2px",
                                }}
                            >
                                g
                            </Typography>

                            {/* 라벨 */}
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    fontWeight: 400,
                                    color: "#2F3033",
                                    mt: 0.5,
                                }}
                            >
                                {nutrient.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </section>
    );
};

export default NutritionPlan_NutrientSummary;
