import axios, { AxiosRequestConfig, AxiosHeaders } from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

const instance = axios.create({
    baseURL: "https://api.eatfit.site",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

instance.interceptors.request.use(
    async config => {
        if (typeof window !== "undefined") {
            let accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                try {
                    const res = await axios.post(
                        "https://api.eatfit.site/api/core/auth/reissue",
                        {},
                        {
                            withCredentials: true, // 쿠키 포함 필수
                        }
                    );

                    const authHeader =
                        res.headers["authorization"] ||
                        res.headers["Authorization"];

                    if (authHeader?.startsWith("Bearer ")) {
                        const newToken = authHeader.split("Bearer ")[1];
                        localStorage.setItem("accessToken", newToken);
                        accessToken = newToken;
                    } else {
                        throw new Error("Authorization 헤더 형식 오류");
                    }
                } catch (error) {
                    console.error(
                        "❌ accessToken 재발급 실패 (요청 인터셉터)",
                        error
                    );
                    localStorage.removeItem("accessToken");
                    window.location.href = "/login";  // 여기에 로그인 페이지 이동 추가
                    throw error;
                }
            }

            if (accessToken) {
                config.headers = new AxiosHeaders({
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`,
                });
            }
        }

        return config;
    },
    error => Promise.reject(error)
);
instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(
                    "https://api.eatfit.site/api/core/auth/reissue",
                    {},
                    {
                        withCredentials: true,
                    }
                );

                const authHeader =
                    res.headers["authorization"] ||
                    res.headers["Authorization"];

                if (authHeader?.startsWith("Bearer ")) {
                    const newToken = authHeader.split("Bearer ")[1];
                    localStorage.setItem("accessToken", newToken);

                    // 기존 요청에 새 토큰 적용
                    originalRequest.headers = {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${newToken}`,
                    };

                    return instance(originalRequest);
                } else {
                    console.error("❌ 재발급 응답에 Authorization 헤더가 없습니다.");
                    // 토큰 파싱 실패 시 로그아웃 처리
                    localStorage.removeItem("accessToken");
                    window.location.href = "/login";
                    return Promise.reject(new Error("재로그인이 필요합니다."));
                }
            } catch (reissueError) {
                console.error("❌ accessToken 재발급 요청 실패", reissueError);
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
                return Promise.reject(reissueError);
            }
        }

        return Promise.reject(error);
    }
);


export default instance;
