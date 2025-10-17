import React, { useState } from "react";
import { FormButton, TextContainer } from "../../../components/elements";
import { Box, Card, Grid } from "@mui/material";
import { skyExColors } from "../../../controller/constant";
import TrackerModal from "../../../components/elements/TrackerModal";

function Tracker() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <TrackerModal open={open} close={handleClose} />
      <Card
        sx={{
          padding: "10px",
          width: "80%",
          backgroundColor: skyExColors.primary,
          " @media (max-width: 900px)": {
            width: "100%",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{
              " @media (max-width: 900px)": {
                textAlignLast: "center",
              },
            }}
          >
            <TextContainer
              fontSize={{ md: "40px", xs: "30px" }}
              fontWeight={700}
              lineHeight={"1.2"}
              color={"#fff"}
              value={"Enter AWB Number"}
            />
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{ alignSelf: "center" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              justifyContent={"space-evenly"}
            >
              <FormButton
                value="Track"
                padding={"0rem 2rem"}
                height={"40px"}
                background={skyExColors.secondary}
                shadow={"#102C38"}
                fullWidth
                border
                clickFunction={handleOpen}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <FormButton
                value="Track Multiple AWB"
                padding={"0rem 2rem"}
                height={"40px"}
                background={skyExColors.secondary}
                shadow={"#102C38"}
                fullWidth
                border
                clickFunction={handleOpen}
              />
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default Tracker;
