"use client";

import React from "react";
import { useEffect } from "react";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";
import MealInputPhoto_Header from "@/app/components/mealInputPhoto/MealInputPhoto_Header";
import MealInputPhoto_Description from "@/app/components/mealInputPhoto/MealInputPhoto_Description";
import MealInputPhoto_List from "@/app/components/mealInputPhoto/MealInputPhoto_List";
import MealInputPhoto_ConfirmButton from "@/app/components/mealInputPhoto/MealInputPhoto_ConfirmButton";

interface FoodRecognitionResult {
    name: string;
    mass?: number;
    calorie?: number;
    carbohydrate?: number;
    protein?: number;
    fat?: number;
}

const Page = () => {
    const { setPhotoFoodList, uploadedPhoto } = useMealRecordStore();

    useEffect(() => {
        const processPhotoFoods = async () => {
            if (!uploadedPhoto) return;

            try {
                // 이미지 데이터를 Blob으로 변환
                const response = await fetch(uploadedPhoto);
                const blob = await response.blob();

                // FormData 생성 및 이미지 추가
                const formData = new FormData();
                formData.append("file", blob, "food.jpg");

                // Python 서버로 이미지 전송
                const res = await fetch("http://3.39.238.237:8000/predict", {
                    method: "POST",
                    body: formData,
                });

                if (!res.ok) {
                    throw new Error("음식 인식에 실패했습니다.");
                }

                const data = (await res.json()) as FoodRecognitionResult[];

                // 응답 데이터를 FoodInfo 형식으로 변환
                const foodList = data.map(item => ({
                    name: item.name,
                    weight: `${item.mass || 100}g`,
                    calorie: item.calorie || 0,
                    carbs: item.carbohydrate || 0,
                    protein: item.protein || 0,
                    fat: item.fat || 0,
                    imageUrl: uploadedPhoto,
                }));

                setPhotoFoodList(foodList);
                console.log("✅ 음식 인식 결과:", foodList);
            } catch (error) {
                console.error("❌ 음식 인식 실패:", error);
                alert("음식 인식에 실패했습니다. 다시 시도해주세요.");
            }
        };

        processPhotoFoods();
    }, [uploadedPhoto, setPhotoFoodList]);

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
