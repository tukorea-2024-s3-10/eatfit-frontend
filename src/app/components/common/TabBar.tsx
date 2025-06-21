// components/common/TabBar.tsx
"use client";

import { Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { Home, UtensilsCrossed, User } from "lucide-react";
import { IoScale } from "react-icons/io5";

const TabBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    // 탭 항목 정의
    const tabs = [
        { label: "홈", icon: <Home size={20} />, path: "/dashboard" },
        {
            label: "식단",
            icon: <UtensilsCrossed size={20} />,
            path: "/record/meal",
        },
        { label: "체중", icon: <IoScale size={20} />, path: "/record/weight" },
        { label: "마이", icon: <User size={20} />, path: "/mypage" },
    ];

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                height: "64px",
                backgroundColor: "#fff",
                borderTop: "1px solid #E3E2E6",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            {tabs.map(tab => {
                const isActive =
                    tab.path === "/mypage"
                        ? pathname.startsWith("/mypage")
                        : pathname === tab.path;
                return (
                    <Box
                        key={tab.path}
                        onClick={() => router.push(tab.path)}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            color: isActive ? "#15B493" : "#2F3033",
                            cursor: "pointer",
                        }}
                    >
                        {tab.icon}
                        <Typography
                            sx={{
                                fontSize: "10px",
                                fontWeight: 500,
                                mt: "2px",
                            }}
                        >
                            {tab.label}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};

export default TabBar;
