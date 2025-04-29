"use client"; // ✅ Next.js App Router에서 클라이언트 컴포넌트 선언

import { Button } from "@mui/material"; // ✅ MUI 라이브러리에서 버튼 컴포넌트 임포트
import { useRouter } from "next/navigation"; // ✅ Next.js 13+ 전용 라우터 훅
import axios from "axios"; // ✅ HTTP 요청을 위한 Axios 라이브러리
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore"; // ✅ 프로필 입력 상태 관리하는 Zustand 스토어 임포트

// ✅ ProfileSetupSubmit 컴포넌트 props 타입 정의
interface ProfileSetupSubmitProps {
    isValid: boolean; // 모든 입력값이 유효한지 여부
    buttonText?: string; // 버튼에 표시할 텍스트 (optional)
    redirectTo?: string; // 제출 후 이동할 경로 (optional)
    onSubmit?: () => void; // (추가 가능) 외부에서 제출 동작을 제어하고 싶을 때 사용할 콜백 함수 (현재는 사용 안함)
}

// ✅ ProfileSetupSubmit 컴포넌트
const ProfileSetupSubmit = ({
    isValid,
    buttonText,
    redirectTo,
}: ProfileSetupSubmitProps) => {
    const router = useRouter(); // ✅ 페이지 이동용 라우터 가져오기

    // ✅ 프로필 제출 함수 (버튼 클릭 시 실행)
    const handleSubmit = async () => {
        if (!isValid) return; // ❗️ 입력이 유효하지 않으면 제출하지 않음

        // ✅ Zustand 스토어에서 현재 입력된 프로필 정보 가져오기
        const {
            nickname,
            gender,
            age,
            height,
            weight,
            purpose,
            diseases,
            profileImage,
        } = useProfileSetupStore.getState();

        try {
            const accessToken = localStorage.getItem("accessToken"); // ✅ 저장된 accessToken 가져오기

            // ✅ 프로필 등록 API 호출
            const response = await axios.post(
                "https://api.eatfit.site/api/core/users/profile",
                {
                    profileImage,
                    nickname,
                    gender,
                    age: Number(age),
                    height: Number(height),
                    weight: Number(weight),
                    targetWeight: Number(weight),
                    goalType: purpose,
                    diseases,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`, // ✅ Authorization 헤더에 토큰 추가
                    },
                }
            );

            // ✅ 성공했을 때 콘솔에 정보 출력
            console.log("✅ 프로필 등록 완료");
            console.log("📦 상태 코드:", response.status);
            console.log("📦 응답 헤더:", response.headers);

            // ✅ 등록 성공 후 리다이렉트 (redirectTo가 있으면 해당 경로로, 없으면 기본 nutritionPlan으로)
            router.push(redirectTo || "/profile/nutritionPlan");
        } catch (error) {
            // ❗️ 에러 발생 시 콘솔 출력 + 알림 띄우기
            console.error("❌ 프로필 등록 실패:", error);
            alert("프로필 등록에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="w-full flex justify-center py-6">
            {/* ✅ 프로필 제출 버튼 */}
            <Button
                onClick={handleSubmit} // 🔥 버튼 클릭 시 handleSubmit 실행
                disabled={!isValid} // 🔥 입력값이 유효하지 않으면 버튼 비활성화
                variant="outlined"
                sx={{
                    width: "321px",
                    height: "60px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: isValid ? "#15B493" : "#C4C4C4", // 🔹 활성/비활성 색상 변경
                    borderColor: isValid ? "#15B493" : "#E0E0E0",
                    backgroundColor: "#fff",
                    "&:hover": {
                        backgroundColor: "#F5F5FD",
                        borderColor: "#15B493",
                    },
                }}
            >
                {buttonText ?? "설정하기"}{" "}
                {/* 🔹 버튼에 표시할 텍스트 (기본값: "설정하기") */}
            </Button>
        </div>
    );
};

export default ProfileSetupSubmit; // ✅ 기본 export
