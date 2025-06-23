// components/dashboard/Dashboard_Header.tsx
"use client";

import Image from "next/image";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Dashboard_Header = () => {
    const router = useRouter();

    // 메뉴 열림 상태 및 위치 추적
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // 메뉴 항목
    const menuItems = [
        { label: "홈", path: "/dashboard" },
        { label: "식단 기록하기", path: "/record/meal" },
        { label: "체중 기록하기", path: "/record/weight" }, //
        { label: "식단 기록", path: "/history/meal" },
        { label: "체중 기록", path: "/record/weight" },
        { label: "건강 리포트", path: "/report" },
        { label: "마이페이지", path: "/mypage" },
    ];

    const handleNavigate = (path: string) => {
        router.push(path);
        handleMenuClose();
    };

    return (
        <header className="w-full flex justify-between items-center px-4 pt-4 pb-2">
            {/* 로고 */}
            <Box
                onClick={() => router.push("/dashboard")}
                sx={{ display: "flex", alignItems: "center" }}
            >
                <Image
                    src="/Dashboard_Logo.svg"
                    alt="Eat Fit 로고"
                    width={110}
                    height={40}
                    priority
                />
            </Box>

            {/* 햄버거 버튼 */}
            <IconButton
                sx={{
                    padding: 0,
                    color: "#2F3033",
                }}
                onClick={handleMenuOpen}
            >
                <MenuIcon size={28} />
            </IconButton>
            {/* 드롭다운 메뉴 */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transitionDuration={200} // 🔹 반응 속도 빠르게
                disableScrollLock // 🔹 모바일 스크롤 이슈 방지
            >
                {menuItems.map(item => (
                    <MenuItem
                        key={item.label}
                        onClick={() => handleNavigate(item.path)}
                        sx={{
                            fontSize: 14,
                            "&:hover": {
                                backgroundColor: "#F5F5FD",
                                color: "#7C69EF", // 🔹 강조 색상
                            },
                        }}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </header>
    );
};

export default Dashboard_Header;
