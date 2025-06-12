"use client";

import { Box, Typography } from "@mui/material";
import { useWeightStore } from "@/app/store/useWeightStore";
import { ArrowRight } from "lucide-react";
import dayjs from "dayjs";
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";

const WeightRecord_SummaryCard = () => {
    const weightByDate = useWeightStore(state => state.weightByDate);
    const setIsEditing = useWeightStore(state => state.setIsEditing);

    // ✅ 오늘 날짜와 전날 날짜를 기반으로 키 만들기 (항상 고정됨)
    const todayKey = dayjs().format("YYYY-MM-DD");
    const prevKey = dayjs().subtract(1, "day").format("YYYY-MM-DD");

    // ✅ 체중 데이터 가져오기
    const todayWeightObj = weightByDate[todayKey];
    const prevWeightObj = weightByDate[prevKey];

    const todayWeight = todayWeightObj?.weight;
    const prevWeight = prevWeightObj?.weight;

    // ✅ 전날 대비 체중 변화 계산
    const weightDiff =
        todayWeight !== undefined && prevWeight !== undefined
            ? todayWeight - prevWeight
            : null;

    const targetWeight = useNutritionPlanStore(state => state.targetWeight);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            mt={6}
            height="176px"
        >
            {/* 📦 카드 묶음 */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1.5}
            >
                {/* 🟢 오늘 몸무게 카드 */}
                <Box
                    width={136}
                    height={92}
                    border="2px solid #00C092"
                    borderRadius="12px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    onClick={() => setIsEditing(true)}
                    sx={{
                        cursor: "pointer",
                        position: "relative",
                        "&:hover": { boxShadow: "0 0 0 2px #9BE8D8" },
                    }}
                >
                    <Typography fontSize={12} fontWeight={500} color="#2F3033">
                        오늘 몸무게
                    </Typography>
                    <Box display="flex" alignItems="baseline" gap={0.5}>
                        <Typography
                            fontSize={20}
                            fontWeight={700}
                            color="#00C092"
                        >
                            {todayWeight !== undefined
                                ? todayWeight.toFixed(1)
                                : "--"}
                        </Typography>
                        <Typography
                            fontSize={14}
                            fontWeight={400}
                            color="#2F3033"
                        >
                            kg
                        </Typography>
                    </Box>
                    <Typography
                        fontSize={10}
                        color="#999"
                        position="absolute"
                        bottom={6}
                        sx={{ pointerEvents: "none" }}
                    >
                        터치하여 수정
                    </Typography>
                </Box>

                <ArrowRight size={20} color="#999" />

                {/* 🟣 목표 몸무게 카드 */}
                <Box
                    width={136}
                    height={92}
                    border="2px solid #9E8DFF"
                    borderRadius="12px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography fontSize={12} fontWeight={500} color="#2F3033">
                        목표 몸무게
                    </Typography>
                    <Box display="flex" alignItems="baseline" gap={0.5}>
                        <Typography
                            fontSize={20}
                            fontWeight={700}
                            color="#9E8DFF"
                        >
                            {targetWeight ? targetWeight.toFixed(1) : "--"}
                        </Typography>
                        <Typography
                            fontSize={14}
                            fontWeight={400}
                            color="#2F3033"
                        >
                            kg
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* 📉 체중 변화 안내 */}
            <Box textAlign="center" sx={{ mt: "16px" }}>
                {weightDiff !== null && (
                    <>
                        <Typography fontSize={16} fontWeight={600}>
                            {weightDiff === 0
                                ? "어제랑 같아요!"
                                : `${Math.abs(weightDiff).toFixed(1)}kg ${
                                      weightDiff < 0
                                          ? "어제보다 줄었어요!"
                                          : "어제보다 늘었어요!"
                                  }`}
                        </Typography>

                        <Typography fontSize={13} color="#666">
                            {weightDiff === 0
                                ? "유지하고 있어요. 좋아요!"
                                : weightDiff < 0
                                ? "목표에 가까워지고 있어요!"
                                : "목표에서 멀어지고 있어요..."}
                        </Typography>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default WeightRecord_SummaryCard;
