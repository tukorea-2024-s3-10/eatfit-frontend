/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://eatfit.com", // ✅ 실제 배포 도메인으로 수정
    generateRobotsTxt: true, // ✅ robots.txt도 자동 생성할지 여부
    sitemapSize: 7000,
    changefreq: "daily",
    priority: 0.7,
};
