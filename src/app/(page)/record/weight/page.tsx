"use client";

import { useEffect, useMemo } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useWeightStore } from "@/app/store/useWeightStore";
import WeightRecord_Controller from "@/app/components/weightRecord/WeightRecord_Controller";
import dayjs from "dayjs";

const Page = () => {
    // 오늘 날짜 한 번만 계산해서 저장 (매 렌더링마다 새로 만들지 않게)
    const today = useMemo(() => dayjs(), []);

    // Zustand에서 날짜 설정 함수 가져오기
    const setSelectedDate = useWeightStore(state => state.setSelectedDate);

    useEffect(() => {
        // 페이지 들어오면 오늘 날짜를 상태에 넣어줌 ✅
        setSelectedDate(today);
    }, [setSelectedDate, today]);

    return (
        // MUI 날짜 컴포넌트 쓸 때 무조건 이걸로 감싸야 함 ✅
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* 상태에 따라 화면 전환 (입력폼 vs 기록 카드) */}
            <WeightRecord_Controller />
        </LocalizationProvider>
    );
};

export default Page;
