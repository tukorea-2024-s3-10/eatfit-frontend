import React from "react";
import MealRecord_Header from "@/app/components/mealRecord/MealRecord_Header";
import MealRecord_Description from "@/app/components/mealRecord/MealRecord_Description";
import MealRecord_MealTimeGrid from "@/app/components/mealRecord/MealRecord_MealTimeGrid";
import MealRecord_SelectButton from "@/app/components/mealRecord/MealRecord_SelectButton";
import TabBar from "@/app/components/common/TabBar";
const Page = () => {
    return (
        <div>
            <MealRecord_Header />
            <MealRecord_Description />
            <MealRecord_MealTimeGrid />
            <MealRecord_SelectButton />
            <TabBar />
        </div>
    );
};

export default Page;
