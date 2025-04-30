"use client";

import { Box, Divider } from "@mui/material";
import MyPage_Header from "@/app/components/mypage/MyPage_Header";
import MyPage_ProfileCard from "@/app/components/mypage/MyPage_ProfileCard";
import MyPage_GoalSection from "@/app/components/mypage/MyPage_GoalSection";
import MyPage_Settings from "@/app/components/mypage/MyPage_Settings";
import TabBar from "@/app/components/common/TabBar";
import { useEffect } from "react";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";
import axios from "@/app/lib/axios";

const MyPage = () => {
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(
                    "https://api.eatfit.site/api/core/users/profile"
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

                // 나이 계산산
                const currentYear = new Date().getFullYear(); // 현재 년도
                const age = (currentYear - birthYear).toString(); // 나이 계산
                const diseases = disease ? disease.split(",") : []; // 질병은 배열로 관리

                // 스토어에 상태 업데이트트
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
