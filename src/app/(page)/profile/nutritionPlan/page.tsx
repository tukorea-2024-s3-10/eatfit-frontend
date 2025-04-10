import React from "react";
import ProfileSetupHeader from "@/app/components/profileSetup/Profile_Setup_Header";
import NutritionPlan_RecommendedCalorie from "@/app/components/nutritionPlan/NutritionPlan_RecommendedCalorie";
import NutritionPlan_CalorieEditor from "@/app/components/nutritionPlan/NutritionPlan_CalorieEditor";
import NutritionPlan_TargetWeightEditor from "@/app/components/nutritionPlan/NutritionPlan_WeightEditor";
import NutritionPlan_NutrientSummary from "@/app/components/nutritionPlan/NutritionPlan_NutrientSummary";
import NutritionPlan_PersonalizedInfo from "@/app/components/nutritionPlan/NutritionPlan_PersonalizedInfo";
import NutritionPlan_GoToManageButton from "@/app/components/nutritionPlan/NutritionPlan_GoToManageButton";
const page = () => {
    return (
        <div>
            <ProfileSetupHeader />
            <NutritionPlan_RecommendedCalorie />
            <NutritionPlan_CalorieEditor />
            <div className="my-10">
                <NutritionPlan_TargetWeightEditor />
            </div>
            <NutritionPlan_NutrientSummary />
            <NutritionPlan_PersonalizedInfo />
            <NutritionPlan_GoToManageButton />
        </div>
    );
};

export default page;
