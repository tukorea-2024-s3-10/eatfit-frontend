"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface ProfileSetupSubmitProps {
    isValid: boolean;
    onSubmit: () => void;
    buttonText?: string;
    redirectTo?: string;
}

const ProfileSetupSubmit = ({
    isValid,
    onSubmit,
    buttonText,
    redirectTo,
}: ProfileSetupSubmitProps) => {
    const router = useRouter();
    const handleSubmit = () => {
        onSubmit?.(); // ?. 존재한다면 뒤를 실행()
        router.push(redirectTo || "/profile/nutritionPlan");
    };
    return (
        <div className="w-full flex justify-center py-6">
            <Button
                onClick={handleSubmit}
                disabled={!isValid}
                variant="outlined"
                sx={{
                    width: "321px",
                    height: "60px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: isValid ? "#15B493" : "#C4C4C4",
                    borderColor: isValid ? "#15B493" : "#E0E0E0",
                    backgroundColor: "#fff",
                    "&:hover": {
                        backgroundColor: "#F5F5FD",
                        borderColor: "#15B493",
                    },
                }}
            >
                {buttonText ?? "설정하기"}
            </Button>
        </div>
    );
};

export default ProfileSetupSubmit;
