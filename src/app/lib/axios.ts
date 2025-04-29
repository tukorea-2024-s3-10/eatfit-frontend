// lib/axios.ts
import axios from "axios";

// ✅ axios 인스턴스 생성
const instance = axios.create({
    baseURL: "https://api.eatfit.site", // 🔹 API 서버 기본 URL
    headers: {
        "Content-Type": "application/json", // 🔹 모든 요청은 JSON 포맷
    },
    withCredentials: true, // 🔹 쿠키 (refresh_token) 포함하여 요청
});

// ✅ 요청 보내기 전에 실행되는 interceptor
instance.interceptors.request.use(
    async config => {
        if (typeof window !== "undefined") {
            let accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                console.log("🔄 accessToken 없음 → 재발급 요청 시도");

                try {
                    // ✅ accessToken 재발급 요청
                    const response = await axios.post(
                        "https://api.eatfit.site/api/core/auth/reissue",
                        {},
                        { withCredentials: true }
                    );

                    // ✅ 서버 응답에서 Authorization 헤더 추출
                    const authHeader =
                        response.headers["authorization"] ||
                        response.headers["Authorization"]; // 소문자/대문자 모두 대응
                    console.log("📦 받은 Authorization 헤더:", authHeader);

                    if (authHeader && authHeader.startsWith("Bearer ")) {
                        // ✅ 콜론 ❌, 공백 ✅
                        const extractedToken = authHeader.split("Bearer ")[1]; // 🔥 "Bearer " 다음 문자열 추출
                        console.log("✅ 추출한 accessToken:", extractedToken);

                        localStorage.setItem("accessToken", extractedToken); // ✅ 저장
                        accessToken = extractedToken; // 🔥 accessToken 메모리 업데이트
                    } else {
                        console.error(
                            "❌ Authorization 헤더가 없거나 형식이 올바르지 않습니다."
                        );
                        throw new Error("토큰 재발급 실패");
                    }
                } catch (error) {
                    console.error("❌ accessToken 재발급 실패:", error);
                    throw error; // 에러 다시 던져서 요청 자체를 막는다
                }
            }

            // ✅ 최종적으로 accessToken이 있으면 Authorization 헤더 세팅
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance; // ✅ 기본 export
