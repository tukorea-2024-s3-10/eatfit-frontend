"use client";

import React, { useState } from "react";
import Image from "next/image";

const ImageUploader = () => {
    const [preview, setPreview] = useState("/test-profile.svg");

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative inline-block">
            {/* 프로필이지미 */}
            <div className="w-32 h-32 rounded-full overflow-hidden relative">
                <Image
                    src={preview}
                    alt="프로필 이미지"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 편집 아이콘 */}
            <label
                htmlFor="profile-upload"
                className="absolute bottom-2 right-2 bg-[#7C73C0] text-white w-6 h-6 rounded-md flex items-center justify-center cursor-pointer"
            >
                <Image
                    src={"/edit-icon.svg"}
                    alt="편집아이콘"
                    width={14}
                    height={14}
                />
            </label>

            {/* ✅ 숨겨진 파일 업로드 input */}
            <input
                type="file"
                id="profile-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
            />
        </div>
    );
};

export default ImageUploader;
