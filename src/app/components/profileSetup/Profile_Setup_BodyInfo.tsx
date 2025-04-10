"use client";

import { Typography } from "@mui/material";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";

const ProfileSetupBodyInfo = () => {
    const age = useProfileSetupStore(state => state.age);
    const height = useProfileSetupStore(state => state.height);
    const weight = useProfileSetupStore(state => state.weight);
    const setAge = useProfileSetupStore(state => state.setAge);
    const setHeight = useProfileSetupStore(state => state.setHeight);
    const setWeight = useProfileSetupStore(state => state.setWeight);

    const handleNumberChange =
        (setter: (v: string) => void) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value)) {
                setter(value);
            }
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
                신체 정보
            </Typography>

            <div className="flex gap-2">
                {/* 나이 */}
                <div
                    className="flex flex-col justify-between items-center border rounded-[12px] px-4 py-5"
                    style={{
                        width: "154px",
                        height: "128px",
                        borderColor: "#9BE8D8",
                        borderWidth: "1px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#2F3033",

                            mr: 10,
                        }}
                    >
                        나이
                    </Typography>

                    {/* 만 00세 */}
                    <div className="mt-7  text-[12px] text-[#2F3033] ml-10">
                        <span className="text-[#909094] mr-1">만 </span>
                        {/* 숫자 입력 */}
                        <input
                            value={age}
                            onChange={handleNumberChange(setAge)}
                            inputMode="numeric"
                            placeholder="00"
                            className="text-center text-[30px] font-bold text-[#15B493] w-12 outline-none bg-transparent"
                        />
                        <span className="text-[#909094]"> 세</span>
                    </div>
                </div>

                {/* 키 + 몸무게 */}
                <div className="flex flex-col gap-2">
                    {/* 키 */}
                    <div
                        className="flex items-center justify-between border rounded-[12px] px-4"
                        style={{
                            width: "154px",
                            height: "60px",
                            borderColor: "#9BE8D8",
                            borderWidth: "1px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#2F3033",
                            }}
                        >
                            키
                        </Typography>

                        <div className="flex items-end gap-1">
                            <input
                                value={height}
                                onChange={handleNumberChange(setHeight)}
                                inputMode="decimal"
                                placeholder="000"
                                className="text-[20px] font-bold text-[#15B493] text-right outline-none w-[56px] bg-transparent"
                            />
                            <span className="text-[14px] text-[#909094] mb-[2px]">
                                cm
                            </span>
                        </div>
                    </div>

                    {/* 몸무게 */}
                    <div
                        className="flex items-center justify-between border rounded-[12px] px-4"
                        style={{
                            width: "154px",
                            height: "60px",
                            borderColor: "#9BE8D8",
                            borderWidth: "1px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#2F3033",
                            }}
                        >
                            몸무게
                        </Typography>

                        <div className="flex items-end gap-1">
                            <input
                                value={weight}
                                onChange={handleNumberChange(setWeight)}
                                inputMode="decimal"
                                placeholder="00"
                                className="text-[20px] font-bold text-[#15B493] text-right outline-none w-[48px] bg-transparent"
                            />
                            <span className="text-[14px] text-[#909094] mb-[2px]">
                                kg
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileSetupBodyInfo;
