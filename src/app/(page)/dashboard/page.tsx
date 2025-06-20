"use client";

import { useEffect } from "react";
import React from "react";
import Dashboard_Header from "@/app/components/dashboard/Dashboard_Header";
import Dashboard_CalorieSummary from "@/app/components/dashboard/Dashboard_CalorieSummary";
import Dashboard_RecordButtons from "@/app/components/dashboard/Dashboard_RecordButtons";
import Dashboard_HealthReport from "@/app/components/dashboard/Dashboard_HealthReport";
import Dashboard_RecommendationCarousel from "@/app/components/dashboard/Dashboard_RecommendationCarousel";
import TabBar from "@/app/components/common/TabBar";
import { fetchUserProfile } from "@/app/lib/fetchUserProfile";

const Page = () => {
    useEffect(() => {
        fetchUserProfile(); // ✅ 유저 정보 불러오기
    }, []);
    return (
        <div className="pb-20">
            <Dashboard_Header />
            <Dashboard_CalorieSummary />
            <Dashboard_RecordButtons />
            <Dashboard_HealthReport />
            <Dashboard_RecommendationCarousel />
            <TabBar />
        </div>
    );
};

export default Page;
