"use client";

import WeightRecord_Calendar from "./WeightRecord_Calendar";
import WeightRecord_InputForm from "./WeightRecord_InputForm";
import WeightRecord_Header from "./WeightRecord_Header";

import TabBar from "../common/TabBar";
const WeightRecord_EmptyView = () => {
    return (
        <>
            <WeightRecord_Header />
            <WeightRecord_Calendar />
            <WeightRecord_InputForm />
            <TabBar />
        </>
    );
};

export default WeightRecord_EmptyView;
