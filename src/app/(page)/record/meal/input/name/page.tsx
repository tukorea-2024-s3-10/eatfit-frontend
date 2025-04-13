"use client";

import { useEffect } from "react";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";
import { useMealNameSearchStore } from "@/app/store/useMealNameSearchStore";
import MealInputName_Header from "@/app/components/mealInputName/MealInputName_Header";
import MealInputName_SearchBar from "@/app/components/mealInputName/MealInputName_SearchBar";
import MealInputName_RecentKeywords from "@/app/components/mealInputName/MealInputName_RecentKeywords";
import MealInputName_Results from "@/app/components/mealInputName/MealInputName_Results";
import MealInputName_SelectedList from "@/app/components/mealInputName/MealInputName_SelectedList";
import MealInputName_ConfirmButton from "@/app/components/mealInputName/MealInputName_ConfirmButton";

const Page = () => {
    const resetSearch = useMealNameSearchStore(state => state.resetSearch);
    const resetMeal = useMealRecordStore(state => state.resetMealData);

    useEffect(() => {
        resetSearch();
        resetMeal();
    }, [resetSearch, resetMeal]);

    return (
        <div>
            <MealInputName_Header />
            <MealInputName_SearchBar />
            <MealInputName_RecentKeywords />
            <MealInputName_Results />
            <MealInputName_SelectedList />
            <MealInputName_ConfirmButton />
        </div>
    );
};

export default Page;
