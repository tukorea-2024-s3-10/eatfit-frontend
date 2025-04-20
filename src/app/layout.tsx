import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import EmotionRegistry from "./emotion";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// ✅ PWA + SEO 대응 metadata 설정
export const metadata: Metadata = {
    title: "EatFit | 식단 추천 & 건강 관리 앱",
    description:
        "EatFit은 나에게 맞는 식단을 추천하고, 건강 관리를 돕는 스마트 웹 앱입니다. 헬스, 다이어트, 영양까지 한 번에 관리하세요.",
    manifest: "/manifest.json",

    // ✅ 검색엔진 최적화용 키워드
    keywords: [
        "식단 추천",
        "건강 관리",
        "다이어트 식단",
        "헬스 식단",
        "맞춤 식단",
        "영양 분석",
        "운동 식단",
        "PWA 앱",
        "모바일 식단 앱",
        "EatFit",
    ],

    // ✅ 아이콘 (파비콘, iOS 홈화면용 등)
    icons: {
        icon: "/icons/Logo.png", // 일반 파비콘
        apple: "/icons/Logo.png", // iOS 홈화면 아이콘
    },

    // ✅ 소셜 미디어 공유 (Open Graph 설정)
    openGraph: {
        title: "EatFit | 나만의 건강 식단을 만나보세요",
        description:
            "식단을 기록하고, 영양을 분석하며, 맞춤 추천을 받는 헬스케어 앱",
        url: "https://eatfit.com",
        siteName: "EatFit",
        images: [
            {
                url: "/EafFit_OpenGraph.png", // ✅ 썸네일 이미지
                width: 1200,
                height: 630,
                alt: "EatFit 대표 이미지",
            },
        ],
        type: "website",
        locale: "ko_KR",
    },

    // ✅ Twitter 카드 설정
    twitter: {
        card: "summary_large_image",
        title: "EatFit | 나에게 맞는 식단을 추천해드릴게요",
        description:
            "영양 밸런스를 고려한 식단을 추천받고 건강을 기록해보세요!",
        images: ["/EafFit_OpenGraph.png"],
        site: "@EatFitApp",
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    userScalable: "no",
    themeColor: "#15B493", // 테마 색상 (상단 브라우저 색상 등)
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <EmotionRegistry>
                    <div className="w-full max-w-[480px] mx-auto min-h-screen bg-white">
                        {children}
                    </div>
                </EmotionRegistry>
            </body>
        </html>
    );
}
