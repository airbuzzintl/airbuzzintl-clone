import LandingScreen from "@/pages/genral/landing";

export async function generateMetadata() {
  const res = await fetch(
    "https://www.airbuzzintl.com/airbuzz/Service/getmetaTitle",
    {
      cache: "no-store",
    }
  );

  const meta = await res.json();
  const title =
    meta?.[0]?.title ||
    "AirBuzz Dubai | Air Freight Shipping | Best Air Cargo Rates UAE";
  const description =
    meta?.[0]?.description ||
    "UAE Air Freight Forwarder. Specialist in China Imports/Exports. Customs Clearance. Fast &amp; Reliable International Cargo Services. Get Free Quote!";
  return {
    title,
    description,
    title: "AirBuzz Dubai | Air Freight Shipping | Best Air Cargo Rates UAE",
    description:
      "UAE Air Freight Forwarder. Specialist in China Imports/Exports. Customs Clearance. Fast & Reliable International Cargo Services. Get Free Quote!",
    keywords:
      "AirBuzz Logistics, AirBuzz, Logistics, airbuzzintl, airbuzzexpress, CMS, Air Freight, UAE, Customs Clearance",
    robots: "index, follow",
    author: "Airbuzz",
    viewport: "width=device-width, initial-scale=1.0",
    themeColor: "#000000",
    openGraph: {
      title,
      description,
      url: "https://www.airbuzzintl.com",
      image: "https://www.airbuzzintl.com/favicon.ico",
      type: "website",
      siteName: "AirBuzz Dubai",
    },
    twitter: {
      card: "summary_large_image",
      title: "AirBuzz Dubai | Air Freight Forwarder UAE",
      description:
        "Fast & Reliable Air Freight Forwarding Services in UAE. Get a Free Quote Today!",
      image: "https://www.airbuzzintl.com/favicon.ico",
      site: "@Airbuzz",
      creator: "@Airbuzz",
    },
    alternates: {
      canonical: "https://www.airbuzzintl.com/",
      languages: {
        en: "https://www.airbuzzintl.com/en/",
        ar: "https://www.airbuzzintl.com/ar/",
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/favicon.ico",
    },
    manifest: "/manifest.json",
    verification: {
      google: "4oJ5rvTRKPK3t9n0HiMJE6yu9ueugxDv7iZaUXY84lQ",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "AirBuzz",
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
              name: "Services",
              item: "https://www.airbuzzintl.com/services",
            },
          ],
        },
      ],
    },
  };
}

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
     <script async src="https://www.googletagmanager.com/gtag/js?id=G-MKWTFZNC8H"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-MKWTFZNC8H');
</script>
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
      <LandingScreen />
    </div>
  );
}
