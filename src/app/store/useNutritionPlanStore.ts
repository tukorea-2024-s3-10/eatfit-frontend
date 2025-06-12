import { create } from "zustand";
import { useProfileSetupStore } from "./useProfileSetupStore";

// NutritionPlan 상태 타입 정의
interface NutritionPlanState {
    // 🔸 목표 칼로리 (추천 또는 수정된 값)
    targetCalorie: number;
    setTargetCalorie: (value: number) => void;

    // 🔸 목표 체중 (수정 가능)
    targetWeight: number;
    setTargetWeight: (value: number) => void;

    // 🔸 영양소 비율 (탄단지)
    carbs: number;
    protein: number;
    fat: number;

    setMacros: (macros: {
        carbs: number;
        protein: number;
        fat: number;
    }) => void;

    // 🔸 체중 기반 추천 칼로리 다시 계산
    recalculateCalorie: () => void;

    // 🔸 체중 수정 + 자동 재계산
    updateTargetWeight: (value: number) => void;

    // 🔸 API 응답값으로 목표 섭취량 초기화
    setGoalsFromAPI: (data: {
        calorieGoal: number;
        carbohydrateGoal: number;
        proteinGoal: number;
        fatGoal: number;
    }) => void;
}

// Zustand 스토어 생성
export const useNutritionPlanStore = create<NutritionPlanState>((set, get) => ({
    // 초기 상태
    targetCalorie: 0,
    setTargetCalorie: value => set({ targetCalorie: value }),

    targetWeight: 0,
    setTargetWeight: value => set({ targetWeight: value }),

    carbs: 0,
    protein: 0,
    fat: 0,

    // 탄단지 값 저장
    setMacros: ({ carbs, protein, fat }) => set({ carbs, protein, fat }),

    // 👉 현재 체중 + 목표 체중 기반으로 추천 칼로리 계산
    recalculateCalorie: () => {
        const { targetWeight } = get();
        const currentWeightStr = useProfileSetupStore.getState().weight;
        const currentWeight = parseFloat(currentWeightStr);

        if (isNaN(currentWeight) || isNaN(targetWeight)) {
            console.warn("❌ 몸무게 데이터가 유효하지 않음");
            return;
        }

        // 기본 칼로리: 현재 체중 * 30
        let baseCalorie = currentWeight * 30;

        // 목표 체중에 따라 증/감량 반영
        if (targetWeight > currentWeight) {
            baseCalorie *= 1.1; // 증량
        } else if (targetWeight < currentWeight) {
            baseCalorie *= 0.9; // 감량
        }

        const finalCalorie = Math.round(baseCalorie);
        set({ targetCalorie: finalCalorie });

        const carbs = Math.round((finalCalorie * 0.5) / 4);
        const protein = Math.round((finalCalorie * 0.3) / 4);
        const fat = Math.round((finalCalorie * 0.2) / 9);

        set({ carbs, protein, fat });
    },

    // 👉 목표 체중 업데이트 + 추천 칼로리 재계산 트리거
    updateTargetWeight: (value: number) => {
        set({ targetWeight: value });
        get().recalculateCalorie();
    },

    // 👉 API에서 받아온 목표 섭취량(칼로리 및 비율) 설정
    setGoalsFromAPI: data => {
        const calorie = data.calorieGoal;

        const carbs = Math.round((calorie * data.carbohydrateGoal) / 4);
        const protein = Math.round((calorie * data.proteinGoal) / 4);
        const fat = Math.round((calorie * data.fatGoal) / 9);

        set({
            targetCalorie: calorie,
            carbs,
            protein,
            fat,
        });
    },
}));
