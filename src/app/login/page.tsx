"use client";
import Image from "next/image";

const page = () => {
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
        <div className="h-screen flex justify-center items-center flex-col bg-white px-6">
            <h2 className="text-lg font-semibold">로그인</h2>
            <h1 className="mt-16 text-2xl font-bold text-center text-black">
                이 모든 서비스를
                <br />
                누리러 가볼까요?
            </h1>
            <p className="text-sm text-[#555555] text-center mt-4">
                간편로그인으로
                <br />
                쉽게 로그인하세요!
            </p>
            <Image
                src={"/login.svg"}
                alt="로그인 이미지지"
                width={250}
                height={250}
                className="mt-8"
            ></Image>

            {/* 카카오&네이버 로그인 버튼 */}
            <button
                onClick={handleKakaoLogin}
                className="flex justify-center items-center mt-10 w-full max-w-md border-2 border-[#9BE8D8] text-black font-medium h-16 rounded-2xl mx-11 transition-all duration-300 hover:bg-[#FFE812] hover:opacity-90"
            >
                <Image
                    src={"/login_kakao.svg"}
                    alt="카카오 로그인 이미지"
                    width={24}
                    height={24}
                    className="mr-2"
                />
                카카오 로그인
            </button>
            <button
                onClick={handleNaverLogin}
                className="flex justify-center items-center w-full max-w-md border-2 border-[#9BE8D8] text-black font-medium h-16 rounded-2xl mx-11 mt-4 transition-all duration-300 hover:bg-[#34A853] hover:text-white hover:opacity-90"
            >
                <Image
                    src={"/login_naver.svg"}
                    alt="네이버 로그인 이미지"
                    width={24}
                    height={24}
                    className="mr-2"
                    priority={true}
                />
                네이버 로그인
            </button>
        </div>
    );
};

export default page;
