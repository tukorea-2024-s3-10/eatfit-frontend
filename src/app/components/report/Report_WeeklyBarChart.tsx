"use client";

import { Box, Typography } from "@mui/material";

interface Props {
    data: {
        dayLabel: string;
        kcal: number;
    }[];
}

const Report_WeeklyBarChart = ({ data }: Props) => {
    return (
        <Box sx={{ px: 4, mt: 1 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    height: 120,
                }}
            >
                {data.map((item, index) => {
                    const height = Math.min(item.kcal / 30, 80); // 칼로리를 높이로 환산
                    const color = index % 2 === 0 ? "#15B493" : "#7C73C0";

                    return (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",

                                width: 32,
                            }}
                        >
                            {/* 🔺 막대 위 칼로리 수치 */}
                            <Typography
                                sx={{
                                    fontSize: "8px",
                                    color: color,
                                    fontWeight: 600,
                                    mb: 0.5,
                                    textAlign: "center",
                                }}
                            >
                                {item.kcal.toLocaleString()}Kcal
                            </Typography>

                            {/* 🟩 칼로리 막대 */}
                            <Box
                                sx={{
                                    width: "100%",
                                    height: `${height}px`,
                                    backgroundColor: color,
                                    borderRadius: "4px",
                                }}
                            />

                            {/* 📅 요일 라벨 */}
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    color: "#2F3033",
                                    mt: 0.5,
                                }}
                            >
                                {item.dayLabel}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default Report_WeeklyBarChart;
