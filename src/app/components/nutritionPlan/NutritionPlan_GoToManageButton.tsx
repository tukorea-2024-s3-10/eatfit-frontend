"use client";

import { Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const NutritionPlan_GoToManageButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/manage"); // 🔗 페이지 이동
    };

    return (
        <Box className="w-full flex justify-center px-4 pb-8 pt-2">
            <Button
                onClick={handleClick}
                sx={{
                    width: "312px",
                    height: "52px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 600,
                    backgroundColor: "#15B493",
                    color: "#fff",
                    textTransform: "none",
                    "&:hover": {
                        backgroundColor: "#11a183",
                    },
                }}
            >
                관리하러 가기
            </Button>
        </Box>
    );
};

export default NutritionPlan_GoToManageButton;
