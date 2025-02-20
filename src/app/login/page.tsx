"use client";

import { useEffect, useState } from "react";
import LoginButton from "../components/LoginButton.tsx/LoginButton";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams(); // URL 파라미터 값을 가져오기 위함
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    const [naverCode, setNaverCode] = useState<string | null>(null);
    const [kakaoCode, setKakaoCode] = useState<string | null>(null);

    useEffect(() => {
        if (code) {
            if (state === "naver") {
                setNaverCode(code);
                console.log("네이버 로그인 성공, 받은 코드 값: ", code);
            } else if (state === "kakao") {
                setKakaoCode(code);
                console.log("카카오 로그인 성공, 받은 코드 값: ", code);
            }
        }
    }, [code, state]);

    // 네이버 로그인 요청
    const handleNaverLogin = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/naver";
    };

    // 카카오 로그인 요청
    const handleKakaoLogin = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/kakao";
    };

    return (
        <div>
            {/* ✅ 네이버 로그인 */}
            <div>
                <h1 className="text-center">네이버 로그인 페이지</h1>
                <LoginButton sns="naver" onClick={handleNaverLogin} />
                {naverCode && <p>받은 인증코드: {naverCode}</p>}
            </div>

            {/* ✅ 카카오 로그인 */}
            <div>
                <h1 className="text-center">카카오 로그인 페이지</h1>
                <LoginButton sns="kakao" onClick={handleKakaoLogin} />
                {kakaoCode && <p>받은 인증코드: {kakaoCode}</p>}
            </div>
        </div>
    );
}
