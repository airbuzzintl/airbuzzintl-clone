"use client";
import { createTheme } from "@mui/material";

export const SkyExTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Montserrat",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: ".3s",
          "&:hover": {
            backgroundColor: "#fff",
            color: "#fff",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          accentColor: "#fff",
          background: "#fff",
          color: "#fff",
        },
      },
    },
  },
});

export const stepperTheme = createTheme({
  components: {
    MuiStepLabel: {
      styleOverrides: {
        "MuiStepLabel-label": {
          color: "#fff",
        },
      },
    },
  },
});
export const rowAlignCenter = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};
