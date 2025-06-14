"use client";

import { useEffect } from "react";
import { useMealHistoryStore } from "@/app/store/useMealHistoryStore";
import HistoryMeal_Header from "@/app/components/historyMeal/HistoryMeal_Header";
import HistoryMeal_DateNavigator from "@/app/components/historyMeal/HistoryMeal_DateNavigator";
import HistoryMeal_List from "@/app/components/historyMeal/HistoryMeal_List";
import HistoryMeal_FoodList from "@/app/components/historyMeal/HistoryMeal_FoodList";
import HistoryMeal_ConfirmButton from "@/app/components/historyMeal/HistoryMeal_ConfirmButton";
import axiosInstance from "@/app/lib/axiosInstance"; // ✅ axios 인스턴스 사용한다고 했으니 이걸로

const Page = () => {
    const setHistoryList = useMealHistoryStore(state => state.setHistoryList);

    useEffect(() => {
        const fetchAllHistory = async () => {
            try {
                const res = await axiosInstance.get("/api/core/dietrecord");
                const data = res.data;

                if (data?.data) {
                    // ✅ 실제 데이터를 상태에 저장
                    setHistoryList(data.data);
                }
            } catch (error) {
                console.error("식단 기록 조회 실패", error);
            }
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
