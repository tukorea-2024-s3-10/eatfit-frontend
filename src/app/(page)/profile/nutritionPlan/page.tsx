"use client";

import React, { useState } from "react";
import ProfileSetupHeader from "@/app/components/profileSetup/Profile_Setup_Header";
import NutritionPlan_RecommendedCalorie from "@/app/components/nutritionPlan/NutritionPlan_RecommendedCalorie";
import NutritionPlan_CalorieEditor from "@/app/components/nutritionPlan/NutritionPlan_CalorieEditor";
import NutritionPlan_TargetWeightEditor from "@/app/components/nutritionPlan/NutritionPlan_TargetWeightEditor";
import NutritionPlan_NutrientSummary from "@/app/components/nutritionPlan/NutritionPlan_NutrientSummary";
import NutritionPlan_PersonalizedInfo from "@/app/components/nutritionPlan/NutritionPlan_PersonalizedInfo";
import NutritionPlan_GoToManageButton from "@/app/components/nutritionPlan/NutritionPlan_GoToManageButton";

const Page = () => {
  const [refreshCount, setRefreshCount] = useState(0);

  const handleNutrientRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };

  return (
    <div>
      <ProfileSetupHeader />
      <NutritionPlan_RecommendedCalorie />
      <NutritionPlan_CalorieEditor />

      <div className="my-10">
        {/* ✅ 목표 체중 수정 후 onSubmit 실행 시 영양소 요약 새로고침 */}
        <NutritionPlan_TargetWeightEditor onSubmit={handleNutrientRefresh} />
      </div>

      <NutritionPlan_NutrientSummary refreshTrigger={refreshCount} />
      <NutritionPlan_PersonalizedInfo />
      <NutritionPlan_GoToManageButton />
    </div>
  );
};

export default Page;
