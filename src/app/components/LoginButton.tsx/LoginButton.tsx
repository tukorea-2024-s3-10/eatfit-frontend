"use client";

interface LoginButtonProps {
    sns: "naver" | "kakao";
    onClick: () => void;
}

const LoginButton = ({ sns, onClick }: LoginButtonProps) => {
    const styles = {
        naver: "bg-green-500 hover:bg-green-600 text-white",
        kakao: "bg-yellow-500 hover:bg-yellow-600 text-black",
    };

    return (
        <button
            className={`my-4 w-full p-3 font-bold rounded-md ${styles[sns]}`}
            onClick={onClick}
        >
            {sns === "naver" ? "NAVER" : "KAKAO"}
        </button>
    );
};

export default LoginButton;
