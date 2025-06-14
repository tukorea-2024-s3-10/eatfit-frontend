"use client";

import React from "react";
import { Box, Button } from "@mui/material";
import { Upload } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const MealInputPhoto_UploadButton = () => {
    const router = useRouter();

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
                "http://3.39.238.237:8000/predict",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("음식 인식 결과:", response.data);
            // TODO: 응답 데이터를 상태에 저장하고 다음 단계로 이동
            router.push("/record/meal/input/name");
        } catch (error) {
            console.error("음식 인식 실패:", error);
            alert("음식 인식에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                p: 2,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Button
                component="label"
                variant="contained"
                startIcon={<Upload />}
                sx={{
                    backgroundColor: "#15B493",
                    "&:hover": {
                        backgroundColor: "#12A080",
                    },
                }}
            >
                사진 업로드
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </Button>
        </Box>
    );
};

export default MealInputPhoto_UploadButton;
