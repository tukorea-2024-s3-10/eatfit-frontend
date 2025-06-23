"use client";

import React from "react";
import ProfileSetupHeader from "@/app/components/profileSetup/Profile_Setup_Header";
import Profile_Setup_Profile from "@/app/components/profileSetup/Profile_Setup_Profile";
import ProfileSetupGender from "@/app/components/profileSetup/Profile_Setup_Gender";
import ProfileSetupBodyInfo from "@/app/components/profileSetup/Profile_Setup_BodyInfo";
import ProfileSetupPurpose from "@/app/components/profileSetup/Profile_Setup_Purpose";
import ProfileSetupDisease from "@/app/components/profileSetup/Profile_Setup_Disease";
import ProfileSetupSubmit from "@/app/components/profileSetup/Profile_Setup_Submit";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";

const EditProfilePage = () => {
  // 🔍 Zustand 상태 불러오기
  const nickname = useProfileSetupStore(state => state.nickname);
  const gender = useProfileSetupStore(state => state.gender);
  const age = useProfileSetupStore(state => state.age);
  const height = useProfileSetupStore(state => state.height);
  const weight = useProfileSetupStore(state => state.weight);
  const purpose = useProfileSetupStore(state => state.purpose);
  const diseases = useProfileSetupStore(state => state.diseases);

  // ✅ 안전한 입력값 체크
  const allInputsFilled =
    typeof nickname === "string" && nickname.trim() !== "" &&
    typeof gender === "string" &&
    typeof age === "string" && age.trim() !== "" &&
    typeof height === "string" && height.trim() !== "" &&
    typeof weight === "string" && weight.trim() !== "" &&
    typeof purpose === "string";

  // ✅ 제출 핸들러
  const handleSubmit = () => {
    console.log("✅ 수정된 프로필:", {
      nickname,
      gender,
      age,
      height,
      weight,
      purpose,
      diseases,
    });
    // ProfileSetupSubmit 내부에서 axios 요청 처리함
  };

  return (
    <div>
      <ProfileSetupHeader />
      <Profile_Setup_Profile />

      <div className="flex flex-col gap-8">
        <ProfileSetupGender />
        <ProfileSetupBodyInfo />
        <ProfileSetupPurpose />
        <ProfileSetupDisease />

        <ProfileSetupSubmit
          isValid={allInputsFilled}
          buttonText="수정 완료"
          redirectTo="/mypage"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditProfilePage;
