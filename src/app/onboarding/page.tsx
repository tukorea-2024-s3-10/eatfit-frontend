"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { IoMdArrowRoundBack } from "react-icons/io";

const slides = [
    {
        image: "/onboardingFood1.svg",
        title: ["음식 사진을 통한", "식단 정보 등록"],
        description: [
            "사진으로 음식을 등록하여 AI로 분석하여",
            "식단 정보를 등록해요",
        ],
        buttonText: "다음으로",
    },
    {
        image: "/onboardingFood2.svg",
        title: ["식단 정보를 바탕으로 한", "식단 기록과 피드백"],
        description: [
            "매주 1회, 해당 주의 사용자의 식단 분석 후",
            "식습관에 대한 리포트를 분석해요",
        ],
        buttonText: "다음으로",
    },
    {
        image: "/onboardingFood3.svg",
        title: ["식단 기록에 의한", "영양제와 식단 추천"],
        description: [
            "식단 기록에서 부족한 영양소를 채워주는",
            "영양제나 식단을 추천해줘요",
        ],
        buttonText: "앱 시작하기",
    },
];

const Page = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="h-screen flex flex-col justify-between items-center bg-white relative">
            {activeIndex > 0 && (
                <IoMdArrowRoundBack
                    onClick={() => swiperRef.current?.slidePrev()} // ✅ 이전 슬라이드로 이동
                    className="absolute top-10 left-5 text-xl cursor-pointer"
                />
            )}

            {/* ✅ Swiper 슬라이드 */}
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="w-full max-w-md mt-28"
                onSwiper={swiper => (swiperRef.current = swiper)}
                onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide
                        key={index}
                        className="flex flex-col justify-between items-center text-center px-10 h-full"
                    >
                        {/* ✅ 제목 (배열 .map()으로 줄바꿈 적용) */}
                        <h2 className="text-2xl text-[#111111] font-bold leading-tight">
                            {slide.title.map((line, idx) => (
                                <span key={idx} className="block">
                                    {line}
                                </span>
                            ))}
                        </h2>

                        {/* ✅ 설명 (배열 .map()으로 줄바꿈 적용) */}
                        <p className="text-[#555555] mt-4 text-sm leading-snug">
                            {slide.description.map((line, idx) => (
                                <span key={idx} className="block">
                                    {line}
                                </span>
                            ))}
                        </p>

                        {/* ✅ 이미지 (여백 추가: mb-12) */}
                        <Image
                            src={slide.image}
                            alt={slide.title.join(" ")}
                            width={238}
                            height={238}
                            className="mt-12 mx-auto mb-12"
                        />

                        {/* ✅ 페이지네이션 (버튼과 간격 확보) */}
                        <div className="swiper-pagination absolute bottom-24 flex justify-center"></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* ✅ 버튼을 Swiper 바깥에 배치 (하단 고정) */}
            <div className="w-full max-w-md px-6 absolute bottom-10">
                {activeIndex + 1 === slides.length ? (
                    <Link
                        href="/login"
                        className="w-full h-14 bg-[#15B493] text-white text-lg font-semibold flex items-center justify-center rounded-lg 
                        transition-all duration-300 hover:bg-[#128A70] active:bg-[#0F6D59]"
                    >
                        {slides[activeIndex].buttonText}
                    </Link>
                ) : (
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="w-full h-14 bg-[#15B493] text-white text-lg font-semibold flex items-center justify-center rounded-lg 
                        transition-all duration-300 hover:bg-[#128A70] active:bg-[#0F6D59]"
                    >
                        {slides[activeIndex].buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Page;
