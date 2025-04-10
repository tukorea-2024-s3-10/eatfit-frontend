// store/useNutritionPlanStore.ts
import { create } from "zustand";

interface NutritionPlanState {
    targetCalorie: number;
    setTargetCalorie: (value: number) => void;

    targetWeight: number;
    setTargetWeight: (value: number) => void;

    // 🔥 영양소 상태 추가
    carbs: number;
    protein: number;
    fat: number;

    setMacros: (macros: {
        carbs: number;
        protein: number;
        fat: number;
    }) => void;
}

export const useNutritionPlanStore = create<NutritionPlanState>(set => ({
    targetCalorie: 0,
    setTargetCalorie: value => set({ targetCalorie: value }),

    targetWeight: 0,
    setTargetWeight: value => set({ targetWeight: value }),

    carbs: 0,
    protein: 0,
    fat: 0,

    setMacros: ({ carbs, protein, fat }) => set({ carbs, protein, fat }),
}));
