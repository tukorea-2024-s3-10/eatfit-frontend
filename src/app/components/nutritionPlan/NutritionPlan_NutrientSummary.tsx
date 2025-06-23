"use client";

import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";
import axiosInstance from "@/app/lib/axiosInstance";

const NutritionPlan_NutrientSummary = () => {
  /* ───────────────── 상태 구독 ───────────────── */
  const { carbs, protein, fat, setMacros } = useNutritionPlanStore((state) => ({
    carbs: state.carbs,
    protein: state.protein,
    fat: state.fat,
    setMacros: state.setMacros,
  }));

  /* ───────────────── API 호출 (탄·단·지) ───────────────── */
  useEffect(() => {
    const fetchMacros = async () => {
      try {
        const res = await axiosInstance.get("/api/core/users/intake-goal");
        const data = res.data?.data;

        /*  API 예시
            {
              calorieGoal: 2200,
              carbohydrateGoal: 275,
              proteinGoal: 165,
              fatGoal: 49,
              ...
            }
        */

        if (data) {
          setMacros({
            carbs: data.carbohydrateGoal,
            protein: data.proteinGoal,
            fat: data.fatGoal,
          });
        }
      } catch (e) {
        console.error("❌ 탄·단·지 불러오기 실패:", e);
      }
    };

    fetchMacros();
  }, [setMacros]);

  /* ───────────────── UI ───────────────── */
  return (
    <section className="w-full px-4 pt-4 flex justify-center">
      <Box
        sx={{
          width: 312,
          border: "1px solid #C8C4E9",
          borderRadius: "16px",
          backgroundColor: "#fff",
          py: 3,
          px: 2,
          textAlign: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 3, color: "#2F3033" }}>
          하루 영양소는 이렇게 추천해요!
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
          {[
            { label: "탄수화물", value: carbs },
            { label: "단백질", value: protein },
            { label: "지방", value: fat },
          ].map(({ label, value }) => (
            <Box key={label} sx={{ textAlign: "center", flex: 1 }}>
              {/* 수치 */}
              <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#7C69EF" }}>
                {value}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#7C69EF",
                  ml: 0.5,
                }}
              >
                g
              </Typography>

              {/* 라벨 */}
              <Typography sx={{ fontSize: 12, color: "#2F3033", mt: 0.5 }}>
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </section>
  );
};

export default NutritionPlan_NutrientSummary;
// 수정