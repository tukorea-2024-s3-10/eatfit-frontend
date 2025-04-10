"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Utensils } from "lucide-react";
import { IoScale } from "react-icons/io5";
const Dashboard_RecordButtons = () => {
    const router = useRouter();

    return (
        <section className="w-full px-4 py-2 flex justify-center">
            <Box
                sx={{
                    width: "312px",
                    display: "flex",
                    gap: 2,
                    mt: 2,
                }}
            >
                {/* 🍽 식단 기록하기 */}
                <Box
                    onClick={() => router.push("/record/meal")}
                    sx={{
                        width: "154px",
                        height: "95px",
                        borderRadius: "12px",
                        backgroundColor: "#CBF7EC",
                        border: "1px solid #15B493",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "0.2s",
                        "&:hover": {
                            opacity: 0.9,
                        },
                    }}
                >
                    <Utensils size={40} color="#15B493" />
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#2F3033",
                            mt: 1,
                        }}
                    >
                        식단 기록하기
                    </Typography>
                </Box>

                {/* ⚖️ 체중 기록하기 */}
                <Box
                    onClick={() => router.push("/record/weight")}
                    sx={{
                        width: "154px",
                        height: "95px",
                        borderRadius: "12px",
                        backgroundColor: "#E5DEF8",
                        border: "1px solid #7C69EF",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "0.2s",
                        "&:hover": {
                            opacity: 0.9,
                        },
                    }}
                >
                    <IoScale size={40} color="#7C69EF" />
                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#2F3033",
                            mt: 1,
                        }}
                    >
                        체중 기록하기
                    </Typography>
                </Box>
            </Box>
        </section>
    );
};

export default Dashboard_RecordButtons;
