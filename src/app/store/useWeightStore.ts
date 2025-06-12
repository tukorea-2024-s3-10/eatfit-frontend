import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs";

// 날짜별 체중 기록 타입 정의
export interface WeightRecord {
    id: number; // 체중 기록 ID
    weight: number; // 체중 값 (kg)
}

// Zustand 상태 정의
interface WeightStore {
    selectedDate: Dayjs; // 현재 선택된 날짜
    weightByDate: Record<string, WeightRecord>; // "2025-06-07" → { id, weight }
    isEditing: boolean; // 입력 중인지 여부
    centerDate: Dayjs; // 기준 주차 날짜

    // 상태 변경 함수들
    setSelectedDate: (date: Dayjs) => void;
    setWeight: (date: Dayjs, weight: number, id?: number) => void;
    setWeightByDate: (newData: Record<string, WeightRecord>) => void;
    setIsEditing: (value: boolean) => void;
    setCenterDate: (date: Dayjs) => void;
}

// Zustand store 생성
export const useWeightStore = create<WeightStore>(set => ({
    selectedDate: dayjs(),
    weightByDate: {},
    isEditing: false,
    centerDate: dayjs(),

    // 날짜 선택
    setSelectedDate: date => set({ selectedDate: date }),

    // 체중 저장 (기존 기록 유지하며 덮어쓰기)
    setWeight: (date, weight, id) =>
        set(state => ({
            weightByDate: {
                ...state.weightByDate,
                [date.format("YYYY-MM-DD")]: {
                    id: id ?? Date.now(), // id 없으면 임시 ID 부여
                    weight,
                },
            },
        })),

    // 날짜별 체중 데이터 통째로 설정 (API 연동용)
    setWeightByDate: newData => set({ weightByDate: newData }),

    // 입력 상태 설정
    setIsEditing: value => set({ isEditing: value }),

    // 중심 주차 날짜 설정
    setCenterDate: date => set({ centerDate: date }),
}));
