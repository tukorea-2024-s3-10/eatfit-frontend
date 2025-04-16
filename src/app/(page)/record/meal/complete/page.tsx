"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";

const Page = () => {
    const router = useRouter();
    const mealList = useMealRecordStore(state => state.photoFoodList); // ✅ 등록된 음식 목록
    const selectedTime = useMealRecordStore(state => state.selectedTime); // 아침/점심/저녁

    return (
        <Box className="flex flex-col items-center px-4 pt-10">
            {/* ✅ 완료 문구 */}
            <Typography
                fontSize={16}
                fontWeight={600}
                textAlign="center"
                mb={2}
            >
                오늘의 {selectedTime} 식단 등록이 완료되었어요!
            </Typography>

            {/* ✅ 구분 타이틀 */}
            <Typography fontSize={14} fontWeight={600} color="#7C73C0" mb={2}>
                &lt;{selectedTime} 메뉴&gt;
            </Typography>

            {/* ✅ 음식 카드 리스트 */}
            {mealList.map((item, idx) => (
                <Box
                    key={idx}
                    sx={{
                        border: "1px solid #15B493",
                        borderRadius: "12px",
                        width: "312px",
                        p: 2,
                        mb: 2,
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                    }}
                >
                    <Image
                        src="/food-placeholder.png" // 실제 이미지가 없다면 공통 placeholder
                        alt={item.name}
                        width={72}
                        height={72}
                        style={{ borderRadius: "8px" }}
                    />
                    <Box>
                        <Typography fontWeight={600}>
                            {item.name} {item.weight}
                        </Typography>
                        <Typography fontSize={14}>
                            칼로리: {item.calorie} Kcal
                        </Typography>
                        <Typography fontSize={14}>
                            탄수화물: {item.carbs} g
                        </Typography>
                        <Typography fontSize={14}>
                            단백질: {item.protein} g
                        </Typography>
                        <Typography fontSize={14}>
                            지방: {item.fat} g
                        </Typography>
                    </Box>
                </Box>
            ))}

            {/* ✅ 버튼 */}
            <Button
                variant="contained"
                fullWidth
                onClick={() => router.push("/history/meal")}
                sx={{
                    width: 312,
                    height: 48,
                    mt: 2,
                    borderRadius: "12px",
                    backgroundColor: "#12C08D",
                    fontWeight: 600,
                    fontSize: 16,
                    "&:hover": { backgroundColor: "#10B07F" },
                }}
            >
                식단 기록 보기
            </Button>
        </Box>
    );
};

export default Page;
