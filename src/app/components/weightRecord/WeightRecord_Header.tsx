"use client";

import { IconButton, Menu, MenuItem, Box, Typography } from "@mui/material";
import { Menu as MenuIcon, ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const WeightRecord_Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isWeightRecordRoot = pathname === "/record/weight";

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path: string) => {
        router.push(path);
        handleMenuClose();
    };

    const menuItems = [
        { label: "홈", path: "/dashboard" },
        { label: "식단 기록하기", path: "/record/meal" },
        { label: "체중 기록하기", path: "/record/weight" }, // 구현현
        { label: "식단 기록", path: "/history/meal" },
        { label: "체중 기록", path: "/history/weight" },
        { label: "건강 리포트", path: "/report" },
        { label: "영양제 & 식단 추천", path: "/recommend" },
        { label: "저녁 추천", path: "/recommend/dinner" },
        { label: "마이페이지", path: "/mypage" },
    ];

    return (
        <header className="w-full flex justify-between items-center px-4 pt-4 pb-2">
            {/* 왼쪽: 뒤로가기 or 빈공간 */}
            {isWeightRecordRoot ? (
                <IconButton
                    sx={{ padding: 0, color: "#2F3033" }}
                    onClick={() => router.back()}
                >
                    <ArrowLeft size={24} />
                </IconButton>
            ) : (
                <Box sx={{ width: 24 }} />
            )}

            {/* 중앙: 제목 */}
            <Typography
                sx={{
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "#2F3033",
                }}
            >
                체중 기록하기
            </Typography>

            {/* 오른쪽: 햄버거 */}
            <IconButton
                sx={{
                    padding: 0,
                    color: "#2F3033",
                }}
                onClick={handleMenuOpen}
            >
                <MenuIcon size={28} />
            </IconButton>

            {/* 메뉴 */}
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
                transitionDuration={200}
                disableScrollLock
            >
                {menuItems.map(item => (
                    <MenuItem
                        key={item.label}
                        onClick={() => handleNavigate(item.path)}
                        sx={{
                            fontSize: 14,
                            "&:hover": {
                                backgroundColor: "#F5F5FD",
                                color: "#7C69EF",
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

export default WeightRecord_Header;
