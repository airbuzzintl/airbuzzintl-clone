import "./globals.css";
import ClientProviders from "@/client/ClientProviders";
import Script from "next/script";
import "../styles/animation.css";
import "../styles/index.css";
import ErrorSuppressor from "../error-suppressor";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        id="json-ld-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: "AirBuzz Dubai",
                url: "https://www.airbuzzintl.com",
                potentialAction: {
                  "@type": "SearchAction",
                  target:
                    "https://www.airbuzzintl.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": "Organization",
                name: "AirBuzz",
                url: "https://www.airbuzzintl.com",
                logo: "https://www.airbuzzintl.com/logo.png",
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+971-XXX-XXXX",
                  contactType: "customer service",
                },
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
          }),
        }}
      />

      <body>
        <ErrorSuppressor />
        <ClientProviders>
          <div>{children}</div>
        </ClientProviders>
      </body>
    </html>
  );
}
