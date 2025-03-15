"use client";
import Image from "next/image";
import { motion } from "framer-motion";
const BigLogo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }} // 시작 애니메이션 (투명하고 작게)
            animate={{ opacity: 1, scale: 1 }} // 실행 애니메이션 (점점 나타남)
            transition={{ duration: 1.5, ease: "easeOut" }} // 부드럽게 1초 동안 실행
            className="h-screen flex items-center justify-center text-center flex-col"
        >
            <Image
                src="/logo.svg"
                alt="로고"
                width={140}
                height={140}
                priority
            />
            <motion.h1
                initial={{ opacity: 0, y: 10 }} // 살짝 아래에서 나타남
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }} // 지연 효과
                className="font-cafe24 text-[#15B493] text-2xl"
            >
                Eat Fit
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }} // 더 늦게 나타남
                className="text-[#555555] text-sm mt-1"
            >
                건강한 삶을 위한 스마트한 도우미
            </motion.p>
        </motion.div>
    );
};

export default BigLogo;
