import React from "react";
import HistoryMeal_Header from "@/app/components/historyMeal/HistoryMeal_Header";
import HistoryMeal_List from "@/app/components/historyMeal/HistoryMeal_List";
const Page = () => {
    return (
        <div>
            <HistoryMeal_Header />
            <HistoryMeal_List />
        </div>
    );
};

export default Page;
