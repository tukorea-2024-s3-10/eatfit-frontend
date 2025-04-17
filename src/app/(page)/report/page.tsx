import React from "react";
import Report_Header from "@/app/components/report/Report_Header";
import Report_Datagram from "@/app/components/report/Report_Datagram";
import Report_AnalysisCard from "@/app/components/report/Report_AnalysisCard";
import Report_ConfirmButton from "@/app/components/report/Report_ConfirmButton";
const page = () => {
    return (
        <div>
            <Report_Header />
            <Report_Datagram />
            <Report_AnalysisCard
                keyword="단백질"
                description="단백질이 풍부한 닭가슴살, 연어, 두부 같은 음식을 추천드려요!"
                imageSrc="/report_protein.svg"
            />
            <Report_ConfirmButton />
        </div>
    );
};

export default page;
