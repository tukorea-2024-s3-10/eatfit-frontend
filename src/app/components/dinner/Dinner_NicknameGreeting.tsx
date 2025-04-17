"use client";

import { Box, Typography } from "@mui/material";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";

const Dinner_NicknameGreeting = () => {
    const nickname = useProfileSetupStore(state => state.nickname);

    return (
        <Box sx={{ px: 4, pt: 3, pb: 2 }}>
            <Typography
                fontSize={18}
                fontWeight={600}
                textAlign="center" // ✅ 가운데 정렬
                color="#2F3033"
            >
                {nickname || "OO"}님을 위한 저녁 메뉴를
                <br />
                추천해드릴게요!
            </Typography>
        </Box>
    );
};

export default Dinner_NicknameGreeting;
