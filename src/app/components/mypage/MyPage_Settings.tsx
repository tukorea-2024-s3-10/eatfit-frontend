"use client";

import {
    Box,
    Typography,
    Switch,
    FormControlLabel,
    Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSettingStore } from "@/app/store/useSettingStore";

const MyPage_Settings = () => {
    const router = useRouter();
    const alarmEnabled = useSettingStore(state => state.alarmEnabled);
    const toggleAlarm = useSettingStore(state => state.toggleAlarm);

    return (
        <Box px={3} pt={3}>
            {/* 🔧 섹션 타이틀 */}
            <Typography
                fontSize={14}
                fontWeight={600}
                color="#999"
                mb={1.5}
                textAlign="center"
            >
                {"<개인 설정>"}
            </Typography>

            {/* 🔔 알림 설정 */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1.5}
                borderBottom="1px solid #E0E0E0"
            >
                <Typography fontSize={14}>알림 설정</Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={alarmEnabled}
                            onChange={toggleAlarm}
                            sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                    color: "#00C092",
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                    {
                                        backgroundColor: "#00C092",
                                    },
                            }}
                        />
                    }
                    label={alarmEnabled ? "on" : "off"}
                    labelPlacement="end"
                    sx={{ ml: 0 }}
                />
            </Box>

            {/* 🔒 계정 정보 수정 */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1.5}
            >
                <Typography fontSize={14}>계정 정보 수정</Typography>
                <Button
                    onClick={() => router.push("/mypage/settings")}
                    variant="text"
                    sx={{
                        fontSize: 13,
                        color: "#2F3033",
                        fontWeight: 500,
                        padding: 0,
                        minWidth: 0,
                    }}
                >
                    수정하러 가기 &gt;
                </Button>
            </Box>
        </Box>
    );
};

export default MyPage_Settings;
