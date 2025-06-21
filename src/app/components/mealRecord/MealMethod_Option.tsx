"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    RecordMethod,
    useMealRecordStore,
} from "@/app/store/useMealRecordStore";

interface Props {
    imageSrc: string;
    title: string;
    description: string;
    method: RecordMethod;
}

const MealMethod_Option = ({ imageSrc, title, description, method }: Props) => {
    const router = useRouter();
    const { setUploadedPhoto } = useMealRecordStore();

    const handlePhotoUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return;

            const url = URL.createObjectURL(file); // ▶ object URL
            setUploadedPhoto(url); // ▶ 상태 저장
            router.push("/record/meal/input/photo"); // ▶ 다음 페이지
        };

        input.click();
    };

    const handleClick = () => {
        if (method === "photo") handlePhotoUpload();
        else if (method === "name") router.push("/record/meal/input/name");
        else router.push("/record/meal/input/manual");
    };

    return (
        <Box
            onClick={handleClick}
            sx={{
                width: 312,
                height: 107,
                display: "flex",
                alignItems: "center",
                gap: 2,
                border: "1.5px solid #12C08D",
                borderRadius: "12px",
                p: 2,
                mt: 2,
                cursor: "pointer",
            }}
        >
            <Image src={imageSrc} alt={title} width={87} height={87} />
            <Box>
                <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
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
