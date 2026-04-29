/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/kullanim-kosullari",
        destination: "/terms-and-conditions",
      },
      {
        source: "/kullanım-koşulları",
        destination: "/terms-and-conditions",
      },
      {
        source: "/gizlilik-politikasi",
        destination: "/privacy-policy",
      },
      {
        source: "/gizlilik-politikası",
        destination: "/privacy-policy",
      },
    ];
  },
};

export default nextConfig;
