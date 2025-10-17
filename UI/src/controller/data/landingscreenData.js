import { images } from "../constant/images";

export const footerContent = {
  footerLogo: images.footerLogo,
  footerDiscription: `Airbuzz international LLC provides comprehensive logistics and
              transportation solution to customers`,
  footerList: [

    {
      heading: "Login",
      links: [
        {
          title: "Admin Login",
          path: "/AdminLogin"
        }
      ]

    },
    {
      heading: "About us",
      links: [
        {
          title: "About Company profile",
          path: "/About",
        },
      ],
    },
    {
      heading: "Services",
      links: [
        {
          title: "International",
          path: "/Services/International",
        },
        {
          title: "Domestic",
          path: "/Services/Domestic",
        },
      ],
    },
    {
      heading: "Contact us",
      links: [
        {
          title: "Careers",
          path: "/Contact/Careers",
        },
        {
          title: "Franchise",
          path: "/Contact/Franchise",
        },
      ],
    },
    {
      heading: "Support",
      links: [
        {
          title: "FAQ",
          path: "/Support/FAQ",
        },
        {
          title: "Documents",
          path: "/Support/Downloads",
        },
      ],
    },
    {
      heading: "Location",
    },
  ],
  policies: [
    {
      name: "Privacy Policy",
      path: "/",
    },
    {
      name: "Security Policy",
      path: "/",
    },
    {
      name: "Terms of Use",
      path: "/",
    },
  ],
};
