"use client";

import { Box, Typography, Button } from "@mui/material";
import { useMealNameSearchStore } from "@/app/store/useMealNameSearchStore";

const MealInputName_Results = () => {
  const { keyword, searchResults, selectedFoods, addSelectedFood } =
    useMealNameSearchStore();

  if (!keyword.trim()) return null;

  if (searchResults.length === 0)
    return (
      <Box sx={{ px: 2, pt: 4 }}>
        <Typography fontSize={14} color="#909094">
          “{keyword}” 에 대한 결과가 없습니다
        </Typography>
      </Box>
    );

  const already = (name: string) => selectedFoods.some((f) => f.name === name);

  return (
    <Box sx={{ px: 2, pt: 2 }}>
      {searchResults.map((f) => (
        <Box
          key={f.name}
          sx={{
            p: 2.5,
            mb: 2,
            mx: "auto",
            maxWidth: 312,
            borderRadius: 2,
            border: "1px solid #D0EAE3",
            backgroundColor: "#FCFCFC",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Typography fontSize={16} fontWeight={600} mb={1} color="#2F3033">
            {f.name}{" "}
            <Typography
              component="span"
              fontWeight={400}
              color="#909094"
              fontSize={14}
            >
              ({f.mass}g)
            </Typography>
          </Typography>

          {[
            ["칼로리", `${f.calorie} Kcal`],
            ["탄수화물", `${f.carbohydrate} g`],
            ["단백질", `${f.protein} g`],
            ["지방", `${f.fat} g`],
          ].map(([label, val]) => (
            <Box
              key={label}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Typography fontSize={14} color="#2F3033">
                {label}
              </Typography>
              <Typography fontSize={14} color="#2F3033">
                {val}
              </Typography>
            </Box>
          ))}

          <Button
            fullWidth
            disabled={already(f.name)}
            onClick={() =>
              addSelectedFood({
                name: f.name,
                mass: f.mass,
                calorie: f.calorie,
                carbohydrate: f.carbohydrate,
                sugar: f.sugar,
                protein: f.protein,
                fat: f.fat,
                saturatedFat: f.saturatedFat,
                transFat: f.transFat,
                sodiumGoal: f.sodiumGoal,
                cholesterol: f.cholesterol,
              })
            }
            sx={{
              mt: 2,
              py: 1.2,
              borderRadius: 1.5,
              fontWeight: 600,
              fontSize: 14,
              backgroundColor: already(f.name) ? "#E0E0E0" : "#15B493",
              color: "#fff",
              "&:hover": {
                backgroundColor: already(f.name)
                  ? "#E0E0E0"
                  : "#12C08D",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            {already(f.name) ? "추가됨" : "추가하기"}
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default MealInputName_Results;
