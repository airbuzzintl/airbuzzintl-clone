import Articles from "@/pages/genral/articles";
import React from "react";
export async function generateMetadata({ params }) {
  const url = "https://www.airbuzzintl.com/Articles";
  const pageTitle = "Latest Articles | Airbuzz Express";
  const pageDescription =
    "Explore the latest articles and insights on Airbuzz Express. Stay updated with trending topics and in-depth analyses.";
  const imageUrl =
    "https://www.airbuzzintl.com/static/media/Blogs.ae9dad8b8dd5701702c4.png";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Airbuzz Express",
        url: "https://www.airbuzzintl.com",
        logo: "https://www.airbuzzintl.com/logo.png",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.airbuzzintl.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Articles",
            item: url,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: pageTitle,
        description: pageDescription,
        url: url,
        image: imageUrl,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: [],
        },
      },
    ],
  };

  return {
    title: pageTitle,
    description: pageDescription,
    robots: "index, follow",
    author: "Airbuzz Express",
    viewport: "width=device-width, initial-scale=1.0",
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: url,
      image: imageUrl,
      siteName: "Airbuzz Express",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      image: imageUrl,
      site: "@airbuzzintl",
      creator: "@airbuzzintl",
    },
    canonical: url,
    metadataBase: new URL("https://www.airbuzzintl.com"),
    alternates: {
      canonical: url,
    },
    structuredData,
    metaQueries: {
      keyword: "latest articles",
      keywordInTitle: pageTitle.includes("latest articles"),
      keywordInHeading: true,
    },
    seoOptimizations: {
      imageAltText: "Latest Articles Thumbnail",
      dwellTimeOptimization: true,
      featuredSnippetOptimization: true,
    },
  };
}

async function page() {
  return <Articles />;
}
export default page;
