// lib/axios.ts
import axios from "axios";

// ✅ axios 인스턴스를 생성함 (모든 API 요청은 이걸 사용함)
const instance = axios.create({
    baseURL: "https://api.eatfit.site", // 🔹 API URL 직접 입력
    headers: {
        "Content-Type": "application/json", // 🔹 기본적으로 JSON 형식으로 보냄
    },
    withCredentials: true, // 🔹 쿠키를 포함하여 요청
});

// ✅ 요청을 보내기 전에 실행되는 interceptor 설정
instance.interceptors.request.use(
    config => {
        // 🔹 브라우저 환경일 때만 처리
        if (typeof window !== "undefined") {
            // 쿠키에서 refresh_token 가져오기
            const cookies = document.cookie.split(";");
            const refreshTokenCookie = cookies.find(cookie =>
                cookie.trim().startsWith("refresh_token=")
            );
            if (refreshTokenCookie) {
                const refreshToken = refreshTokenCookie.split("=")[1];
                config.headers.Authorization = `Bearer ${refreshToken}`;
            }
        }

        return config;
    },
    error => {
        return Promise.reject(error); // 🔹 에러가 발생하면 그대로 던짐
    }
);

export default instance; // ✅ 인스턴스를 export하여 다른 파일에서 사용
