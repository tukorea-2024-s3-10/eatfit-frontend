// components/profileSetup/Profile_Setup_Profile.tsx
"use client";

import { useRef, useState } from "react";
import { Avatar, IconButton, TextField } from "@mui/material";
import { Pencil } from "lucide-react";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";

const ProfileSetupProfile = () => {
    // 사용자 프로필 이미지 상태
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const nickname = useProfileSetupStore(state => state.nickname);
    const setNickname = useProfileSetupStore(state => state.setNickname);

    const [error, setError] = useState<string | null>(null);
    // 파일 선택을 위한 숨겨진 input 참조
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // 파일 업로드 처리 함수
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result as string); // base64 형식으로 이미지 미리보기
        };
        reader.readAsDataURL(file);
    };

    // 유효성검사 함수
    const validateNickname = (name: string) => {
        const trimmedName = name.trim();
        const regex = /^[가-힣a-zA-Z0-9]{2,12}$/;
        if (!trimmedName) return "닉네임을 입력해주세요";
        if (!regex.test(trimmedName))
            return "2~12자 한글, 영어, 숫자만 입력 가능해요";
        return null;
    };

    // 닉네임 변경시 유효성검사 적용하기
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNickname(value);

        const errorMassage = validateNickname(value);
        setError(errorMassage);
    };

    return (
        <section className="flex flex-col items-center gap-4 py-6">
            {/* 프로필 이미지 */}
            <div className="relative w-[96px] h-[96px]">
                {/* 클릭 가능한 아바타 */}
                <Avatar
                    src={profileImage || ""}
                    sx={{
                        width: "96px",
                        height: "96px",
                        bgcolor: "#C4C4C4", // 기본 회색 배경
                        cursor: "pointer",
                    }}
                    onClick={() => fileInputRef.current?.click()} // 클릭 시 input 열기
                />

                {/* 연필 아이콘 버튼 (우하단) */}
                <IconButton
                    onClick={() => fileInputRef.current?.click()}
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        backgroundColor: "#7C69EF", // 보라색
                        color: "#fff",
                        width: 28,
                        height: 28,
                        borderRadius: "8px",
                        padding: "4px",
                        "&:hover": {
                            backgroundColor: "#6b5dd8",
                        },
                    }}
                >
                    <Pencil size={16} />
                </IconButton>

                {/* 실제 파일 input (숨김) */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                />
            </div>

            {/* 닉네임 입력 필드 (텍스트 → 입력창으로 변경) */}
            <TextField
                placeholder="닉네임을 설정하세요"
                value={nickname}
                onChange={handleNicknameChange}
                variant="standard"
                error={Boolean(error)}
                helperText={error || " "} // 🔴 에러 메시지 표시 (공백 유지해서 레이아웃 안깨짐)
                inputProps={{
                    maxLength: 20,
                    style: {
                        textAlign: "center",
                    },
                }}
                sx={{
                    width: "220px",
                    "& .MuiInput-underline:before": {
                        borderBottom: "1px solid #C4C4C4",
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderBottom: "1px solid #9BE8D8 ",
                    },
                    "& .MuiInput-underline:after": {
                        borderBottom: "2px solid #15B493",
                    },
                }}
            />
        </section>
    );
};

export default ProfileSetupProfile;
