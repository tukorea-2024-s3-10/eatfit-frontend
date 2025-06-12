import axiosInstance from "@/app/lib/axiosInstance";
import { useProfileSetupStore } from "../store/useProfileSetupStore";

export const fetchUserProfile = async () => {
    try {
        const res = await axiosInstance.get("/api/core/users/profile");
        const data = res.data.data;

        const {
            name,
            gender,
            birthYear,
            height,
            weight,
            targetWeight,
            goalCategory,
            disease,
        } = data;

        const now = new Date().getFullYear();
        const age = (now - birthYear).toString();

        const {
            setNickname,
            setGender,
            setAge,
            setHeight,
            setWeight,
            setTargetWeight,
            setPurpose,
            setDiseases,
        } = useProfileSetupStore.getState();

        setNickname(name);
        setGender(gender);
        setAge(age);
        setHeight(height.toString());
        setWeight(weight.toString());
        setTargetWeight(targetWeight.toString());
        setPurpose(goalCategory);
        setDiseases(disease ? [disease] : []);

        console.log("✅ 유저 프로필 불러오기 성공:", {
            name,
            gender,
            age,
            height,
            weight,
            targetWeight,
            goalCategory,
            disease,
        });
    } catch (err) {
        console.error("❌ 유저 프로필 불러오기 실패", err);
    }
};
