"use client";

import { useEffect } from "react";

export default function ErrorSuppressor() {
  useEffect(() => {
    // Suppress Next.js overlay errors
    window.addEventListener("error", (e) => {
      e.preventDefault(); // Prevents error from showing
    });

    window.addEventListener("unhandledrejection", (e) => {
      e.preventDefault(); // Prevents promise rejection errors
    });
  }, []);

  return null; // No UI needed
}