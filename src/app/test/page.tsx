"use client"; // Next.js 클라이언트 컴포넌트 지정

import { useState } from "react";

const API_BASE_URL = "http://localhost:8080"; // 백엔드 API 주소

// ✅ 백엔드 응답 타입 정의
type UserProfile = {
    id: number;
    name: string;
    email: string;
};

// ✅ 액세스 토큰 포함 API 요청 함수
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch(API_BASE_URL + url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.status === 401) {
        console.log("🔄 액세스 토큰 만료 → 리프레시 토큰 사용하여 갱신");
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
            return fetch(API_BASE_URL + url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${newAccessToken}`,
                },
            });
        } else {
            logout();
            return null;
        }
    }

    return response;
};

// ✅ 리프레시 토큰으로 새 액세스 토큰 받기
const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            throw new Error("토큰 갱신 실패");
        }

        const data = await response.json();
        const newAccessToken = data.accessToken;

        // ✅ 새 액세스 토큰 저장
        localStorage.setItem("accessToken", newAccessToken);
        console.log("✅ 새 액세스 토큰 발급 완료!");
        return newAccessToken;
    } catch (error) {
        console.error("🚨 토큰 갱신 오류:", error);
        return null;
    }
};

// ❌ 로그아웃 처리
const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // 로그인 페이지로 이동
};

// ✅ 테스트 페이지 컴포넌트
export default function TestPage() {
    const [responseData, setResponseData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleButtonClick = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchWithAuth("/user/profile");

            if (!response) {
                throw new Error("로그인 필요");
            }

            if (!response.ok) {
                throw new Error(`서버 오류: ${response.status}`);
            }

            const data: UserProfile = await response.json(); // ✅ 명확한 타입 지정
            setResponseData(data);
        } catch (err: unknown) {
            // ✅ any 대신 unknown 사용
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("알 수 없는 오류 발생");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-xl font-bold mb-4">🛠️ API 테스트 페이지</h1>
            <button
                onClick={handleButtonClick}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
                {loading ? "로딩 중..." : "백엔드 요청 보내기"}
            </button>

            {error && <p className="text-red-500 mt-3">❌ 오류: {error}</p>}
            {responseData && (
                <div className="mt-4 p-3 bg-gray-100 rounded-md">
                    <h3 className="font-bold">✅ 서버 응답:</h3>
                    <pre className="text-sm">
                        {JSON.stringify(responseData, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
