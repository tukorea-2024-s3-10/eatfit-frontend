"use client";
import React from "react";
import ImageUploader from "../components/ImageUploader/ImageUploader";
import NickNameInputField from "../components/InputField/NickNameInputField";
import { useState } from "react";

const Page = () => {
    const [nickName, setnickName] = useState("");
    const [error, setError] = useState("");

    const validatedNickname = (value: string) => {
        const trimValue = value.trim();

        if (trimValue.length <= 1 || trimValue.length > 12) {
            return "닉네임은 2~12자로 입력해주세요.";
        }

        if (!/^[가-힣a-zA-Z0-9]+$/.test(trimValue)) {
            return "닉네임은 한글, 영어, 숫자만 사용할 수 있습니다.";
        }

        return "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setnickName(newValue);

        const validatedError = validatedNickname(newValue);
        setError(validatedError);
    };

    return (
        <div className="flex justify-center h-screen items-center flex-col space-y-10 bg-emerald-400">
            <div>Component Test Page</div>
            {/* ImageUploader */}
            <ImageUploader />
            {/* NicknameInputFeild */}
            <NickNameInputField
                value={nickName}
                placeholder="닉네임을 입력해주세요"
                onChange={handleChange}
                error={error}
            />
        </div>
    );
};

export default Page;
