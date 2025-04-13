import { create } from "zustand";

// 👉 식사 시간 타입 정의
export type MealTime = "아침" | "점심" | "저녁" | "간식";

// 👉 식단 입력 방식 타입
export type RecordMethod = "photo" | "name" | "manual";

// 👉 식사 시간별 칼로리 상태
interface MealData {
    label: MealTime;
    kcal: number;
}

// 👉 사진 분석으로 받아오는 음식 정보 타입
export interface FoodInfo {
    name: string;
    weight: string;
    calorie: number;
    carbs: number;
    protein: number;
    fat: number;
}

// 👉 수동 입력용 음식 정보 상태 타입
export interface ManualInput {
    name: string;
    calorie: number;
    carbs: number;
    protein: number;
    fat: number;
}

// 👉 전체 Zustand 상태 타입
interface MealRecordState {
    // 🍽️ 각 시간대에 대한 kcal 정보 저장
    mealData: MealData[];

    // ⏱️ 현재 선택된 시간대 (예: 아침, 점심 등)
    selectedTime: MealTime | null;

    // ✍️ 현재 선택된 입력 방식 (사진 / 이름 / 수동)
    selectedMethod: RecordMethod | null;

    // 🖼️ 사진으로 등록한 base64 이미지
    uploadedPhoto: string | null;

    // 📸 사진에서 분석된 음식 리스트
    photoFoodList: FoodInfo[];

    // 🧾 수동 입력한 음식 정보
    manualInput: ManualInput;

    // ✅ setter 함수들
    selectTime: (label: MealTime) => void;
    selectMethod: (method: RecordMethod) => void;
    updateKcal: (label: MealTime, kcal: number) => void;

    setUploadedPhoto: (base64: string) => void;
    setPhotoFoodList: (foods: FoodInfo[]) => void;
    setManualInput: (input: ManualInput) => void;

    // 🔄 전체 초기화 (페이지 진입 시 사용)
    resetMealData: () => void;
}

// ✅ Zustand 스토어 정의
export const useMealRecordStore = create<MealRecordState>((set, get) => ({
    // 기본 kcal 상태
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

    manualInput: {
        name: "",
        calorie: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
    },

    // 🟡 시간대 선택
    selectTime: label => set({ selectedTime: label }),

    // 🟢 입력 방식 선택
    selectMethod: method => set({ selectedMethod: method }),

    // 🔴 시간대별 kcal 업데이트
    updateKcal: (label, kcal) =>
        set(state => ({
            mealData: state.mealData.map(item =>
                item.label === label ? { ...item, kcal } : item
            ),
        })),

    // 🖼️ base64 이미지 저장
    setUploadedPhoto: base64 => set({ uploadedPhoto: base64 }),

    // 📋 사진에서 분석된 음식 리스트 저장
    setPhotoFoodList: foods => set({ photoFoodList: foods }),

    // ✍️ 수동 입력 데이터 저장
    setManualInput: input => set({ manualInput: input }),

    // 🧹 전체 초기화 (selectedTime은 유지!)
    resetMealData: () => {
        const currentSelectedTime = get().selectedTime; // ✅ 현재 선택 유지
        set({
            mealData: [
                { label: "아침", kcal: 0 },
                { label: "점심", kcal: 0 },
                { label: "저녁", kcal: 0 },
                { label: "간식", kcal: 0 },
            ],
            selectedTime: currentSelectedTime, // ✅ 유지함
            selectedMethod: null,
            uploadedPhoto: null,
            photoFoodList: [],
            manualInput: {
                name: "",
                calorie: 0,
                carbs: 0,
                protein: 0,
                fat: 0,
            },
        });
    },
}));
