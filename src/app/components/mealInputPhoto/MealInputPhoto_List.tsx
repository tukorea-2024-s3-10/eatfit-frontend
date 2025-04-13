// components/record/meal/input/photo/MealInputPhoto_List.tsx
"use client";

import { Box } from "@mui/material";
import { useMealRecordStore } from "@/app/store/useMealRecordStore";
import MealInputPhoto_ItemCard from "./MealInputPhoto_ItemCard";

const MealInputPhoto_List = () => {
    const photoFoodList = useMealRecordStore(state => state.photoFoodList);

    return (
        <Box sx={{ px: 2, pt: 2 }}>
            {photoFoodList.map((item, idx) => (
                <MealInputPhoto_ItemCard
                    key={idx}
                    name={item.name}
                    weight={item.weight}
                    calorie={item.calorie}
                    carbs={item.carbs}
                    protein={item.protein}
                    fat={item.fat}
                />
            ))}
        </Box>
    );
};

export default MealInputPhoto_List;
