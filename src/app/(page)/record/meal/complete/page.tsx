"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";

const Page = () => {
    const router = useRouter();
    const photoFoodList = useMealRecordStore(state => state.photoFoodList); // ✅ 사진으로 등록된 음식 목록
    const selectedFood = useMealRecordStore(state => state.selectedFood); // ✅ 수동으로 입력한 음식
    const manualInput = useMealRecordStore(state => state.manualInput); // ✅ 수동 입력 데이터
    const selectedTime = useMealRecordStore(state => state.selectedTime); // 아침/점심/저녁

    // 모든 음식 데이터를 하나의 배열로 합치기
    const allFoods = [
        ...photoFoodList,
        ...(selectedFood ? [selectedFood] : []),
        ...(manualInput.name
            ? [
                  {
                      name: manualInput.name,
                      weight: "100g",
                      calorie: manualInput.calorie,
                      carbs: manualInput.carbs,
                      protein: manualInput.protein,
                      fat: manualInput.fat,
                      imageUrl: "/food-placeholder.png",
                  },
              ]
            : []),
    ];

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
            {allFoods.map((item, idx) => (
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
                        src={item.imageUrl || "/food-placeholder.png"}
                        alt={item.name}
                        width={72}
                        height={72}
                        style={{ borderRadius: "8px", objectFit: "cover" }}
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
