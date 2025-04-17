import { create } from "zustand";
import dayjs from "dayjs";

export type MealTime = "아침" | "점심" | "저녁" | "간식";

export interface MealFood {
    name: string;
    weight: string;
    calorie: number;
    carbs: number;
    protein: number;
    fat: number;
}

export interface MealHistoryItem {
    time: MealTime;
    foods: MealFood[];
}

export interface MealHistoryEntry {
    date: string;
    meals: MealHistoryItem[];
}

interface MealHistoryState {
    historyList: MealHistoryEntry[];
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    setHistoryList: (list: MealHistoryEntry[]) => void;
}

export const useMealHistoryStore = create<MealHistoryState>(set => ({
    historyList: [],
    selectedDate: dayjs().format("YYYY-MM-DD"),
    setSelectedDate: date => set({ selectedDate: date }),
    setHistoryList: list => set({ historyList: list }),
}));
