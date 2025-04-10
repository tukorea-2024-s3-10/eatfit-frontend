"use client";

import { Box, Typography } from "@mui/material";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";

// 🔸 추천 아이템 데이터 (SVG + 이름 + 링크)
const items = [
    {
        name: "업앤업 마그네슘 영양제\n400mg 250정",
        image: "/carousel1.svg",
        link: "https://www.iherb.com/pr/now-foods-magnesium-citrate-400-mg-250-tablets/861",
    },
    {
        name: "아마존홀푸드 철분영양제\n60정 베지캡슐 빈혈예방",
        image: "/carousel2.svg",
        link: "https://www.iherb.com/pr/nature-s-plus-hema-plex-iron-60-sustained-release-mini-tabs/883",
    },
    {
        name: "내추럴플러스\n100정",
        image: "/carousel3.svg",
        link: "https://www.iherb.com/pr/nature-s-plus-source-of-life-multi-vitamin-mineral-supplement-with-whole-food-concentrates-180-mini-tablets/7525",
    },
    {
        name: "단백질 쉐이크\n운동 후 보충용",
        image: "/carousel4.svg",
        link: "https://www.iherb.com/pr/premier-protein-100-whey-protein-powder-chocolate-milkshake-1-lb-8-oz-697-g/115593",
    },
    {
        name: "닭가슴살 샐러드\n저탄고단 식단",
        image: "/carousel5.svg",
        link: "https://www.iherb.com/pr/wild-planet-organic-roasted-chicken-breast-with-rib-meat-5-oz-142-g/101699",
    },
    {
        name: "키토김밥\n저탄수화물 식사",
        image: "/carousel6.svg",
        link: "https://www.iherb.com/pr/gimme-sushi-nori-roasted-seaweed-0-81-oz-23-g/103408",
    },
];

const Dashboard_RecommendationCarousel = () => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
            perView: 3,
            spacing: 10,
        },
        drag: true,
        created: () => {
            timerRef.current = setInterval(() => {
                slider.current?.next();
            }, 3000); // 3초마다 자동 슬라이드
        },
        destroyed: () => {
            if (timerRef.current) clearInterval(timerRef.current);
        },
    });

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const nickname = useProfileSetupStore(state => state.nickname);

    return (
        <section className="w-full px-4 py-4 flex flex-col items-center">
            {/* 제목 */}
            <Typography
                sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#2F3033",
                    textAlign: "left",
                    width: "100%",
                    maxWidth: 312,
                }}
            >
                {nickname}님을 위해
                <br />
                영양제와 식단을 추천해드려요
            </Typography>

            {/* 슬라이드 영역 */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 312,
                    mt: 2,
                }}
            >
                <div ref={sliderRef} className="keen-slider">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="keen-slider__slide"
                            style={{
                                border: "1px solid #15B493",
                                borderRadius: "16px",
                                height: 200,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "16px",
                                textAlign: "center",
                                boxSizing: "border-box",
                                cursor: "pointer",
                                backgroundColor: "#fff",
                            }}
                            onClick={() => window.open(item.link, "_blank")}
                        >
                            {/* 이미지 (SVG 지원) */}
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={110}
                                height={110}
                                style={{
                                    objectFit: "contain",
                                    marginBottom: "12px",
                                }}
                                priority
                            />

                            {/* 텍스트 */}
                            <Typography
                                sx={{
                                    fontSize: 11,
                                    fontWeight: 500,
                                    color: "#2F3033",
                                    whiteSpace: "pre-line",
                                }}
                            >
                                {item.name}
                            </Typography>
                        </div>
                    ))}
                </div>
            </Box>
        </section>
    );
};

export default Dashboard_RecommendationCarousel;
