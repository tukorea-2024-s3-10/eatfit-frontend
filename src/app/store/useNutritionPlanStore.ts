import { create } from "zustand";
import { useProfileSetupStore } from "./useProfileSetupStore";

interface NutritionPlanState {
    targetCalorie: number;
    setTargetCalorie: (value: number) => void;

    targetWeight: number;
    setTargetWeight: (value: number) => void;

    carbs: number;
    protein: number;
    fat: number;

    setMacros: (macros: {
        carbs: number;
        protein: number;
        fat: number;
    }) => void;

    recalculateCalorie: () => void;
    updateTargetWeight: (value: number) => void; // ✅ 추가
}

export const useNutritionPlanStore = create<NutritionPlanState>((set, get) => ({
    targetCalorie: 0,
    setTargetCalorie: value => set({ targetCalorie: value }),

    targetWeight: 0,
    setTargetWeight: value => set({ targetWeight: value }),

    carbs: 0,
    protein: 0,
    fat: 0,

    setMacros: ({ carbs, protein, fat }) => set({ carbs, protein, fat }),

    recalculateCalorie: () => {
        const { targetWeight } = get();
        const currentWeightStr = useProfileSetupStore.getState().weight;
        const currentWeight = parseFloat(currentWeightStr);

        if (isNaN(currentWeight) || isNaN(targetWeight)) {
            console.warn("❌ 몸무게 데이터가 유효하지 않음");
            return;
        }

        let baseCalorie = currentWeight * 30;

        if (targetWeight > currentWeight) {
            baseCalorie *= 1.1;
        } else if (targetWeight < currentWeight) {
            baseCalorie *= 0.9;
        }

        const finalCalorie = Math.round(baseCalorie);
        set({ targetCalorie: finalCalorie });

        const carbs = Math.round((finalCalorie * 0.5) / 4);
        const protein = Math.round((finalCalorie * 0.3) / 4);
        const fat = Math.round((finalCalorie * 0.2) / 9);

        set({ carbs, protein, fat });
    },

    updateTargetWeight: (value: number) => {
        set({ targetWeight: value });
        get().recalculateCalorie(); // ✅ set 이후 바로 최신 값 기반 재계산
    },
}));
