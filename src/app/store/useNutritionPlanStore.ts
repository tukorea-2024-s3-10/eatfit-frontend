// src/app/store/useNutritionPlanStore.ts
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

  setMacros: (macros: { carbs: number; protein: number; fat: number }) => void;

  recalculateCalorie: () => void;
  updateTargetWeight: (value: number) => void;

  setGoalsFromAPI: (data: {
    calorieGoal: number;
    carbohydrateGoal: number;
    proteinGoal: number;
    fatGoal: number;
  }) => void;
}

export const useNutritionPlanStore = create<NutritionPlanState>((set, get) => ({
  targetCalorie: 0,
  setTargetCalorie: (value) => set({ targetCalorie: value }),

  targetWeight: 0,
  setTargetWeight: (value) => set({ targetWeight: value }),

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

  updateTargetWeight: (value) => {
    set({ targetWeight: value });
    get().recalculateCalorie();
  },

  setGoalsFromAPI: (data) => {
    const calorie = data.calorieGoal;

    // 주의: API 데이터 단위 확인 필요
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
