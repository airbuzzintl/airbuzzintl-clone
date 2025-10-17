"use client";
import Track from "@/pages/genral/landing/Track";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Track />
    </Suspense>
  );
}
