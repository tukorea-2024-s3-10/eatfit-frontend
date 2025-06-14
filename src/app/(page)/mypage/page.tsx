"use client";

import { Box, Divider } from "@mui/material";
import MyPage_Header from "@/app/components/mypage/MyPage_Header";
import MyPage_ProfileCard from "@/app/components/mypage/MyPage_ProfileCard";
import MyPage_GoalSection from "@/app/components/mypage/MyPage_GoalSection";
import MyPage_Settings from "@/app/components/mypage/MyPage_Settings";
import TabBar from "@/app/components/common/TabBar";
import { useEffect } from "react";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";
import axiosInstance from "@/app/lib/axiosInstance"; // ✅ 변경 완료

const MyPage = () => {
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");

                const res = await axiosInstance.get(
                    "https://api.eatfit.site/api/core/users/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );

                const {
                    name,
                    gender,
                    birthYear,
                    height,
                    weight,
                    goalCategory,
                    targetWeight,
                    disease,
                } = res.data.data;

                const currentYear = new Date().getFullYear();
                const age = (currentYear - birthYear).toString();
                const diseases = disease ? disease.split(",") : [];

                const store = useProfileSetupStore.getState();
                store.setNickname(name);
                store.setGender(gender);
                store.setAge(age);
                store.setHeight(height.toString());
                store.setWeight(weight.toString());
                store.setTargetWeight(targetWeight.toString());
                store.setPurpose(goalCategory);
                store.setDiseases(diseases);

                console.log("✅ 마이페이지 프로필 로딩 성공: ", res.data.data);
            } catch (err) {
                console.error("❌ 프로필 조회 실패", err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <Box>
            <MyPage_Header />
            <Box px={3} pt={2} pb={10}>
                <MyPage_ProfileCard />
                <Divider sx={{ my: 3 }} />
                <MyPage_GoalSection />
                <Divider sx={{ my: 3 }} />
                <MyPage_Settings />
            </Box>
            <TabBar />
        </Box>
    );
};

export default MyPage;
