// app/(page)/history/meal/page.tsx
"use client";

import { useEffect } from "react";
import { useMealHistoryStore } from "@/app/store/useMealHistoryStore";
import HistoryMeal_Header from "@/app/components/historyMeal/HistoryMeal_Header";
import HistoryMeal_DateNavigator from "@/app/components/historyMeal/HistoryMeal_DateNavigator";
import HistoryMeal_List from "@/app/components/historyMeal/HistoryMeal_List";
import HistoryMeal_FoodList from "@/app/components/historyMeal/HistoryMeal_FoodList";
import HistoryMeal_ConfirmButton from "@/app/components/historyMeal/HistoryMeal_ConfirmButton";
const Page = () => {
    const setHistoryList = useMealHistoryStore(state => state.setHistoryList);

    // ✅ 전체 mock 데이터 1번만 가져오기
    useEffect(() => {
        const fetchAllHistory = async () => {
            const res = await fetch("/api/mock/history-meal");
            const data = await res.json();
            setHistoryList(data.history); // ✅ 전체 리스트 저장
        };

        fetchAllHistory();
    }, [setHistoryList]);

    return (
        <div>
            <HistoryMeal_Header />
            <div className="mt-4">
                <HistoryMeal_DateNavigator />
            </div>
            <HistoryMeal_List />
            <div className="mt-16">
                <HistoryMeal_FoodList />
            </div>
            <HistoryMeal_ConfirmButton />
        </div>
    );
};

export default Page;
