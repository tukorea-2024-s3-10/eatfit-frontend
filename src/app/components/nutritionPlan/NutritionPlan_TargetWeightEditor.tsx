"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  InputAdornment,
  Slide,
} from "@mui/material";
import axiosInstance from "@/app/lib/axiosInstance";
import { useNutritionPlanStore } from "@/app/store/useNutritionPlanStore";

interface Props {
  onSubmit?: () => void; // ✅ 추가: 목표 체중 수정 후 콜백
}

const NutritionPlan_TargetWeightEditor = ({ onSubmit }: Props) => {
  const [open, setOpen] = useState(false);

  const targetWeight = useNutritionPlanStore((state) => state.targetWeight);
  const updateTargetWeight = useNutritionPlanStore(
    (state) => state.updateTargetWeight
  );

  const [inputValue, setInputValue] = useState(targetWeight.toString());

  const handleOpen = () => {
    setInputValue(targetWeight.toString());
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    const value = parseFloat(inputValue);

    if (isNaN(value) || value <= 0) {
      alert("몸무게를 0보다 큰 숫자로 입력해주세요.");
      return;
    } {
      updateTargetWeight(value);

      try {
        await axiosInstance.patch("/api/core/users/profile/target-weight", {
          targetWeight: value,
        });
        console.log("✅ 목표 체중 수정 성공");

        onSubmit?.(); // ✅ 콜백 실행
      } catch (error) {
        console.error("❌ 목표 체중 수정 실패", error);
        alert("목표 체중 저장 중 오류가 발생했어요.");
      }

      setOpen(false);
    }
  };

  return (
    <section className="w-full px-4 flex flex-col items-center">
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 600,
          color: "#2F3033",
          textAlign: "center",
        }}
      >
        목표 몸무게를 설정할 수 있어요
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 400,
          color: "#2F3033",
          textAlign: "center",
          mt: "4px",
        }}
      >
        설정 후 목표를 이룰 수 있도록 도울게요!
      </Typography>

      <Box
        sx={{
          width: "312px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          border: "1px solid #C8C4E9",
          borderRadius: "12px",
          px: 2,
          mt: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: "#2F3033",
            flex: 1,
          }}
        >
          목표 몸무게
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              color: "#15B493",
              display: "flex",
              alignItems: "center",
            }}
          >
            {Number(targetWeight).toFixed(1)}
            <span
              style={{
                color: "#2F3033",
                fontWeight: 700,
                marginLeft: 4,
              }}
            >
              kg
            </span>
          </Typography>

          <Button
            variant="outlined"
            onClick={handleOpen}
            sx={{
              height: "25px",
              minWidth: "30px",
              borderRadius: "9999px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#15B493",
              borderColor: "#15B493",
              padding: "0 16px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#F5F5FD",
                borderColor: "#15B493",
              },
            }}
          >
            설정
          </Button>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
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

            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: "#2F3033",
                mb: 3,
              }}
            >
              목표 몸무게를 수정하세요
            </Typography>

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
                      kg
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
              설정하기
            </Button>
          </Box>
        </Slide>
      </Modal>
    </section>
  );
};

export default NutritionPlan_TargetWeightEditor;
