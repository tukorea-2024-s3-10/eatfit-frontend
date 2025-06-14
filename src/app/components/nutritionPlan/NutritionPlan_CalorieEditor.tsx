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

const NutritionPlan_CalorieEditor = () => {
    const [open, setOpen] = useState(false);
    const targetCalorie = useNutritionPlanStore(state => state.targetCalorie);
    const setTargetCalorie = useNutritionPlanStore(
        state => state.setTargetCalorie
    );
    const setMacros = useNutritionPlanStore(state => state.setMacros);
    const [inputValue, setInputValue] = useState(targetCalorie.toString());

    const handleOpen = () => {
        setInputValue(targetCalorie.toString());
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        const calorieNumber = parseFloat(inputValue);

        if (!isNaN(calorieNumber)) {
            setTargetCalorie(calorieNumber);

            const carbs = Math.round((calorieNumber * 0.5) / 4);
            const protein = Math.round((calorieNumber * 0.3) / 4);
            const fat = Math.round((calorieNumber * 0.2) / 9);

            setMacros({ carbs, protein, fat });

            // 🔄 PATCH API 연동
            try {
                await axiosInstance.post("/api/core/users/intake-goal", {
                    calorieGoal: calorieNumber,
                    carbohydrateGoal: Math.round((calorieNumber * 0.6) / 4),
                    proteinGoal: Math.round((calorieNumber * 0.25) / 4),
                    fatGoal: Math.round((calorieNumber * 0.15) / 9),
                });

                console.log("✅ 목표 칼로리 수정 성공");
            } catch (error) {
                console.error("칼로리 목표 저장 실패:", error);
                alert("목표 칼로리 수정에 실패했습니다.");
            }

            setOpen(false);
        }
    };

    return (
        <section className="w-full px-4 flex flex-col items-center">
            <Box
                sx={{
                    width: "312px",
                    height: "79px",
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #C8C4E9",
                    borderRadius: "12px",
                    px: 2,
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
                    목표 칼로리
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
                        {Number(targetCalorie).toLocaleString()}
                        <span
                            style={{
                                color: "#2F3033",
                                fontWeight: 700,
                                marginLeft: 4,
                            }}
                        >
                            Kcal
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
                        수정
                    </Button>
                </Box>
            </Box>

            <Box sx={{ width: "312px", mt: 1 }}>
                <Typography
                    sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "#909094",
                        textAlign: "right",
                    }}
                >
                    *목표 칼로리는 원하는 대로 수정할 수 있어요!
                </Typography>
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
                            목표 칼로리를 수정하세요
                        </Typography>

                        <TextField
                            variant="standard"
                            type="number"
                            fullWidth
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
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
                                            Kcal
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
                            수정하기
                        </Button>
                    </Box>
                </Slide>
            </Modal>
        </section>
    );
};

export default NutritionPlan_CalorieEditor;
