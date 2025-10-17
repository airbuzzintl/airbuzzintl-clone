import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
import { loadContext } from "../../App";

export default function BackDropLoading() {
  const { isLoading } = useContext(loadContext);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </div>
  );
}
