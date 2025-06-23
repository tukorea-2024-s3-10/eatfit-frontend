/* -------------------------------------------------------------------------- */
/*  ProfileSetupSubmit.tsx                                                    */
/* -------------------------------------------------------------------------- */
"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/lib/axiosInstance";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";

interface ProfileSetupSubmitProps {
  /** 입력값이 모두 유효한지 여부 */
  isValid: boolean;
  /** 버튼 텍스트 (기본: "설정하기") */
  buttonText?: string;
  /** 완료 후 이동 경로 (기본: "/mypage") */
  redirectTo?: string;
  /** 성공 후 추가 작업이 필요할 때 쓰는 콜백 (옵션) */
  onSubmit?: () => void;
}

const ProfileSetupSubmit = ({
  isValid,
  buttonText = "설정하기",
  redirectTo = "/mypage",
  onSubmit,
}: ProfileSetupSubmitProps) => {
  const router = useRouter();

  /* ---------------------------------------------------------------------- */
  /*  내부 핸들러 (항상 실행)                                                */
  /* ---------------------------------------------------------------------- */
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
    } = useProfileSetupStore.getState();

    try {
      /* ------------------------------- API -------------------------------- */
      await axiosInstance.post("/api/core/users/profile", {
        nickname,
        gender,
        age,
        height: Number(height),
        weight: Number(weight),
        targetWeight: Number(weight), // 필요하면 수정
        goalType: purpose,
        disease: diseases.join(","),  // 배열 → 문자열
      });

      console.log("✅ 프로필 수정 성공");

      /* 외부 콜백(옵션) 실행 */
      onSubmit?.();

      /* 리다이렉트 */
      router.push(redirectTo);
    } catch (err) {
      console.error("❌ 프로필 수정 실패:", err);
      alert("프로필 수정에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  /* ---------------------------------------------------------------------- */
  /*  JSX                                                                   */
  /* ---------------------------------------------------------------------- */
  return (
    <div className="w-full flex justify-center py-6">
      <Button
        onClick={handleSubmit}           /* ✅ 내부 handleSubmit 고정 */
        disabled={!isValid}
        variant="outlined"
        sx={{
          width: 321,
          height: 60,
          borderRadius: 2,
          fontSize: 16,
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
        {buttonText}
      </Button>
    </div>
  );
};

export default ProfileSetupSubmit;
