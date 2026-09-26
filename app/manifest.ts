import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BLACKCARMINE",
    short_name: "BLACKCARMINE",
    description:
      "BLACKCARMINE is a full-service digital agency engineering web platforms, mobile apps, SaaS, brand systems and AI-driven products with cinematic craft.",
    start_url: "/",
    display: "standalone",
    background_color: "#08070a",
    theme_color: "#08070a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
