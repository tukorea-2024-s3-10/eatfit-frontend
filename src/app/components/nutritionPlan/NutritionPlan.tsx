"use client";

import { useState } from "react";
import NutritionPlan_TargetWeightEditor from "./NutritionPlan_TargetWeightEditor";
import NutritionPlan_NutrientSummary from "./NutritionPlan_NutrientSummary";

const NutritionPlan = () => {
  const [refreshCount, setRefreshCount] = useState(0);

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1); // Trigger 증가
  };

  return (
    <div className="w-full">
      {/* 목표 체중 설정 버튼 + 모달 */}
      <NutritionPlan_TargetWeightEditor onSubmit={handleRefresh} />

      {/* 영양소 요약: 목표 체중 변경 시 새로고침됨 */}
      <NutritionPlan_NutrientSummary refreshTrigger={refreshCount} />
    </div>
  );
};

export default NutritionPlan;
