// components/record/meal/MealMethod_OptionList.tsx
"use client";

import { Box } from "@mui/material";
import MealMethod_Option from "./MealMethod_Option";

const MealMethod_OptionList = () => {
    return (
        <Box sx={{ px: 2 }}>
            {/* 📸 사진으로 등록 */}
            <MealMethod_Option
                imageSrc="/RecordMeal_Photo.svg"
                title="사진으로 등록"
                description="식단 사진을 업로드하면 AI가 자동으로 분석해드려요"
                method="photo"
            />

            {/* 🍔 음식이름으로 등록 */}
            <MealMethod_Option
                imageSrc="/RecordMeal_Name.svg"
                title="음식이름으로 등록"
                description="음식 이름만 입력하면 자동으로 영양 정보를 불러와요"
                method="name"
            />

            {/* ✍️ 수동으로 입력 */}
            <MealMethod_Option
                imageSrc="/RecordMeal_Manual.svg"
                title="수동으로 입력"
                description="칼로리와 영양 정보를 직접 입력할 수 있어요"
                method="manual"
            />
        </Box>
    );
};

export default MealMethod_OptionList;
