"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const WeightRecord_GoHomeButton = () => {
    const router = useRouter();

    return (
        <Button
            onClick={() => router.push("/dashboard")}
            sx={{
                mt: 4,

                width: "312px", // ✅ 너비 고정
                height: "60px", // ✅ 높이 고정
                borderRadius: "12px",
                backgroundColor: "#15B493", // ✅ 민트색
                fontSize: 16,
                fontWeight: 600,
                color: "#fff",
                ":hover": {
                    backgroundColor: "#13a584",
                },
                mx: "auto", // 👉 가운데 정렬용 (부모가 flex/box면)
                display: "block", // 👉 버튼 자체를 block처럼
            }}
        >
            홈으로 가기
        </Button>
    );
};

export default WeightRecord_GoHomeButton;
