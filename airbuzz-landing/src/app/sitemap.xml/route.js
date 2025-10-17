export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import axios from "axios";

const SITE_URL = "https://airbuzzintl.com";

export async function GET() {
  const fetchSlugs = async () => {
    try {
      const response = await axios.get(
        `https://www.airbuzzintl.com/airbuzz/Landing/getSlugs?ts=${Date.now()}`
      );
      return response.status === 200 ? response.data : [];
    } catch (error) {
      console.error("Failed to fetch slugs for sitemap:", error);
      return [];
    }
  };

  const slugs = await fetchSlugs();

  const staticRoutes = [
    "/",
    "/Services/International",
    "/Services/Domestic",
    "/About",
    "/Support/FAQ",
    "/Support/Downloads",
    "/Contact/Careers",
    "/Contact/Franchise",
    "/Articles",
  ];

  const urls = [
    // Static URLs
    ...staticRoutes.map((path) => ({
      loc: `${SITE_URL}${path}`,
      changefreq: "weekly",
      priority: path === "/" ? "1.0" : "0.8",
    })),

    // Dynamic URLs
    ...slugs.map((item) => ({
      loc: `${SITE_URL}/${item.slug}`,
      changefreq: "weekly",
      priority: "0.8",
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      ({ loc, changefreq, priority }) => `
    <url>
      <loc>${loc}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Expires: "0",
      Pragma: "no-cache",
    },
  });
}
