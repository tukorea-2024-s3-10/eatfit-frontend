"use client";

import { Box, Divider } from "@mui/material";
import MyPage_Header from "@/app/components/mypage/MyPage_Header";
import MyPage_ProfileCard from "@/app/components/mypage/MyPage_ProfileCard";
import MyPage_GoalSection from "@/app/components/mypage/MyPage_GoalSection";
import MyPage_Settings from "@/app/components/mypage/MyPage_Settings";
import TabBar from "@/app/components/common/TabBar";

const MyPage = () => {
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
