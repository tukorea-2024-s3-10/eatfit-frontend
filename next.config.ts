import type { NextConfig } from "next";
import withPWA from "next-pwa";

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true, // React의 엄격 모드를 활성화 (개발 중 에러 발견에 도움)
    // Next.js 15부터는 swcMinify가 기본 적용돼서 별도 필요없음음
    // swcMinify: true, // SWC 기반 코드 압축 활성화 (빌드 성능 향상)
};

export default withPWA({
    dest: "public", // service-worker 파일이 생성될 위치
    register: true, // 클라이언트에서 자동으로 서비스 워커 등록
    skipWaiting: true, // 업데이트된 서비스 워커가 즉시 적용되도록 함 (기존 것 무시)
})(nextConfig);
