/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mzwluaqrsonukztloqjh.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabinImages/**",
      },
    ],
  },typescript:{ignoreBuildErrors:true}
};

export default nextConfig;
