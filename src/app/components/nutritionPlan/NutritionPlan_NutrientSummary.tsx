"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axiosInstance from "@/app/lib/axiosInstance";

interface IntakeGoalData {
  calorieGoal: number;
  sodiumGoal: number;
  carbohydrateGoal: number;
  sugarGoal: number;
  fatGoal: number;
  transFatGoal: number;
  saturatedFatGoal: number;
  cholesterolGoal: number;
  proteinGoal: number;
}

interface Props {
  refreshTrigger: number; // ✅ 외부에서 상태 변화로 재호출 트리거
}

const NutritionPlan_NutrientSummary = ({ refreshTrigger }: Props) => {
  const [carbs, setCarbs] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ API 호출 - refreshTrigger가 바뀔 때마다 재요청
  useEffect(() => {
    const fetchIntakeGoal = async () => {
      try {
        const res = await axiosInstance.get("/api/core/users/intake-goal");
        const data: IntakeGoalData | undefined = res.data?.data;

        if (data) {
          setCarbs(data.carbohydrateGoal ?? 0);
          setProtein(data.proteinGoal ?? 0);
          setFat(data.fatGoal ?? 0);
        }
      } catch (error) {
        console.error("❌ 목표 섭취량 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true); // 로딩 초기화
    fetchIntakeGoal();
  }, [refreshTrigger]);

  if (loading) {
    return <Typography sx={{ textAlign: "center", mt: 4 }}>로딩 중...</Typography>;
  }

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
        <Typography
          sx={{ fontSize: "14px", fontWeight: 600, mb: 3, color: "#2F3033" }}
        >
          하루 영양소는 이렇게 추천해요!
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
          {[
            { label: "탄수화물", value: carbs },
            { label: "단백질", value: protein },
            { label: "지방", value: fat },
          ].map(({ label, value }) => (
            <Box key={label} sx={{ textAlign: "center", flex: 1 }}>
              {/* 숫자와 단위 g 나란히 */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "baseline",
                  gap: "4px",
                }}
              >
                <Typography
                  sx={{ fontSize: "20px", fontWeight: 700, color: "#7C69EF" }}
                >
                  {value}
                </Typography>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: 500, color: "#7C69EF" }}
                >
                  g
                </Typography>
              </Box>

              {/* 영양소 이름 */}
              <Typography
                sx={{ fontSize: "12px", color: "#2F3033", mt: 0.5 }}
              >
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
