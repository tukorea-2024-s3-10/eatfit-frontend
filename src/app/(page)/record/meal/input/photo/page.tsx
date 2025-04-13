"use client";

import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";
import MealInputPhoto_Header from "@/app/components/mealInputPhoto/MealInputPhoto_Header";
import MealInputPhoto_Description from "@/app/components/mealInputPhoto/MealInputPhoto_Description";
import MealInputPhoto_List from "@/app/components/mealInputPhoto/MealInputPhoto_List";
import MealInputPhoto_ConfirmButton from "@/app/components/mealInputPhoto/MealInputPhoto_ConfirmButton";
const Page = () => {
    const setPhotoFoodList = useMealRecordStore(
        state => state.setPhotoFoodList
    );

    useEffect(() => {
        const fetchMockData = async () => {
            try {
                const res = await axios.get("/api/mock/photo-foods");
                setPhotoFoodList(res.data.foods); // 상태 저장
                console.log("✅ 음식정보 저장: ", res.data);
            } catch (error) {
                console.log("📛 음식 데이터 불러오기 실패:", error);
            }
        };
        fetchMockData();
    }, []);
    return (
        <div>
            <MealInputPhoto_Header />
            <MealInputPhoto_Description />
            <MealInputPhoto_List />
            <MealInputPhoto_ConfirmButton />
        </div>
    );
};

export default Page;
