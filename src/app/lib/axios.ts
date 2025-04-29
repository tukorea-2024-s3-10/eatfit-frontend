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

// ✅ 요청을 보내기 전에 실행되는 interceptor
instance.interceptors.request.use(
    async config => {
        if (typeof window !== "undefined") {
            let accessToken = localStorage.getItem("accessToken"); // ✅ 저장된 accessToken 가져오기

            // ✅ accessToken이 없으면 refresh_token으로 재발급 시도
            if (!accessToken) {
                console.log("🔄 accessToken 없음 → 재발급 요청 시도");

                const cookies = document.cookie.split(";");
                const refreshTokenCookie = cookies.find(cookie =>
                    cookie.trim().startsWith("refresh_token=")
                );

                if (refreshTokenCookie) {
                    const refreshToken = refreshTokenCookie.split("=")[1];

                    try {
                        // ✅ accessToken 재발급 요청
                        const response = await axios.post(
                            "https://api.eatfit.site/api/core/auth/reissue",
                            { refreshToken },
                            { withCredentials: true }
                        );

                        // ✅ 응답 헤더에서 Authorization 추출
                        const authHeader = response.headers.authorization;
                        console.log("📦 받은 Authorization 헤더:", authHeader);

                        if (authHeader && authHeader.startsWith("Bearer ")) {
                            const extractedToken =
                                authHeader.split("Bearer ")[1];
                            console.log(
                                "✅ 추출한 accessToken:",
                                extractedToken
                            );

                            localStorage.setItem("accessToken", extractedToken);
                            accessToken = extractedToken; // 🔥 갱신된 accessToken을 메모리에도 업데이트
                        } else {
                            console.error(
                                "❌ Authorization 헤더 형식이 올바르지 않습니다."
                            );
                            throw new Error("토큰 재발급 실패");
                        }
                    } catch (error) {
                        console.error("❌ accessToken 재발급 실패:", error);
                        // (선택) 재발급 실패 시 추가 조치: 예를 들어 로그인 페이지로 강제 이동
                    }
                } else {
                    console.error("❌ refresh_token 쿠키 없음");
                    throw new Error("리프레시 토큰이 존재하지 않습니다.");
                }
            }

            // ✅ 최종적으로 accessToken이 존재하면 Authorization 헤더 추가
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

export default instance; // ✅ 인스턴스를 export하여
