// store/useMealNameSearchStore.ts
import { create } from "zustand";

export interface FoodInfo {
    name: string;
    weight: string;
    calorie: number;
    carbs: number;
    protein: number;
    fat: number;
}

interface MealNameSearchState {
    keyword: string;
    recentKeywords: string[];
    searchResults: FoodInfo[];
    selectedFoods: FoodInfo[];

    setKeyword: (value: string) => void;
    addRecentKeyword: (value: string) => void;
    deleteRecentKeyword: (value: string) => void;
    setSearchResults: (foods: FoodInfo[]) => void;

    addSelectedFood: (food: FoodInfo) => void;
    removeSelectedFood: (foodName: string) => void;

    // ✅ 초기화 함수
    resetSearch: () => void;
}

export const useMealNameSearchStore = create<MealNameSearchState>(
    (set, get) => ({
        keyword: "",
        recentKeywords: [],
        searchResults: [],
        selectedFoods: [],

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

        addSelectedFood: food => {
            const alreadyExists = get().selectedFoods.some(
                f => f.name === food.name
            );
            if (!alreadyExists) {
                set(state => ({
                    selectedFoods: [...state.selectedFoods, food],
                }));
            }
        },

        removeSelectedFood: foodName =>
            set(state => ({
                selectedFoods: state.selectedFoods.filter(
                    f => f.name !== foodName
                ),
            })),

        // ✅ 검색 관련 전체 초기화
        resetSearch: () =>
            set({
                keyword: "",
                searchResults: [],
                selectedFoods: [],
            }),
    })
);
