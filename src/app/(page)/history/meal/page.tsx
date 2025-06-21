"use client";

import { useEffect } from "react";
import { useMealHistoryStore } from "@/app/store/useMealHistoryStore";
import HistoryMeal_Header from "@/app/components/historyMeal/HistoryMeal_Header";
import HistoryMeal_DateNavigator from "@/app/components/historyMeal/HistoryMeal_DateNavigator";
import HistoryMeal_List from "@/app/components/historyMeal/HistoryMeal_List";
import HistoryMeal_FoodList from "@/app/components/historyMeal/HistoryMeal_FoodList";
import HistoryMeal_ConfirmButton from "@/app/components/historyMeal/HistoryMeal_ConfirmButton";
import axiosInstance from "@/app/lib/axiosInstance";

// 타입 정의
type MealTime = "아침" | "점심" | "저녁" | "간식";

interface FoodInfo {
    name: string;
    weight: string;
    calorie: number;
    carbs: number;
    protein: number;
    fat: number;
}

interface Meal {
    time: MealTime;
    foods: FoodInfo[];
}

interface DietRecord {
    date: string;
    meals: Meal[];
}

// 백엔드에서 오는 원시 데이터 타입
interface RawDietRecord {
    date: string;
    mealType: string; // ex: "BREAKFAST"
    foodName: string;
    mass: number;
    calorie: number;
    carbs: number;
    protein: number;
    fat: number;
}

const Page = () => {
    const setHistoryList = useMealHistoryStore(state => state.setHistoryList);

    useEffect(() => {
        const fetchAllHistory = async () => {
            try {
                const res = await axiosInstance.get<{ data: RawDietRecord[] }>(
                    "/api/core/dietrecord"
                );
                const records = res.data.data;

                // 날짜별 그룹핑
                const grouped: Record<string, RawDietRecord[]> = {};
                records.forEach(r => {
                    if (!grouped[r.date]) grouped[r.date] = [];
                    grouped[r.date].push(r);
                });

                const timeLabel = (raw: string): MealTime => {
                    const map: Record<string, MealTime> = {
                        BREAKFAST: "아침",
                        LUNCH: "점심",
                        DINNER: "저녁",
                        SNACK: "간식",
                        아침: "아침",
                        점심: "점심",
                        저녁: "저녁",
                        간식: "간식",
                    };
                    return map[raw] ?? "간식";
                };

                const transformed: DietRecord[] = Object.entries(grouped).map(
                    ([date, list]) => {
                        const meals: Meal[] = [];

                        list.forEach(item => {
                            const time = timeLabel(item.mealType);
                            let meal = meals.find(m => m.time === time);
                            if (!meal) {
                                meal = { time, foods: [] };
                                meals.push(meal);
                            }

                            meal.foods.push({
                                name: item.foodName,
                                weight: `${item.mass}g`,
                                calorie: item.calorie,
                                carbs: item.carbs,
                                protein: item.protein,
                                fat: item.fat,
                            });
                        });

                        return { date, meals };
                    }
                );

                setHistoryList(transformed);
            } catch (err: unknown) {
                console.error("식단 기록 조회 실패", err);
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
