"use client";

import { useRef } from "react";
import { Avatar, IconButton, TextField } from "@mui/material";
import { Pencil } from "lucide-react";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";

const ProfileSetupProfile = () => {
    // ✅ Zustand에서 상태 불러오기
    const profileImage = useProfileSetupStore(state => state.profileImage);
    const setProfileImage = useProfileSetupStore(
        state => state.setProfileImage
    );
    const nickname = useProfileSetupStore(state => state.nickname);
    const setNickname = useProfileSetupStore(state => state.setNickname);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // 닉네임 유효성 검사
    const validateNickname = (name: string) => {
        const trimmed = name.trim();
        const regex = /^[가-힣a-zA-Z0-9]{2,12}$/;
        if (!trimmed) return "닉네임을 입력해주세요";
        if (!regex.test(trimmed))
            return "2~12자 한글, 영어, 숫자만 입력 가능해요";
        return null;
    };

    const error = validateNickname(nickname);

    // 닉네임 변경 핸들러
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    // 이미지 업로드 핸들러
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result as string); // Zustand에 저장
        };
        reader.readAsDataURL(file);
    };

    return (
        <section className="flex flex-col items-center gap-4 py-6">
            {/* 프로필 이미지 업로드 */}
            <div className="relative w-[96px] h-[96px]">
                <Avatar
                    src={profileImage || ""}
                    sx={{
                        width: "96px",
                        height: "96px",
                        bgcolor: "#C4C4C4",
                        cursor: "pointer",
                    }}
                    onClick={() => fileInputRef.current?.click()}
                />
                <IconButton
                    onClick={() => fileInputRef.current?.click()}
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        backgroundColor: "#7C69EF",
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
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                />
            </div>

            {/* 닉네임 입력 */}
            <TextField
                placeholder="닉네임을 설정하세요"
                value={nickname}
                onChange={handleNicknameChange}
                variant="standard"
                error={!!error}
                helperText={error || " "}
                inputProps={{
                    maxLength: 20,
                    style: { textAlign: "center" },
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
