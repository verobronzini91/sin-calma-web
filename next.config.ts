import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    // Fotos de productos del marketplace (og:image de calmashoes.com / Tiendanube).
    // Debe coincidir con ALLOWED_HOSTS en src/lib/og-image.ts.
    remotePatterns: [
      { protocol: "https", hostname: "**.mitiendanube.com" },
      { protocol: "https", hostname: "calmashoes.com" },
      // Posts de Instagram (media_url / thumbnail_url de la API oficial).
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
};

export default nextConfig;
