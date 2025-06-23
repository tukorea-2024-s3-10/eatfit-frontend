"use client";

import {
  Box,
  Typography,
  Button,
  Divider,
  Modal,
  Slide,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/lib/axiosInstance";

const MyPage_GoalSection = () => {
  const [targetWeight, setTargetWeight] = useState<number>(0);

  useEffect(() => {
    const fetchTargetWeight = async () => {
      try {
        const res = await axiosInstance.get("/api/users/me/goal");
        const data = res.data.data;
        setTargetWeight(data.targetWeight); // 또는 data.goalWeight 등
      } catch (err) {
        console.error("목표 몸무게 조회 오류", err);
      }
    };

    fetchTargetWeight();
  }, []);

  const targetCalorie = useNutritionPlanStore((state) => state.targetCalorie);

  const setTargetCalorie = useNutritionPlanStore(
    (state) => state.setTargetCalorie
  );

  const [openType, setOpenType] = useState<"calorie" | "weight" | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleOpen = (type: "calorie" | "weight") => {
    setOpenType(type);
    setInputValue(
      type === "calorie" ? targetCalorie.toString() : targetWeight.toString()
    );
  };

  const handleClose = () => {
    setOpenType(null);
    setInputValue("");
  };

  const handleSubmit = async () => {
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed)) return;

    try {
      if (openType === "calorie") {
        setTargetCalorie(parsed);

        const res = await axiosInstance.get("/api/core/users/intake-goal");

        await axiosInstance.patch(
          "https://api.eatfit.site/api/core/users/intake-goal",
          {
            calorieGoal: parsed,
            proteinGoal: 90,
            fatGoal: 60,
            carbohydrateGoal: 210,
            sodiumGoal: 2300,
            sugarGoal: 30,
            transFatGoal: 2,
            saturatedFatGoal: 15,
            cholesterolGoal: 300,
          }
        );

        console.log("✅ 목표 칼로리 수정 완료");
      }

      if (openType === "weight") {
        setTargetWeight(parsed);

        await axiosInstance.patch(
          "https://api.eatfit.site/api/core/users/profile/target-weight",
          {
            targetWeight: parsed,
          }
        );

        console.log("✅ 목표 체중 수정 완료");
      }

      handleClose();
    } catch (error) {
      console.error("❌ 목표 수정 실패", error);
    }
  };

  const unit = openType === "calorie" ? "Kcal" : "kg";

  return (
    <Box px={3} py={2}>
      {/* 🔥 목표 칼로리 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1.5}
      >
        <Typography fontSize={14}>목표 칼로리</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography fontSize={16} fontWeight={700} color="#00C092">
            {targetCalorie.toLocaleString()} Kcal
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleOpen("calorie")}
            sx={{
              fontSize: 12,
              fontWeight: 500,
              padding: "2px 10px",
              borderRadius: "8px",
              borderColor: "#00C092",
              color: "#00C092",
            }}
          >
            수정
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 1.5 }} />

      {/* 🧍 목표 몸무게 */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontSize={14}>목표 몸무게</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography fontSize={16} fontWeight={700} color="#00C092">
            {targetWeight.toFixed(1)} kg
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleOpen("weight")}
            sx={{
              fontSize: 12,
              fontWeight: 500,
              padding: "2px 10px",
              borderRadius: "8px",
              borderColor: "#00C092",
              color: "#00C092",
            }}
          >
            수정
          </Button>
        </Box>
      </Box>

      {/* 📱 바텀시트 모달 */}
      <Modal
        open={openType !== null}
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Slide direction="up" in={openType !== null} mountOnEnter unmountOnExit>
          <Box
            sx={{
              width: "100%",
              maxWidth: 512,
              bgcolor: "#fff",
              borderRadius: "16px 16px 0 0",
              p: 4,
              boxShadow: "0px -2px 16px rgba(0, 0, 0, 0.1)",
              outline: "none",
            }}
          >
            {/* 핸들바 */}
            <Box
              sx={{
                width: 37,
                height: 4,
                backgroundColor: "#7C69EF",
                borderRadius: 9999,
                mx: "auto",
                mb: 4,
              }}
            />

            {/* 제목 */}
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: "#2F3033",
                mb: 3,
              }}
            >
              {openType === "calorie"
                ? "목표 칼로리를 수정하세요"
                : "목표 몸무게를 수정하세요"}
            </Typography>

            {/* 입력 필드 */}
            <TextField
              variant="standard"
              type="number"
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              inputProps={{
                style: {
                  fontSize: 32,
                  fontWeight: 700,
                  textAlign: "center",
                  paddingBottom: 1,
                  paddingLeft: "40px",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#2F3033",
                        mt: 3,
                        mr: 2,
                      }}
                    >
                      {unit}
                    </Typography>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottom: "1px solid #9BE8D8",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottom: "1px solid #15B493",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid #15B493",
                },
              }}
            />

            {/* 저장 버튼 */}
            <Button
              onClick={handleSubmit}
              fullWidth
              sx={{
                mt: 4,
                borderRadius: "12px",
                height: "48px",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                backgroundColor: "#15B493",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#11a183",
                },
              }}
            >
              수정하기
            </Button>
          </Box>
        </Slide>
      </Modal>
    </Box>
  );
};

export default MyPage_GoalSection;
