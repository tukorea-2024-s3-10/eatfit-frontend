/* app/(page)/record/meal/input/photo/page.tsx */
"use client";

import { useEffect } from "react";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";
import axiosInstance from "@/app/lib/axiosInstance"; // ✅ 추가

import MealInputPhoto_Header from "@/app/components/mealInputPhoto/MealInputPhoto_Header";
import MealInputPhoto_Description from "@/app/components/mealInputPhoto/MealInputPhoto_Description";
import MealInputPhoto_List from "@/app/components/mealInputPhoto/MealInputPhoto_List";
import MealInputPhoto_ConfirmButton from "@/app/components/mealInputPhoto/MealInputPhoto_ConfirmButton";

export default function Page() {
    const { uploadedPhoto, setPhotoFoodList } = useMealRecordStore();

    useEffect(() => {
        (async () => {
            if (!uploadedPhoto) return;

            try {
                /* ---------- 1. 이미지 → Blob ---------- */
                const blob = await (await fetch(uploadedPhoto)).blob();
                const formData = new FormData();
                formData.append("file", blob, "food.jpg");

                /* ---------- 2. 모델 서버로 분류 요청 ---------- */
                const res = await fetch("https://api.eatfit.site/api/ai/predict", {
                    method: "POST",
                    body: formData,
                });
                if (!res.ok) throw new Error("분류 서버 오류");

                const json = await res.json();
                console.log("🧪 원본 응답:", json);

                const foodName: string | undefined =
                    json?.result?.prediction?.class || // 새 포맷
                    json?.result?.[0]?.name || // 구 포맷
                    undefined;

                if (!foodName) throw new Error("음식 이름 추출 실패");
                console.log("🍜 인식된 음식 이름:", foodName);

                /* ---------- 3. 영양 정보 API (axiosInstance 사용) ---------- */
                let nutri = { calorie: 0, carbs: 0, protein: 0, fat: 0 };

                try {
                    const { data } = await axiosInstance.get("/api/core/food", {
                        params: { name: foodName }, // ▶ 쿼리 파라미터 자동 인코딩
                    });

                    /**  응답 예시
                     *  {
                     *    "status": "success",
                     *    "data": [
                     *      { "calorie": 155, "carbohydrate": 23, "protein": 5, "fat": 3, ... }
                     *    ]
                     *  }
                     */
                    const best = Array.isArray(data?.data)
                        ? data.data[0]
                        : null;

                    if (best) {
                        nutri = {
                            calorie: best.calorie ?? 0,
                            carbs: best.carbohydrate ?? 0,
                            protein: best.protein ?? 0,
                            fat: best.fat ?? 0,
                        };
                    } else {
                        console.warn("⚠️ 검색 결과가 비어 있습니다.");
                    }
                } catch (err) {
                    console.warn("⚠️ 영양 정보 조회 실패:", err);
                    // 실패해도 기본값(0)으로 진행
                }

                /* ---------- 4. 스토어에 저장 ---------- */
                setPhotoFoodList([
                    {
                        name: foodName,
                        weight: "100g", // mass 정보가 없으므로 기본값
                        ...nutri,
                    },
                ]);
            } catch (err) {
                console.error("❌ 음식 인식 실패:", err);
                alert("음식 인식에 실패했습니다. 다시 시도해 주세요.");
            }
        })();
    }, [uploadedPhoto, setPhotoFoodList]);

    /* ---------- 렌더 ---------- */
    return (
        <>
            <MealInputPhoto_Header />
            <MealInputPhoto_Description />
            <MealInputPhoto_List />
            <MealInputPhoto_ConfirmButton />
        </>
    );
}
