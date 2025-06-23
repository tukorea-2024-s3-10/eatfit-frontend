"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/app/lib/axiosInstance";          // ✨ 추가
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore"; // ✨ 추가

import Dinner_Header from "@/app/components/dinner/Dinner_Header";
import Dinner_NicknameGreeting from "@/app/components/dinner/Dinner_NicknameGreeting";
import Dinner_RecommendSection from "@/app/components/dinner/Dinner_RecommendSection";
import Dinner_FoodDetailModal from "@/app/components/dinner/Dinner_FoodDetailModal";
import TabBar from "@/app/components/common/TabBar";

const dummyFoods = {
    proteinFoods: [
        {
            name: "메추리알",
            image: "/dinner_egg.svg",
            calorie: 120,
            carbs: 2,
            protein: 6,
            fat: 5,
        },
        {
            name: "계란말이",
            image: "/dinner_Eegg.svg",
            calorie: 204,
            carbs: 22,
            protein: 6,
            fat: 12,
        },
    ],
    lowSodiumFoods: [
        {
            name: "연어구이",
            image: "/dinner_salmon.svg",
            calorie: 171,
            carbs: 0,
            protein: 21,
            fat: 10,
        },
        {
            name: "된장국",
            image: "/dinner_ddg.svg",
            calorie: 230,
            carbs: 12,
            protein: 8,
            fat: 6,
        },
    ],
    etcFoods: [
        {
            name: "김치찌개",
            image: "/dinner_kimchi.svg",
            calorie: 200,
            carbs: 14,
            protein: 9,
            fat: 10,
        },
        {
            name: "양배추참치덮밥",
            image: "/dinner_rice.svg",
            calorie: 280,
            carbs: 30,
            protein: 12,
            fat: 8,
        },
    ],
};

const DinnerPage = () => {
    /* ────────── 닉네임 세터 가져오기 ────────── */
    const setNickname = useProfileSetupStore(state => state.setNickname);
  
    /* ────────── 페이지 진입 시 유저 프로필 호출 ────────── */
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await axiosInstance.get("/api/core/users/profile");
          const name = res.data?.data?.name;         // ← API 구조에 맞게
          if (name) setNickname(name);               // Zustand에 저장
        } catch (e) {
          console.error("❌ 유저 프로필 불러오기 실패:", e);
        }
      };
  
      fetchProfile();
    }, [setNickname]);
  
    /* ────────── 음식 모달 상태 ────────── */
    const [selectedFood, setSelectedFood] = useState<
      (typeof dummyFoods.proteinFoods)[0] | null
    >(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleFoodClick = (food: (typeof dummyFoods.proteinFoods)[0]) => {
      setSelectedFood(food);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedFood(null);
    };
  
    /* ────────── UI ────────── */
    return (
      <div>
        <Dinner_Header />
        <Dinner_NicknameGreeting />   {/* ✅ 이제 "김준수" 뜬다! */}
  
        <Dinner_RecommendSection
          title="단백질이 많은 음식이에요"
          items={dummyFoods.proteinFoods}
          onFoodClick={handleFoodClick}
        />
        <Dinner_RecommendSection
          title="나트륨이 적은 음식이에요"
          items={dummyFoods.lowSodiumFoods}
          onFoodClick={handleFoodClick}
        />
        <Dinner_RecommendSection
          title="이외에 추천하는 음식들이에요"
          items={dummyFoods.etcFoods}
          onFoodClick={handleFoodClick}
        />
  
        <TabBar />
  
        {selectedFood && (
          <Dinner_FoodDetailModal
            open={isModalOpen}
            onClose={closeModal}
            food={selectedFood}
          />
        )}
      </div>
    );
  };
  
  export default DinnerPage;