"use client";

import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";

const NutritionPlan_RecommendedCalorie = () => {
    const targetCalorie = useNutritionPlanStore(state => state.targetCalorie);
    const recalculateCalorie = useNutritionPlanStore(
        state => state.recalculateCalorie
    );

    // 🚀 컴포넌트가 마운트될 때 칼로리 계산
    useEffect(() => {
        recalculateCalorie();
    }, [recalculateCalorie]);

    return (
        <section className="w-full px-4 pt-6 pb-4 flex justify-center">
            <div
                className="rounded-[12px] border flex flex-col justify-center items-center"
                style={{
                    width: "312px",
                    height: "154px",
                    borderColor: "#C8C4E9",
                    paddingTop: "24px",
                    paddingBottom: "12px",
                    backgroundColor: "#fff",
                }}
            >
                {/* 상단 문구 */}
                <Typography
                    sx={{
                        fontSize: "15px",
                        color: "#2F3033",
                        fontWeight: 500,
                        marginBottom: "8px",
                    }}
                >
                    추천하는 하루 칼로리에요
                </Typography>

                {/* 칼로리 수치 + 단위 */}
                <div className="flex items-end gap-1">
                    <Typography
                        sx={{
                            fontSize: "32px",
                            fontWeight: 700,
                            color: "#15B493",
                        }}
                    >
                        {Number(targetCalorie).toLocaleString()}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#2F3033",
                            marginBottom: "4px",
                        }}
                    >
                        Kcal
                    </Typography>
                </div>
            </div>
        </section>
    );
};

export default NutritionPlan_RecommendedCalorie;
