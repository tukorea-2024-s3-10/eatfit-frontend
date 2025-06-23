"use client";

import { Box, Typography, Avatar } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProfileSetupStore } from "@/app/store/useProfileSetupStore";

const MyPage_ProfileCard = () => {
  const router = useRouter();

  // ✅ Zustand에서 상태 불러오기
  const nickname = useProfileSetupStore((state) => state.nickname);
  const age = useProfileSetupStore((state) => state.age);
  const height = useProfileSetupStore((state) => state.height);
  const weight = useProfileSetupStore((state) => state.weight);
  const purpose = useProfileSetupStore((state) => state.purpose);
  const diseases = useProfileSetupStore((state) => state.diseases);
  const profileImage = useProfileSetupStore((state) => state.profileImage); // ✅ profileImage 사용

  // ✅ 목표 이미지 매핑
  const purposeImageMap: Record<string, string> = {
    헬스: "/perpose_helth.svg",
    다이어트: "/perpose_diet.svg",
    유지: "/perpose_normal.svg",
  };

  const resolvedProfileImage = profileImage?.trim()
    ? profileImage
    : "/default-profile.png"; // 기본 프로필 이미지 처리

  const purposeImage = purpose
    ? purposeImageMap[purpose] || purposeImageMap["유지"]
    : purposeImageMap["유지"];

  return (
    <Box px={3} pt={2}>
      {/* 프로필 정보 */}
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={resolvedProfileImage} sx={{ width: 56, height: 56 }} />
        <Box>
          <Typography fontWeight={600}>{nickname || "익명 사용자"}</Typography>
          <Typography fontSize={13} color="#666">
            만 {age || "--"}세 · {height || "--"}cm · {weight || "--"}kg
          </Typography>
        </Box>
      </Box>

      {/* 목표 + 질병 정보 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
        px={2}
        py={2}
        border="1px solid #E0E0E0"
        borderRadius="8px"
      >
        {/* 목표 */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Image src={purposeImage} alt="목표 이미지" width={32} height={32} />
          <Typography mt={0.5} fontSize={13} color="#444">
            {purpose ?? "목표 미설정"} 목적
          </Typography>
        </Box>

        {/* 질병 */}
        <Box textAlign="right">
          <Typography fontSize={12} color="#999">
            가지고 있는 질병
          </Typography>
          <Typography fontSize={13} fontWeight={500} mt={0.5}>
            {diseases.length > 0 ? diseases.join(" ") : "없음"}
          </Typography>
        </Box>
      </Box>

      {/* 수정 버튼 */}
      <Box mt={1.5} textAlign="right">
        <Typography
          fontSize={12}
          fontWeight={400}
          color="#2F3033"
          sx={{ cursor: "pointer" }}
          onClick={() => router.push("/profile/edit")}
        >
          정보 수정하기 &gt;
        </Typography>
      </Box>
    </Box>
  );
};

export default MyPage_ProfileCard;
