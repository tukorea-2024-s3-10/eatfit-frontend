import { create } from "zustand";

// ✅ 상태 타입 정의: 사용자 입력값과 setter, 유효성 검사 포함
interface ProfileSetupState {
    nickname: string; // 닉네임
    gender: string | null; // 성별 ("남성" / "여성" / null)
    age: string; // 나이 (문자열로 받음)
    height: string; // 키
    weight: string; // 몸무게
    purpose: string | null; // 사용 목적 ("다이어트", "헬스", 등)
    diseases: string[]; // 선택된 질병 목록

    // 각 항목을 개별 업데이트하는 setter 함수들
    setNickname: (value: string) => void;
    setGender: (value: string) => void;
    setAge: (value: string) => void;
    setHeight: (value: string) => void;
    setWeight: (value: string) => void;
    setPurpose: (value: string) => void;
    setDiseases: (value: string[]) => void;

    // 모든 필드가 채워졌는지 확인하는 유효성 검사 함수
    isValid: () => boolean;
}

// ✅ Zustand 스토어 생성
export const useProfileSetupStore = create<ProfileSetupState>((set, get) => ({
    // 초기값 설정
    nickname: "",
    gender: null,
    age: "",
    height: "",
    weight: "",
    purpose: null,
    diseases: [],

    // 각 필드에 대한 setter 구현
    setNickname: value => set({ nickname: value }),
    setGender: value => set({ gender: value }),
    setAge: value => set({ age: value }),
    setHeight: value => set({ height: value }),
    setWeight: value => set({ weight: value }),
    setPurpose: value => set({ purpose: value }),
    setDiseases: value => set({ diseases: value }),

    // 모든 필드가 입력 완료되었는지 확인 (설정하기 버튼 활성화 조건)
    isValid: () => {
        const state = get();
        return (
            state.nickname.trim() !== "" &&
            state.gender !== null &&
            state.age !== "" &&
            state.height !== "" &&
            state.weight !== "" &&
            state.purpose !== null &&
            state.diseases.length > 0
        );
    },
}));
