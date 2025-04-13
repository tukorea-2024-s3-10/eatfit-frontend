// components/record/meal/MealMethod_Option.tsx
"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RecordMethod } from "@/app/store/useMealRecordStore";

interface MealMethodOptionProps {
    imageSrc: string; // 카드에 들어갈 아이콘 경로
    title: string; // 카드 상단 제목
    description: string; // 카드 하단 설명
    method: RecordMethod; // 방식 구분 값: "photo" | "name" | "manual"
}

const MealMethod_Option = ({
    imageSrc,
    title,
    description,
    method,
}: MealMethodOptionProps) => {
    const router = useRouter();

    // 📸 사진 방식일 때: 파일 선택 후 base64 인코딩 처리
    const handlePhotoUpload = () => {
        const input = document.createElement("input");
        input.type = "file"; // 파일 입력 요소 생성
        input.accept = "image/*"; // 이미지 파일만 허용

        // 파일이 선택되었을 때 실행되는 콜백
        input.onchange = async () => {
            const file = input.files?.[0]; // 선택한 파일 가져오기
            if (!file) return;

            const reader = new FileReader(); // 파일 리더 생성
            reader.onloadend = () => {
                const base64 = reader.result as string; // base64 문자열로 변환 완료됨
                console.log("📷 base64 이미지 업로드됨:", base64);

                // TODO: Zustand 같은 전역 상태에 base64 저장해두고
                router.push("/record/meal/input/photo"); // 결과 페이지로 이동
            };
            reader.readAsDataURL(file); // 실제 base64 변환
        };

        input.click(); // 숨겨진 input을 강제로 클릭시켜서 파일 선택창 열기
    };

    // 🧭 공통 클릭 핸들러 (카드 누르면 실행됨)
    const handleClick = () => {
        switch (method) {
            case "photo":
                handlePhotoUpload(); // 사진은 먼저 업로드부터 처리
                break;
            case "name":
                router.push("/record/meal/input/name"); // 음식이름 페이지로 이동
                break;
            case "manual":
                router.push("/record/meal/input/manual"); // 수동입력 페이지로 이동
                break;
        }
    };

    return (
        <Box
            onClick={handleClick}
            sx={{
                width: 312, // 카드 너비 고정
                height: 107, // 카드 높이 고정
                display: "flex", // 가로 정렬
                alignItems: "center",
                gap: 2,
                border: "1.5px solid #12C08D",
                borderRadius: "12px",
                padding: 2,
                mt: 2,
                cursor: "pointer", // 마우스 올리면 클릭 가능하게
            }}
        >
            {/* 좌측 이미지 (크기 87x87) */}
            <Image src={imageSrc} alt={title} width={87} height={87} />

            {/* 텍스트 영역 */}
            <Box>
                <Typography
                    sx={{ fontWeight: 600, fontSize: 16, color: "#2F3033" }}
                >
                    {title}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#4A4A4A" }}>
                    {description}
                </Typography>
            </Box>
        </Box>
    );
};

export default MealMethod_Option;
