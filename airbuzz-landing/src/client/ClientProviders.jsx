"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SkyExTheme } from "@/controller/constant";
import BackDropLoading from "@/components/elements/BackDropLoading";
import { SideNavigationBar, TopNavigationBar } from "@/layouts/general";
import React, { createContext, useState } from "react";
import { LocationProvider } from "@/controller/constant/LocationContext";
import { ToastContainer } from "react-toastify";

export const LoadContext = createContext();
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/layouts/general/Footer"), {
  ssr: false,
});
export default function ClientProviders({ children }) {
  const [isLoading, setLoading] = useState(false);

  return (
    <React.StrictMode>
      <LocationProvider>
        <LoadContext.Provider value={{ setLoading, isLoading }}>
          <ThemeProvider theme={SkyExTheme}>
            <CssBaseline />
            <BackDropLoading />
            {/* <SideNavigationBar /> */}
            <TopNavigationBar />
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              limit={3}
              pauseOnHover={false}
              theme="light"
              style={{ padding: "1%" }}
            />
            {children}
            <Footer />
          </ThemeProvider>
        </LoadContext.Provider>
      </LocationProvider>
    </React.StrictMode>
  );
}
