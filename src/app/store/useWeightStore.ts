import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs"; // 날짜 라이브러리

// 상태 구조 정의 (store에 어떤 데이터 쓸 건지 정리)
interface WeightStore {
    selectedDate: Dayjs; // 현재 선택된 날짜
    weightByDate: Record<string, number>; // 날짜별 체중 기록 (ex. "2025-04-12": 51.3)
    isEditing: boolean; // 지금 입력 중인지 아닌지 여부 ✏️
    centerDate: Dayjs; // 주간 차트 기준 날짜
    // 상태 바꾸는 함수들 ↓↓↓
    setSelectedDate: (date: Dayjs) => void; // 선택된 날짜 바꾸기
    setWeight: (date: Dayjs, weight: number) => void; // 날짜에 맞춰 체중 저장하기 🏋️‍♀️
    setIsEditing: (value: boolean) => void; // 입력 중인지 상태 바꾸기 ✨
    setCenterDate: (date: Dayjs) => void; // 주차 이동용 setter
}

// Zustand 훅 생성 (여기서 전역 상태 만들어줌)
export const useWeightStore = create<WeightStore>(set => ({
    // 초기값 설정
    selectedDate: dayjs(), // 오늘 날짜로 시작
    weightByDate: {}, // 체중 기록은 비어있음
    isEditing: false, // 처음엔 입력 상태 아님
    centerDate: dayjs(), // 오늘 기준 주차로 시작

    // 날짜 바꾸는 함수
    setSelectedDate: date => set({ selectedDate: date }),

    // 체중 저장 함수 (기존 기록을 유지하면서 해당 날짜에 새로 덮어씀)
    setWeight: (date, weight) =>
        set(state => ({
            weightByDate: {
                ...state.weightByDate,
                [date.format("YYYY-MM-DD")]: weight,
            },
        })),

    // 입력 상태 변경 함수 (true → 입력폼, false → 요약 카드)
    setIsEditing: value => set({ isEditing: value }),

    setCenterDate: date => set({ centerDate: date }),
}));
