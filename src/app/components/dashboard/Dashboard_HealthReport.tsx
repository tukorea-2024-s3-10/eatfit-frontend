"use client"; // Next.js App Router 클라이언트 컴포넌트 지정

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation"; // 라우팅용 훅

// 🔹 건강 리포트 컴포넌트
const Dashboard_HealthReport = () => {
    const router = useRouter(); // 페이지 이동용

    // ✅ 일주일 간의 칼로리 데이터 (더미 데이터)
    const calorieData = [1975, 2078, 1043, 1602, 0, 0, 0];
    const days = ["월", "화", "수", "목", "금", "토", "일"];

    return (
        <section className="w-full px-4 pt-4 flex flex-col items-center">
            {/* 🔸 건강 리포트 카드 박스 */}
            <Box
                sx={{
                    width: "312px", // 🔸 고정 너비
                    height: "248px", // 🔸 내용 박스 높이 (274px - 버튼 위치 고려)
                    border: "1px solid #C8C4E9",
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    px: 2,
                    py: 3,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                {/* 🔹 제목 */}
                <Typography
                    sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#2F3033",
                        textAlign: "center",
                    }}
                >
                    {"<건강 리포트>"}
                </Typography>

                {/* 🔹 막대 차트 부분 */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1.5, // 🔸 막대 간 간격 확보
                        alignItems: "end",
                        height: 100,
                        px: 1,
                        mt: 1,
                    }}
                >
                    {calorieData.map((cal, i) => {
                        // ✅ 막대 높이 계산 (최대 높이 제한)
                        const barHeight = Math.min(cal / 30, 80); // 칼로리를 막대 높이로 환산하되, 최대 80px까지만 표시
                        let color = "#15B493";
                        if (i === 1 || i === 3 || i === 5) {
                            color = "#7C69EF";
                        }

                        return (
                            <Box
                                key={i}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: 30, // 막대 고정 너비
                                }}
                            >
                                {/* 🔸 칼로리 수치 텍스트 */}
                                <Typography
                                    sx={{
                                        fontSize: "8px",
                                        fontWeight: 500,
                                        color: color,
                                        mb: 0.5,
                                        textAlign: "center",
                                        whiteSpace: "nowrap", // 한 줄로
                                    }}
                                >
                                    {cal.toLocaleString()}Kcal
                                </Typography>

                                {/* 🔸 실제 막대 */}
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: `${barHeight}px`,
                                        backgroundColor: color,
                                        borderRadius: "4px",
                                    }}
                                />

                                {/* 🔸 요일 텍스트 */}
                                <Typography
                                    sx={{
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        color: "#2F3033",
                                        mt: 0.5,
                                    }}
                                >
                                    {days[i]}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>

                {/* 🔹 하단 요약 메시지 */}
                <Typography
                    sx={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#2F3033",
                        textAlign: "center",
                        mt: 1,
                    }}
                >
                    이번주는 목표 칼로리를 잘 유지하고 있어요!
                </Typography>
            </Box>

            {/* 🔸 박스 외부에 위치한 "자세히 보기" 버튼 */}
            <Box
                sx={{
                    width: "312px",
                    textAlign: "right",
                    mt: "4px",
                }}
            >
                <Button
                    onClick={() => router.push("/report")} // 🔹 페이지 이동
                    sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "#15B493",
                        textTransform: "none", // 자동 대문자 방지
                        padding: 0,
                        minWidth: 0,
                        mr: 1,
                    }}
                >
                    자세히 보기 &gt;
                </Button>
            </Box>
        </section>
    );
};

export default Dashboard_HealthReport;
