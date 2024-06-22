/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: [
    {
      source: "/api/:path*",
      destination: "https://gruafahim.pythonanywhere.com/:path*",
    },
  ],
};

export default nextConfig;
