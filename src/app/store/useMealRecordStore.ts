import { create } from "zustand";

// 👉 식사 시간 타입 정의
export type MealTime = "아침" | "점심" | "저녁" | "간식";
export type RecordMethod = "photo" | "name" | "manual";

// 👉 사진 분석 음식 정보
export interface FoodInfo {
    name: string;
    weight: string;
    calorie: number;
    carbs: number;
    protein: number;
    fat: number;
    imageUrl?: string; // ✅ base64 이미지 URL 추가
}

export interface ManualInput {
    name: string;
    calorie: number;
    carbs: number;
    protein: number;
    fat: number;
}

interface MealRecordState {
    mealData: { label: MealTime; kcal: number }[];
    selectedTime: MealTime | null;
    selectedMethod: RecordMethod | null;
    uploadedPhoto: string | null;
    photoFoodList: FoodInfo[];
    manualInput: ManualInput;

    selectTime: (label: MealTime) => void;
    selectMethod: (method: RecordMethod) => void;
    updateKcal: (label: MealTime, kcal: number) => void;

    setUploadedPhoto: (base64: string) => void;
    setPhotoFoodList: (foods: FoodInfo[]) => void;
    setManualInput: (input: ManualInput) => void;

    resetMealData: () => void;
}

export const useMealRecordStore = create<MealRecordState>((set, get) => ({
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

    selectTime: label => set({ selectedTime: label }),
    selectMethod: method => set({ selectedMethod: method }),
    updateKcal: (label, kcal) =>
        set(state => ({
            mealData: state.mealData.map(item =>
                item.label === label ? { ...item, kcal } : item
            ),
        })),
    setUploadedPhoto: base64 => set({ uploadedPhoto: base64 }),

    setPhotoFoodList: foods => {
        const photo = get().uploadedPhoto;
        const foodsWithImg = foods.map(food => ({
            ...food,
            imageUrl: photo || "/food-placeholder.png",
        }));
        set({ photoFoodList: foodsWithImg });
    },

    setManualInput: input => set({ manualInput: input }),

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
        });
    },
}));
