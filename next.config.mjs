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
};

export default nextConfig;
