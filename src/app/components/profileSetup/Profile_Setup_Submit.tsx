"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/lib/axiosInstance";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";

interface ProfileSetupSubmitProps {
    isValid: boolean;
    buttonText?: string;
    redirectTo?: string;
    onSubmit?: () => void; // ✅ 외부에서 함수 전달 가능하게 추가
}

const ProfileSetupSubmit = ({
    isValid,
    buttonText,
    redirectTo,
    onSubmit,
}: ProfileSetupSubmitProps) => {
    const router = useRouter();

    const handleSubmit = async () => {
        if (!isValid) return;

        console.log("✅ 모든 정보 입력 완료!");
        console.log(useProfileSetupStore.getState());

        const { nickname, gender, age, height, weight, purpose, diseases } =
            useProfileSetupStore.getState();

        try {
            const response = await axiosInstance.post(
                "/api/core/users/profile",
                {
                    nickname,
                    gender,
                    birthYear: new Date().getFullYear() - Number(age), // age → birthYear 계산
                    height: Number(height),
                    weight: Number(weight),
                    targetWeight: Number(weight), // 💡 필요 시 수정 가능
                    goalCategory: purpose,
                    disease: diseases.join(","), // 배열 → 문자열 변환
                }
            );

            console.log("✅ 프로필 수정 성공:", response.data);

            // 외부에서 onSubmit을 넘겨준 경우 실행
            if (onSubmit) onSubmit();

            // 리다이렉트
            router.push(redirectTo || "/profile/nutritionPlan");
        } catch (error) {
            console.error("❌ 프로필 수정 실패:", error);
            alert("프로필 수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="w-full flex justify-center py-6">
            <Button
                onClick={onSubmit ?? handleSubmit} // ✅ 외부 onSubmit 우선
                disabled={!isValid}
                variant="outlined"
                sx={{
                    width: "321px",
                    height: "60px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: isValid ? "#15B493" : "#C4C4C4",
                    borderColor: isValid ? "#15B493" : "#E0E0E0",
                    backgroundColor: "#fff",
                    "&:hover": {
                        backgroundColor: "#F5F5FD",
                        borderColor: "#15B493",
                    },
                }}
            >
                {buttonText ?? "설정하기"}
            </Button>
        </div>
    );
};

export default ProfileSetupSubmit;
