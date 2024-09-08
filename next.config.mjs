/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "avatar.vercel.sh",
                port: "",
            },
            {
                hostname: "utfs.io",
                port: "",
            },
            {
                hostname: "nvklcnxjewiqlubfmtab.supabase.co",
                protocol: "https",
                port: "",
            },
            {
                hostname: "dummyimage.com",
                protocol: "https",
                port: "",
            },
            {
                hostname: "lh3.googleusercontent.com",
                protocol: "https",
                port: "",
            },
        ]
    },
    


};

export default nextConfig;
