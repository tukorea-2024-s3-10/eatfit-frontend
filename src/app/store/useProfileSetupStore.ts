import { create } from "zustand";

// ✅ 상태 타입 정의: 사용자 입력값과 setter, 유효성 검사 포함
interface ProfileSetupState {
    nickname: string; // 닉네임
    gender: string | null; // 성별 ("남성" / "여성" / null)
    age: string; // 나이
    height: string; // 키
    weight: string; // 몸무게
    targetCalorie: string;
    targetWeight: string; // ✅ 목표 체중
    purpose: string | null; // 사용 목적 ("다이어트", "헬스", 등)
    diseases: string[]; // 선택된 질병 목록
    profileImage: string | null; // 프로필 이미지 (base64 or URL)

    // 🔧 각 항목을 개별 업데이트하는 setter 함수들
    setNickname: (value: string) => void;
    setGender: (value: string) => void;
    setAge: (value: string) => void;
    setHeight: (value: string) => void;
    setWeight: (value: string) => void;
    setTargetCalorie: (value: string) => void; // ✅ 추가
    setTargetWeight: (value: string) => void; // ✅ 추가
    setPurpose: (value: string) => void;
    setDiseases: (value: string[]) => void;
    setProfileImage: (image: string | null) => void;

    // 🔍 모든 필드가 채워졌는지 확인하는 유효성 검사 함수
    isValid: () => boolean;
}

// ✅ Zustand 스토어 생성
export const useProfileSetupStore = create<ProfileSetupState>((set, get) => ({
    // 🟢 초기값 설정
    nickname: "",
    gender: null,
    age: "",
    height: "",
    weight: "",
    targetCalorie: "", // ✅ 초기값 추가
    targetWeight: "", // ✅ 초기값 추가
    purpose: null,
    diseases: [],
    profileImage: null,

    // 🛠️ setter 함수들
    setNickname: value => set({ nickname: value }),
    setGender: value => set({ gender: value }),
    setAge: value => set({ age: value }),
    setHeight: value => set({ height: value }),
    setWeight: value => set({ weight: value }),
    setTargetCalorie: value => set({ targetCalorie: value }),
    setTargetWeight: value => set({ targetWeight: value }), // ✅ setter
    setPurpose: value => set({ purpose: value }),
    setDiseases: value => set({ diseases: value }),
    setProfileImage: image => set({ profileImage: image }),

    // ✅ 유효성 검사
    isValid: () => {
        const state = get();
        return (
            state.nickname.trim() !== "" &&
            state.gender !== null &&
            state.age !== "" &&
            state.height !== "" &&
            state.weight !== "" &&
            state.targetCalorie !== "" && // ✅ 포함
            state.targetWeight !== "" && // ✅ 포함
            state.purpose !== null &&
            state.diseases.length > 0
        );
    },
}));
