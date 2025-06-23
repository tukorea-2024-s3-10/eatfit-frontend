// store/useMealNameSearchStore.ts
import { create } from "zustand";

// ✅ API 구조와 일치하도록 수정
export interface FoodInfo {
  name: string;
  mass: number;
  calorie: number;
  carbohydrate: number;
  sugar: number;
  protein: number;
  fat: number;
  saturatedFat: number;
  transFat: number;
  sodiumGoal: number;
  cholesterol: number;
}

interface MealNameSearchState {
  keyword: string;
  recentKeywords: string[];
  searchResults: FoodInfo[];
  selectedFoods: FoodInfo[];
  showRecentKeywords: boolean;

  setKeyword: (value: string) => void;
  addRecentKeyword: (value: string) => void;
  deleteRecentKeyword: (value: string) => void;
  setSearchResults: (foods: FoodInfo[]) => void;
  setSelectedFood: (food: FoodInfo) => void;
  setShowRecentKeywords: (show: boolean) => void;

  addSelectedFood: (food: FoodInfo) => void;
  removeSelectedFood: (foodName: string) => void;

  resetSearch: () => void;
}

export const useMealNameSearchStore = create<MealNameSearchState>((set, get) => ({
  keyword: "",
  recentKeywords: [],
  searchResults: [],
  selectedFoods: [],
  showRecentKeywords: true,

  setKeyword: value => set({ keyword: value }),

  addRecentKeyword: value =>
    set(state => {
      const filtered = state.recentKeywords.filter(k => k !== value);
      return {
        recentKeywords: [value, ...filtered].slice(0, 5),
      };
    }),

  deleteRecentKeyword: value =>
    set(state => ({
      recentKeywords: state.recentKeywords.filter(k => k !== value),
    })),

  setSearchResults: foods => set({ searchResults: foods }),

  setSelectedFood: food => {
    const alreadyExists = get().selectedFoods.some(f => f.name === food.name);
    if (!alreadyExists) {
      set(state => ({
        selectedFoods: [...state.selectedFoods, food],
      }));
    }
  },

  addSelectedFood: food => {
    const alreadyExists = get().selectedFoods.some(f => f.name === food.name);
    if (!alreadyExists) {
      set(state => ({
        selectedFoods: [...state.selectedFoods, food],
      }));
    }
  },

  removeSelectedFood: foodName =>
    set(state => ({
      selectedFoods: state.selectedFoods.filter(f => f.name !== foodName),
    })),

  resetSearch: () =>
    set({
      keyword: "",
      searchResults: [],
      selectedFoods: [],
    }),

  setShowRecentKeywords: show => set({ showRecentKeywords: show }),
}));
