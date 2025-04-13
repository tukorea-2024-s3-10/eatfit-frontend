// /app/(page)/record/meal/input/manual/page.tsx
"use client";

import { useEffect } from "react";
import MealInputManual_Header from "@/app/components/mealInputManual/MealInputManual_Header";
import MealInputManual_NameField from "@/app/components/mealInputManual/MealInputManual_NameField";
import MealInputManual_Nutrients from "@/app/components/mealInputManual/MealInputManual_Nutrients";
import MealInputManual_ConfirmButton from "@/app/components/mealInputManual/MealInputManual_ConfirmButton";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";

const Page = () => {
    const resetMeal = useMealRecordStore(state => state.resetMealData);

    useEffect(() => {
        resetMeal(); // ✅ 진입 시 초기화
    }, [resetMeal]);

    return (
        <div>
            <MealInputManual_Header />
            <MealInputManual_NameField />
            <MealInputManual_Nutrients />
            {/* 사진 업로드는 나중에 → 추후: MealInputManual_PhotoUploader */}
            <MealInputManual_ConfirmButton />
        </div>
    );
};

export default Page;
