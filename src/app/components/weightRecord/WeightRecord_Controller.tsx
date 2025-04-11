"use client";

import { useWeightStore } from "@/app/store/useWeightStore";
import WeightRecord_EmptyView from "./WeightRecord_EmptyView";
import WeightRecord_ChartView from "./WeightRecord_ChartView";

const WeightRecord_Controller = () => {
    // 지금 입력 중인지 여부 가져오기 (전역 상태에서)
    const isEditing = useWeightStore(state => state.isEditing);
    // 상태에 따라 화면 전환 (true면 입력폼, false면 차트 요약 카드)
    return isEditing ? <WeightRecord_EmptyView /> : <WeightRecord_ChartView />;
};

export default WeightRecord_Controller;
