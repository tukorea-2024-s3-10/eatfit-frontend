// components/record/meal/input/name/MealInputName_SearchBar.tsx
"use client";

import { Box, Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useMealNameSearchStore } from "@/app/store/useMealNameSearchStore";

// ✅ 자동완성 옵션 리스트 (mock)
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
            const res = await axios.get("/api/mock/photo-foods"); // mock API 호출
            setSearchResults(res.data.foods);
            setKeyword(searchWord); // 상태에 검색어 저장
            addRecentKeyword(searchWord); // 최근 검색어 추가
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
                onInputChange={(event, newValue) => {
                    setInputValue(newValue);
                }}
                onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                        handleSearch(newValue); // 선택 시 검색 실행
                    }
                }}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        handleSearch(inputValue);
                    }
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        placeholder="음식을 검색하세요"
                        fullWidth
                        sx={{
                            // 기본 상태
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                "& fieldset": {
                                    borderColor: "#E0E0E0", // 🩶 기본 테두리
                                },
                                // 포커스 됐을 때
                                "&.Mui-focused fieldset": {
                                    borderColor: "#12C08D", // ✅ 초록 테두리
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
