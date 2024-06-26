/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // توجيه الطلبات إلى API فقط إذا كانت تبدأ بـ /api
        destination: "https://gruafahim.pythonanywhere.com/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  images: {
    domains: ['gruafahim.pythonanywhere.com'],
  },
  siteUrl: 'https://3aqarat.vercel.app',
  generateRobotsTxt: true,
  
  
};

export default nextConfig;
