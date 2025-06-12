"use client";

import React from "react";
import ProfileSetupHeader from "@/app/components/profileSetup/Profile_Setup_Header";
import Profile_Setup_Profile from "@/app/components/profileSetup/Profile_Setup_Profile";
import ProfileSetupGender from "@/app/components/profileSetup/Profile_Setup_Gender";
import ProfileSetupBodyInfo from "@/app/components/profileSetup/Profile_Setup_BodyInfo";
import ProfileSetupPurpose from "@/app/components/profileSetup/Profile_Setup_Purpose";
import ProfileSetupDisease from "@/app/components/profileSetup/Profile_Setup_Disease";
import ProfileSetupSubmit from "@/app/components/profileSetup/Profile_Setup_Submit";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore"; // ✅ Zustand store import

const Page = () => {
    // ✅ 모든 상태 불러오기
    const nickname = useProfileSetupStore(state => state.nickname);
    const gender = useProfileSetupStore(state => state.gender);
    const age = useProfileSetupStore(state => state.age);
    const height = useProfileSetupStore(state => state.height);
    const weight = useProfileSetupStore(state => state.weight);
    const purpose = useProfileSetupStore(state => state.purpose);
    const diseases = useProfileSetupStore(state => state.diseases);

    // ✅ 모든 항목이 채워졌는지 확인
    const allInputsFilled =
        !!nickname.trim() &&
        !!gender &&
        !!age.trim() &&
        !!height.trim() &&
        !!weight.trim() &&
        !!purpose;

    return (
        console.log({
            nickname,
            gender,
            age,
            height,
            weight,
            purpose,
            diseases,
            isValid: allInputsFilled,
        }),
        (
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
                        // onSubmit={() => {
                        //     console.log("✅ 모든 정보 입력 완료!");
                        //     console.log(useProfileSetupStore.getState()); // 전체 상태 확인
                        // }}
                    />
                </div>
            </div>
        )
    );
};

export default Page;
