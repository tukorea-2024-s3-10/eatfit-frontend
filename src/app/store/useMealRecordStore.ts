/* app/store/useMealRecordStore.ts */
import { create } from "zustand";

/* ---------- 타입 ---------- */
export type MealTime = "아침" | "점심" | "저녁" | "간식";
export type RecordMethod = "photo" | "name" | "manual";

export interface FoodInfo {
    name: string;
    weight: string;
    calorie: number;
    carbs: number;
    protein: number;
    fat: number;
    imageUrl?: string; // ▶ object URL or placeholder
}

export interface ManualInput {
    name: string;
    calorie: number;
    carbs: number;
    protein: number;
    fat: number;
}

/* ---------- Zustand State ---------- */
interface MealRecordState {
    mealData: { label: MealTime; kcal: number }[];
    selectedTime: MealTime | null;
    selectedMethod: RecordMethod | null;

    uploadedPhoto: string | null; // ▶ object URL
    photoFoodList: FoodInfo[];

    manualInput: ManualInput;
    selectedFood: FoodInfo | null;

    /* actions */
    selectTime: (label: MealTime) => void;
    selectMethod: (method: RecordMethod) => void;
    updateKcal: (label: MealTime, kcal: number) => void;

    setUploadedPhoto: (url: string) => void;
    setPhotoFoodList: (foods: FoodInfo[]) => void;

    setManualInput: (input: ManualInput) => void;
    setSelectedFood: (food: FoodInfo | null) => void;

    resetMealData: () => void;
}

/* ---------- store 구현 ---------- */
export const useMealRecordStore = create<MealRecordState>((set, get) => ({
    /* 기본값 */
    mealData: [
        { label: "아침", kcal: 0 },
        { label: "점심", kcal: 0 },
        { label: "저녁", kcal: 0 },
        { label: "간식", kcal: 0 },
    ],
    selectedTime: null,
    selectedMethod: null,

    uploadedPhoto: null,
    photoFoodList: [],

    manualInput: { name: "", calorie: 0, carbs: 0, protein: 0, fat: 0 },
    selectedFood: null,

    /* ---------- actions ---------- */
    selectTime: label => set({ selectedTime: label }),
    selectMethod: method => set({ selectedMethod: method }),

    updateKcal: (label, kcal) =>
        set(state => ({
            mealData: state.mealData.map(item =>
                item.label === label ? { ...item, kcal } : item
            ),
        })),

    /* 사진 object URL 저장 */
    setUploadedPhoto: url => set({ uploadedPhoto: url }),

    /* 예측 결과 리스트 저장 + 이미지 경로 병합 */
    setPhotoFoodList: foods => {
        const photo = get().uploadedPhoto;
        set({
            photoFoodList: foods.map(f => ({
                ...f,
                imageUrl: photo ?? "/food-placeholder.png",
            })),
        });
    },

    setManualInput: input => set({ manualInput: input }),
    setSelectedFood: food => set({ selectedFood: food }),

    /* 기록 초기화 (선택한 식사 시간은 유지) */
    resetMealData: () => {
        const currentSelectedTime = get().selectedTime;
        set({
            mealData: [
                { label: "아침", kcal: 0 },
                { label: "점심", kcal: 0 },
                { label: "저녁", kcal: 0 },
                { label: "간식", kcal: 0 },
            ],
            selectedTime: currentSelectedTime,
            selectedMethod: null,
            uploadedPhoto: null,
            photoFoodList: [],
            manualInput: { name: "", calorie: 0, carbs: 0, protein: 0, fat: 0 },
            selectedFood: null,
        });
    },
}));
