/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://galvazinc.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/admin", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    ],
  },
};
