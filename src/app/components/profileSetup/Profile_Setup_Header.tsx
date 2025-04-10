// components/Profile_Setup_Header.tsx
"use client";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material"; // MUI 컴포넌트 불러오기
import { ArrowLeft } from "lucide-react"; // 좌측 화살표 아이콘 (lucide-react)
import { useRouter } from "next/navigation"; // 뒤로가기 기능을 위한 Next.js 라우터
import { usePathname } from "next/navigation";

const ProfileSetupHeader = () => {
    const router = useRouter(); // 라우터 훅 초기화
    const pathname = usePathname(); // 현재 경로 가져오기

    const isRootProfileSetup = pathname === "/profile-setup"; // 현재 경로 profile-setup인지 확인인

    return (
        // 상단 AppBar 컴포넌트 (헤더 역할)
        <AppBar
            position="static" // 고정 아님, 상단에만 위치
            elevation={0} // 그림자 제거
            sx={{
                backgroundColor: "#fff", // 흰색 배경
                color: "#2F3033", // 텍스트 색상
                borderBottom: "1px solid #E0E0E0", // 아래 테두리
            }}
        >
            {/* 내부 Toolbar: 좌우 정렬 및 패딩 적용 */}
            <Toolbar sx={{ minHeight: "56px", px: 2, position: "relative" }}>
                {/* 왼쪽: 뒤로가기 버튼 */}
                {!isRootProfileSetup && ( // 조건부 렌더링 추가
                    <IconButton
                        edge="start" // 좌측 정렬
                        onClick={() => router.back()} // 클릭 시 이전 페이지로 이동
                        aria-label="back" // 접근성 라벨
                    >
                        <ArrowLeft size={20} /> {/* 뒤로가기 아이콘 */}
                    </IconButton>
                )}

                {/* 가운데: 타이틀 텍스트 */}
                <Typography
                    variant="h6" // MUI 프리셋 타이틀
                    sx={{
                        position: "absolute", // 절대위치
                        left: "50%", // 중앙정렬
                        transform: "translateX(-50%)", // 중앙정렬
                        fontWeight: 500,
                        fontSize: "16px",
                    }}
                >
                    맞춤 목표 설정
                </Typography>

                {/* 오른쪽: 균형용 빈 공간 (아이콘 없는 경우 레이아웃 정렬용) */}
                <div style={{ width: 40 }} />
            </Toolbar>
        </AppBar>
    );
};

export default ProfileSetupHeader;
