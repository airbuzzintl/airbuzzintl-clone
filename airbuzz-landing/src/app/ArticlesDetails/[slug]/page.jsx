import ArticlesDetails from "@/pages/genral/articles/ArticlesDetails";
import React from "react";
import { getarticle } from "./layout";

export async function generateMetadata({ params }) {
  if (!params?.slug) return {};

  const slug = params.slug;
  const newdata = await getarticle(slug);

  if (!newdata || newdata.length === 0) return {};

  const data = newdata[0];
  const plainTextDescription = data.description.replace(/<[^>]+>/g, "");
  const url = `https://www.airbuzzintl.com/ArticlesDetails/${data.slug}`;
  const imageUrl = `https://www.airbuzzintl.com/airbuzz/Docs/Landing/${data.img}`;

  return {
    title: `${data.title} | Airbuzz`,
    description: plainTextDescription,
    robots: "index, follow",
    author: "Airbuzz",
    viewport: "width=device-width, initial-scale=1.0",
    openGraph: {
      title: `${data.title} | Airbuzz`,
      description: plainTextDescription,
      type: "article",
      url: url,
      image: imageUrl,
      siteName: "Airbuzz",
      publishedTime: data.date,
      modifiedTime: data.date,
      author: "Airbuzz",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} | Airbuzz`,
      description: plainTextDescription,
      image: imageUrl,
      site: "@Airbuzz",
      creator: "@Airbuzz",
    },
    canonical: url,
    metadataBase: new URL("https://www.airbuzzintl.com"),
    alternates: {
      canonical: `/ArticlesDetails/${data.slug}`,
    },
    // structuredData: structuredData, // ✅ Server-side structured data
  };
}

async function Page({ params }) {
  const { slug } = await params;
  const data = await getarticle(slug);

  if (!data || data.length === 0) {
    return <p>Article not found</p>;
  }

  const article = data[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Airbuzz",
            url: "https://www.airbuzzintl.com",
            logo: "https://www.airbuzzintl.com/static/media/Airbuzz-logo.45ddbb460ea7f17c28b2.png",
            // contactPoint: [
            //   {
            //     "@type": "ContactPoint",
            //     telephone: "+1-800-555-1234",
            //     contactType: "customer service",
            //     areaServed: "US",
            //     availableLanguage: ["English", "Spanish"],
            //   },
            // ],
            sameAs: [
              "https://www.facebook.com/airbuzz.ae",
              "https://www.instagram.com/airbuzz.ae/",
              "https://www.linkedin.com/company/airbuzz-ae/",
              "https://youtube.com/@airbuzzintl?si=EYcD8TNH20J_oEWF",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.airbuzzintl.com/ArticlesDetails/${article.slug}`,
            },
            headline: article.title,
            description: article.description?.replace(/<[^>]+>/g, ""),
            image: `https://www.airbuzzintl.com/airbuzz/Docs/Landing/${article.img}`,
            author: {
              "@type": "Organization",
              name: "Airbuzz",
            },
            publisher: {
              "@type": "Organization",
              name: "Airbuzz",
              logo: {
                "@type": "ImageObject",
                url: "https://www.airbuzzintl.com/static/media/Airbuzz-logo.45ddbb460ea7f17c28b2.png",
              },
            },
          }),
        }}
      />
      <ArticlesDetails data={article} />
    </>
  );
}

export default Page;
