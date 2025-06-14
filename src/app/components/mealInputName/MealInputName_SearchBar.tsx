"use client";

import { Box, Autocomplete, TextField, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import axiosInstance from "@/app/lib/axiosInstance";
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

const MealInputName_SearchBar = () => {
    const [searchResults, setSearchResults] = useState<FoodApiItem[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 5;

    const { setSelectedFood, setKeyword, addRecentKeyword } =
        useMealNameSearchStore();

    const fetchFoods = async (search: string, pageNum: number) => {
        try {
            const res = await axiosInstance.get("/api/foods/search", {
                params: {
                    query: search,
                    page: pageNum,
                    size: itemsPerPage,
                },
            });

            setSearchResults(res.data.data.items);
            setTotalPages(Math.ceil(res.data.data.total / itemsPerPage));
        } catch (error) {
            console.error("음식 검색 실패:", error);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            fetchFoods(searchTerm, page);
        }
    }, [searchTerm, page]);

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    const handleFoodSelect = (food: FoodApiItem) => {
        const selectedFood = {
            name: food.name,
            weight: `${food.mass}g`,
            calorie: food.calorie,
            carbs: food.carbohydrate,
            protein: food.protein,
            fat: food.fat,
        };
        setSelectedFood(selectedFood);
        setKeyword(food.name);
        addRecentKeyword(food.name);
    };

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Autocomplete
                freeSolo
                options={searchResults}
                getOptionLabel={option =>
                    typeof option === "string" ? option : option.name
                }
                onInputChange={(_, newValue) => {
                    setSearchTerm(newValue);
                    setPage(1);
                }}
                onChange={(_, value) => {
                    if (value && typeof value !== "string") {
                        handleFoodSelect(value);
                    }
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="음식 검색"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

            {searchResults.length > 0 && (
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            )}
        </Box>
    );
};

export default MealInputName_SearchBar;
