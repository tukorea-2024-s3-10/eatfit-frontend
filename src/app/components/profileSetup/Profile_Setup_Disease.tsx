"use client";

import { Button, Typography } from "@mui/material";
import { X } from "lucide-react";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";

const ProfileSetupDisease = () => {
    const diseases = useProfileSetupStore(state => state.diseases);
    const setDiseases = useProfileSetupStore(state => state.setDiseases);

    const diseasesList = [
        "당뇨",
        "고혈압",
        "고지혈증",
        "빈혈",
        "위염",
        "역류성식도염",
        "과민성대장증후군",
        "신장질환",
        "통풍",
        "골다공증",
        "비만",
        "변비",
        "우울증",
        "불면증",
        "안구건조증",
    ];

    const toggleDisease = (disease: string) => {
        if (disease === "없음") {
            setDiseases(["없음"]);
        } else {
            if (diseases.includes(disease)) {
                setDiseases(diseases.filter(d => d !== disease));
            } else {
                const updated = diseases
                    .filter(d => d !== "없음")
                    .concat(disease);
                setDiseases(updated);
            }
        }
    };

    return (
        <section className="flex flex-col gap-2 px-4">
            {/* 제목 */}
            <Typography
                variant="subtitle1"
                sx={{ fontSize: "14px", fontWeight: 500, color: "#2F3033" }}
            >
                질병 여부
            </Typography>

            {/* 버튼 리스트 */}
            <div className="flex flex-wrap gap-[8px] ml-2">
                {diseasesList.map(disease => {
                    const isdiseases = diseases.includes(disease);

                    return (
                        <Button
                            key={disease}
                            variant="outlined"
                            onClick={() => toggleDisease(disease)}
                            startIcon={
                                disease === "없음" ? <X size={14} /> : undefined
                            }
                            sx={{
                                height: "36px",
                                borderRadius: "9999px",
                                padding: "0 12px",
                                fontSize: "14px",
                                fontWeight: 500,
                                textTransform: "none",
                                color: isdiseases ? "#15B493" : "#9BE8D8",
                                borderColor: isdiseases ? "#15B493" : "#9BE8D8",
                                backgroundColor: isdiseases
                                    ? "#F5F5FD"
                                    : "#fff",
                                "&:hover": {
                                    backgroundColor: isdiseases
                                        ? "#E1F4F0"
                                        : "#F9F9F9",
                                    borderColor: "#15B493",
                                },
                            }}
                        >
                            {disease}
                        </Button>
                    );
                })}
            </div>
        </section>
    );
};

export default ProfileSetupDisease;
