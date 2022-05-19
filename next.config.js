/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.trustedtours.com",
      "themiamiguide.com",
      "res.cloudinary.com",
      "cdn.aarp.net",
      "upload.wikimedia.org",
    ],
  },
};

module.exports = nextConfig;
