"use client";

import { Box, Typography } from "@mui/material";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore"; // ✅ zustand store import

const NutritionPlan_PersonalizedInfo = () => {
    const userName = useProfileSetupStore(state => state.nickname); // ⬅️ 닉네임 상태
    const diseases = useProfileSetupStore(state => state.diseases); // ⬅️ 질병 리스트

    // 질병들을 콤마로 이어붙임
    const diseaseText =
        diseases.length > 0 ? diseases.join(", ") : "특이 질병 없음";

    return (
        <section className="w-full px-4 pb-10 flex justify-center">
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "312px",
                    border: "1px solid #C8C4E9",
                    borderRadius: "12px",
                    padding: "16px",
                    backgroundColor: "#fff",
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        color: "#2F3033",
                        wordBreak: "keep-all",
                    }}
                >
                    <span style={{ color: "#15B493", fontWeight: 700 }}>
                        {diseaseText}
                    </span>
                    이 있는{" "}
                    <span style={{ color: "#7C69EF", fontWeight: 700 }}>
                        {userName}
                    </span>
                    님께 맞는
                    <br />
                    식단과 영양제를 추천할 예정이에요
                </Typography>
            </Box>
        </section>
    );
};

export default NutritionPlan_PersonalizedInfo;
