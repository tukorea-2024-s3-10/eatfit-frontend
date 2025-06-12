"use client";

import { Box, Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useMealNameSearchStore } from "@/app/store/useMealNameSearchStore";

// ✅ 응답 아이템 타입 정의
interface FoodApiItem {
    name: string;
    mass: number;
    calorie: number;
    carbohydrate: number;
    protein: number;
    fat: number;
}

// ✅ 자동완성 옵션 리스트 (임시 mock)
const allFoodNames = [
    "순두부찌개",
    "공기밥",
    "김치찌개",
    "된장국",
    "불고기",
    "비빔밥",
    "삼겹살",
    "떡볶이",
    "라면",
    "치킨",
    "샐러드",
    "스파게티",
    "에너지바",
    "햄버거",
    "감자튀김",
    "김밥",
    "주스",
    "우유",
    "계란",
    "사과",
];

const MealInputName_SearchBar = () => {
    const { setKeyword, addRecentKeyword, setSearchResults } =
        useMealNameSearchStore();

    const [inputValue, setInputValue] = useState("");

    // 🔍 자동완성 선택 or 엔터 입력 시 검색 실행
    const handleSearch = async (searchWord: string) => {
        if (!searchWord.trim()) return;

        try {
            const res = await axios.get(
                `https://api.eatfit.site/api/core/food?name=${encodeURIComponent(
                    searchWord
                )}`
            );

            const converted = (res.data.data as FoodApiItem[]).map(item => ({
                name: item.name,
                weight: `${item.mass}g`,
                calorie: item.calorie,
                carbs: item.carbohydrate,
                protein: item.protein,
                fat: item.fat,
            }));

            setSearchResults(converted);
            setKeyword(searchWord);
            addRecentKeyword(searchWord);
        } catch (error) {
            console.error("📛 검색 실패", error);
        }
    };

    return (
        <Box sx={{ px: 2, pt: 2 }}>
            <Autocomplete
                freeSolo
                options={allFoodNames}
                inputValue={inputValue}
                onInputChange={(e, newValue) => setInputValue(newValue)}
                onChange={(e, newValue) => {
                    if (typeof newValue === "string") handleSearch(newValue);
                }}
                onKeyDown={e => {
                    if (e.key === "Enter") handleSearch(inputValue);
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        placeholder="음식을 검색하세요"
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                "& fieldset": { borderColor: "#E0E0E0" },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#12C08D",
                                    borderWidth: "1.5px",
                                },
                            },
                        }}
                    />
                )}
            />
        </Box>
    );
};

export default MealInputName_SearchBar;
