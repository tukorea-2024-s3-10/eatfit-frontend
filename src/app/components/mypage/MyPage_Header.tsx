"use client";

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ArrowLeft, Menu as MenuIcon } from "lucide-react";
import { useState } from "react";

const MyPage_Header = () => {
    const router = useRouter();

    // 🔘 드롭다운 메뉴 상태
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

    // 📝 메뉴 항목 (Dashboard와 동일)
    const menuItems = [
        { label: "홈", path: "/dashboard" },
        { label: "식단 기록하기", path: "/record/meal" },
        { label: "체중 기록하기", path: "/record/weight" },
        { label: "식단 기록", path: "/history/meal" },
        { label: "체중 기록", path: "/record/weight" },
        { label: "건강 리포트", path: "/report" },
        { label: "마이페이지", path: "/mypage" },
    ];

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: "#fff",
                color: "#2F3033",
                borderBottom: "1px solid #E0E0E0",
            }}
        >
            <Toolbar
                sx={{
                    minHeight: "56px",
                    px: 2,
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                {/* ← 뒤로가기 */}
                <IconButton onClick={() => router.back()} edge="start">
                    <ArrowLeft size={20} />
                </IconButton>

                {/* 페이지 타이틀 */}
                <Typography
                    variant="h6"
                    fontSize={16}
                    fontWeight={600}
                    textAlign="center"
                >
                    마이페이지
                </Typography>

                {/* 햄버거 버튼 */}
                <IconButton onClick={handleMenuOpen}>
                    <MenuIcon size={20} />
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
            </Toolbar>
        </AppBar>
    );
};

export default MyPage_Header;
