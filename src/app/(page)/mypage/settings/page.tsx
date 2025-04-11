// app/mypage/settings/page.tsx
"use client";

import { Box, Typography, Divider, Button } from "@mui/material";

import Settings_Header from "@/app/components/settings/Settings_Header";
import TabBar from "@/app/components/common/TabBar";
const AccountSettingsPage = () => {
    return (
        <Box px={3} pt={2}>
            <Settings_Header />

            {/* 📌 회원 정보 */}
            <Typography fontSize={14} fontWeight={600} mb={1} mt={2}>
                회원 정보
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontSize={14}>아이디</Typography>
                <Typography fontSize={14} color="#999">
                    wlfdidqkwlvm@kakao.com
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontSize={14}>비밀번호</Typography>
                <Button variant="text" sx={{ fontSize: 13, color: "#15B493" }}>
                    비밀번호 바꾸기
                </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* ⚙️ 계정 설정 */}
            <Typography fontSize={14} fontWeight={600} mb={1}>
                계정 정보
            </Typography>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1}
            >
                <Typography fontSize={14}>계정 변경하기</Typography>
                <Typography fontSize={13} color="#999">
                    카카오톡 계정
                </Typography>
            </Box>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1}
            >
                <Typography fontSize={14}>로그아웃하기</Typography>
                <Button
                    size="small"
                    sx={{ fontSize: 13, color: "#D32F2F", fontWeight: 500 }}
                >
                    로그아웃
                </Button>
            </Box>
            <TabBar />
        </Box>
    );
};

export default AccountSettingsPage;
