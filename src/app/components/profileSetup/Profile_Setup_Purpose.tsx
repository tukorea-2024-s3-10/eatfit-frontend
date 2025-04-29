"use client";

import { Button, Typography } from "@mui/material";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";

const ProfileSetupPurpose = () => {
    const prupose = useProfileSetupStore(state => state.purpose);
    const setPurpose = useProfileSetupStore(state => state.setPurpose);

    const purposes = ["다이어트", "일반", "헬스"];

    return (
        <section className="flex flex-col gap-2 px-4">
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
                사용 목적
            </Typography>

            {/* 버튼들 */}
            <div className="flex flex-wrap ml-2 gap-[12px]">
                {purposes.map(item => (
                    <Button
                        key={item}
                        variant="outlined"
                        onClick={() => setPurpose(item)}
                        sx={{
                            height: "40px",
                            minWidth: "78px", // 최소 너비 보장
                            width: "auto", // 유동 너비
                            padding: "0 16px", // 좌우 여백
                            borderRadius: "9999px",
                            fontSize: "14px",
                            fontWeight: 500,
                            textTransform: "none",
                            color: prupose === item ? "#15B493" : "#9BE8D8",
                            borderColor:
                                prupose === item ? "#15B493" : "#9BE8D8",
                            backgroundColor:
                                prupose === item ? "#F5F5FD" : "#FFFFFF",
                            "&:hover": {
                                backgroundColor:
                                    prupose === item ? "#E0F4EE" : "#F9F9F9",
                                borderColor: "#15B493",
                            },
                        }}
                    >
                        {item}
                    </Button>
                ))}
            </div>
        </section>
    );
};

export default ProfileSetupPurpose;
