"use client";
import IntroLogo from "@/app/components/common/IntroLogo/IntroLogo";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/onboarding");
        }, 2500);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="-translate-y-8">
                <IntroLogo />
            </div>
        </div>
    );
};

export default Page;
