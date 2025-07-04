"use client";

import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "@/app/lib/axiosInstance";
import { useMealNameSearchStore } from "@/app/store/useMealNameSearchStore";
import { debounce } from "lodash";
import type { FoodInfo } from "@/app/store/useMealNameSearchStore";
import type { AutocompleteProps } from "@mui/material/Autocomplete";

const MealInputName_SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  const {
    setSelectedFood,
    setKeyword,
    addRecentKeyword,
    setSearchResults,
    searchResults,
  } = useMealNameSearchStore();

  // ✅ 음식 선택 처리
  const handleFoodSelect = (food: FoodInfo) => {
    setSelectedFood(food);
    setKeyword(food.name);
    addRecentKeyword(food.name);
  };

  // ✅ 음식 검색 API 호출
  const fetchFoods = useCallback(
    async (kw: string) => {
      try {
        const res = await axiosInstance.get(
          `/api/core/food?name=${encodeURIComponent(kw)}`
        );
        setSearchResults(res.data.data ?? []);
      } catch (e) {
        console.error("음식 검색 실패:", e);
        setSearchResults([]);
      }
    },
    [setSearchResults]
  );

  // ✅ 디바운스 적용
  const debouncedFetch = useCallback(debounce(fetchFoods, 300), [fetchFoods]);

  useEffect(() => {
    if (inputValue.trim()) {
      debouncedFetch(inputValue);
    } else {
      setSearchResults([]);
    }
    return () => debouncedFetch.cancel();
  }, [inputValue, debouncedFetch, setSearchResults]);

  // ✅ MUI Autocomplete에 타입 명시
  const AutocompleteComponent = Autocomplete as React.ComponentType<
    AutocompleteProps<FoodInfo, false, false, true>
  >;

  return (
    <Box sx={{ width: "100%", px: 2, pt: 3 }}>
      <AutocompleteComponent
        freeSolo
        options={searchResults}
        isOptionEqualToValue={(o, v) => o.name === v.name}
        getOptionLabel={(o) => (typeof o === "string" ? o : o.name)}
        onInputChange={(_, v) => setInputValue(v)}
        onChange={(_, v) => {
          if (v && typeof v !== "string") handleFoodSelect(v);
        }}
        filterOptions={(x) => x} // 기본 필터 비활성화
        renderInput={(params) => (
          <TextField
            {...params}
            label="음식 이름으로 검색"
            placeholder="예: 닭가슴살, 바나나..."
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: "#F9F9F9",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#C3C6CF",
                },
                "&:hover fieldset": {
                  borderColor: "#15B493",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#15B493",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#15B493",
              },
            }}
          />
        )}
        sx={{
          "& .MuiAutocomplete-option": {
            py: 1,
            px: 2,
            borderBottom: "1px solid #eee",
            fontSize: 14,
            fontWeight: 500,
            color: "#2F3033",
            "&[aria-selected='true']": {
              backgroundColor: "#E0F7F3",
            },
            "&:hover": {
              backgroundColor: "#D1F2EC",
            },
          },
          "& .MuiAutocomplete-paper": {
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
          },
        }}
      />
    </Box>
  );
};

export default MealInputName_SearchBar;
