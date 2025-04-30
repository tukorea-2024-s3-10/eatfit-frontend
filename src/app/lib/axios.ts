// lib/axios.ts
import axios from "axios";

// ✅ axios 인스턴스 생성
const instance = axios.create({
    baseURL: "https://api.eatfit.site",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// ✅ 요청 전 interceptor: accessToken 없으면 재발급 시도
instance.interceptors.request.use(
    async config => {
        if (typeof window !== "undefined") {
            let accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                console.log("🔄 accessToken 없음 → 재발급 요청 시도");

                try {
                    const response = await axios.post(
                        "https://api.eatfit.site/api/core/auth/reissue",
                        {},
                        { withCredentials: true }
                    );

                    const authHeader =
                        response.headers["authorization"] ||
                        response.headers["Authorization"];
                    console.log("📦 받은 Authorization 헤더:", authHeader);

                    if (authHeader && authHeader.startsWith("Bearer ")) {
                        const extractedToken = authHeader.split("Bearer ")[1];
                        console.log("✅ 추출한 accessToken:", extractedToken);
                        localStorage.setItem("accessToken", extractedToken);
                        accessToken = extractedToken;
                    } else {
                        throw new Error("Authorization 헤더 형식 오류");
                    }
                } catch (error) {
                    console.error("❌ accessToken 재발급 실패:", error);
                    throw error;
                }
            }

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    error => Promise.reject(error)
);

// ✅ 응답 후 interceptor: 401 발생 시 토큰 재발급 + 요청 재시도
instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            error.response?.data === "access token expired" &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const response = await axios.post(
                    "https://api.eatfit.site/api/core/auth/reissue",
                    {},
                    { withCredentials: true }
                );

                const authHeader =
                    response.headers["authorization"] ||
                    response.headers["Authorization"];

                if (authHeader && authHeader.startsWith("Bearer ")) {
                    const newToken = authHeader.split("Bearer ")[1];
                    localStorage.setItem("accessToken", newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    console.log("✅ 토큰 재발급 후 요청 재시도");

                    return instance(originalRequest); // ✅ 재요청
                } else {
                    throw new Error("Authorization 헤더 형식 오류");
                }
            } catch (reissueError) {
                console.error("🔒 재발급 실패 → 로그아웃 처리 필요");
                return Promise.reject(reissueError);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
