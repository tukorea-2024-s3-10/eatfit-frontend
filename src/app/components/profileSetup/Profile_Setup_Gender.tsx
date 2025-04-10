"use client";

import { Button, Typography } from "@mui/material";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";

const ProfileSetupGender = () => {
    const gender = useProfileSetupStore(state => state.gender);
    const setGender = useProfileSetupStore(state => state.setGender);

    const handleGenderSelect = (gender: "male" | "female") => {
        setGender(gender);
    };

    return (
        <section className="w-full flex flex-col gap-2 px-4">
            {/* 제목 */}
            <Typography
                variant="subtitle1"
                sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#2F3033",
                    mb: 1,
                    ml: 1,
                }}
            >
                성별 선택
            </Typography>

            {/* 버튼 영역 */}
            <div className="flex gap-2 justify-center">
                <Button
                    variant="outlined"
                    onClick={() => handleGenderSelect("male")}
                    sx={{
                        width: "154px", // ✅ 버튼 너비 고정
                        height: "60px", // ✅ 버튼 높이 고정
                        borderColor: gender === "male" ? "#15B493" : "#9BE8D8",
                        color: gender === "male" ? "#15B493" : "#9BE8D8",
                        fontWeight: 500,
                        fontSize: "16px",
                        borderRadius: "12px",
                        backgroundColor:
                            gender === "male" ? "#F5F5FD" : "transparent",
                        "&:hover": {
                            borderColor: "#15B493",
                            color: "#15B493",
                            backgroundColor: "#F5F5FD",
                        },
                    }}
                >
                    남성
                </Button>

                <Button
                    variant="outlined"
                    onClick={() => handleGenderSelect("female")}
                    sx={{
                        width: "154px",
                        height: "60px",
                        borderColor:
                            gender === "female" ? "#15B493" : "#9BE8D8",
                        color: gender === "female" ? "#15B493" : "#9BE8D8",
                        fontWeight: 500,
                        fontSize: "16px",
                        borderRadius: "12px",
                        backgroundColor:
                            gender === "female" ? "#F5F5FD" : "transparent",
                        "&:hover": {
                            borderColor: "#15B493",
                            color: "#15B493",
                            backgroundColor: "#F5F5FD",
                        },
                    }}
                >
                    여성
                </Button>
            </div>
        </section>
    );
};

export default ProfileSetupGender;
