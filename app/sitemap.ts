import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/data";

const SITE_URL = "https://blackcarmine.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/work",
    ...PROJECTS.map((p) => `/work/${p.slug}`),
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/work" ? 0.8 : 0.6,
  }));
}
