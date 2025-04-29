"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";

interface ProfileSetupSubmitProps {
    isValid: boolean;
    buttonText?: string;
    redirectTo?: string;
}

const ProfileSetupSubmit = ({
    isValid,
    buttonText,
    redirectTo,
}: ProfileSetupSubmitProps) => {
    const router = useRouter();

    const handleSubmit = async () => {
        if (!isValid) return;

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
            const accessToken = localStorage.getItem("accessToken");

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
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            console.log("✅ 프로필 등록 완료");
            console.log("📦 상태 코드:", response.status);
            console.log("📦 응답 헤더:", response.headers);

            router.push(redirectTo || "/profile/nutritionPlan");
        } catch (error) {
            console.error("❌ 프로필 등록 실패:", error);
            alert("프로필 등록에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="w-full flex justify-center py-6">
            <Button
                onClick={handleSubmit}
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
