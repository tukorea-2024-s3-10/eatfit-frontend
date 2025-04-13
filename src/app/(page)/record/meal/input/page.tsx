import React from "react";
import MealRecord_Header from "@/app/components/mealRecord/MealRecord_Header";
import MealMethod_Description from "@/app/components/mealRecord/MealMethod_Description";
import MealMethod_OptionList from "@/app/components/mealRecord/MealMethod_OptionList";

const page = () => {
    return (
        <div>
            <MealRecord_Header />
            <MealMethod_Description />
            <MealMethod_OptionList />
        </div>
    );
};

export default page;
