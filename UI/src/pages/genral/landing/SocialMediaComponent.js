import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import SocialMediaCard from "../../../components/elements/SocialMediaCard";

const SocialMediaComponent = ({ data, title }) => {
  const isSMorSx = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <div>
      <Box sx={{ padding: "0 50px" }}>
        <Typography
          variant="h2"
          sx={{ color: "white", fontWeight: "600", letterSpacing: "2px" }}
        >
          {title || "Air Buzz"}
        </Typography>
      </Box>
      <br />
      <br />
      <br />
      <br />
      <Box sx={{ paddingTop: "3%" }}>
        <Grid container spacing={2} p={2}>
          {data?.feeds?.slice(0, 8).map((e, i) => {
            let transformValue = "";

            if (i + 1 === 2 || i + 1 === 6) {
              transformValue = "translateY(-15%)";
            } else if (i + 1 === 3 || i + 1 === 7) {
              transformValue = "translateY(7%)";
            } else if (i + 1 === 4 || i + 1 === 8) {
              transformValue = "translateY(-10%)";
            }

            return (
              <Grid item xl={3} lg={3} md={6} sm={12} xs={12} key={e.id}>
                <Box
                  sx={{ transform: isSMorSx ? "none" : transformValue }}
                  key={e.id}
                >
                  <SocialMediaCard data={e} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", padding: "3%" }}
      ></Box>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default SocialMediaComponent;
