"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Page = () => {
    const router = useRouter();

    // ✅ 2.5초 뒤 자동 라우팅
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/record/meal/complete"); // 완료 페이지로 이동
        }, 2500);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center justify-center h-screen bg-white text-center"
        >
            {/* ✅ 로딩 이미지 */}
            <Image
                src="/RecordLoading_Logo.svg"
                alt="식단 등록 로딩"
                width={238}
                height={217}
                priority
            />

            {/* ✅ 안내 문구 */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="text-[#2F3033] font-semibold text-base mt-6 leading-relaxed"
            >
                등록하고 있어요 <br />
                조금만 기다려주세요
            </motion.p>
        </motion.div>
    );
};

export default Page;
