import Career from "@/pages/genral/contact/Career";
import React from "react";
export async function generateMetadata() {
  const res = await fetch(
    "https://www.airbuzzintl.com/airbuzz/Service/getmetaTitle",
    {
      cache: "no-store",
    }
  );

  const meta = await res.json();

  const description =
    "Get in touch with AirBuzz International for reliable air cargo and logistics services to and from the UAE. Contact us today for expert support and customized shipping solutions.";

  return {
    title: "Contact AirBuzz International | UAE Air Cargo & Logistics Support",
    description,
    canonical: "https://www.airbuzzintl.com/Contact/Careers",
    metadataBase: new URL("https://www.airbuzzintl.com"),
    alternates: {
      canonical: `https://www.airbuzzintl.com/Contact/Careers`,
    },
  };
}

export default function page() {
  return (
    <div>
      {" "}
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
      <Career />
    </div>
  );
}
