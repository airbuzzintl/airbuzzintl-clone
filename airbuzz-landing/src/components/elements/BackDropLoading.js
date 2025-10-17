"use client";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
import { LoadContext } from "@/client/ClientProviders";

export default function BackDropLoading() {
  const { isLoading } = useContext(LoadContext) || {};

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="success" />
    </Backdrop>
  );
}
