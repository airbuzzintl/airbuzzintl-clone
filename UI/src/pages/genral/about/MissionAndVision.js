import { Box, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { TextContainer } from "../../../components/elements";
import { fontSizes, skyExColors } from "../../../controller/constant";
import { breadcrumbs } from "../../../controller/Common";
import { Url } from "../../../utils/api";

const MissionAndVision = ({ missionVision = [] }) => {
  return (
    <Warapper class="bg-animation">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Grid container spacing={2} sx={{ bgcolor: skyExColors.pageBackground }}>
        <div
          style={{
            position: "absolute",
            top: "6rem",
            left: "6rem",
            zIndex: 99,
          }}
        >
          {breadcrumbs("Home / About")}
        </div>
        <Grid
          item
          xl={4}
          lg={4}
          md={4}
          sm={12}
          xs={12}
          sx={{
            display: {
              xl: "flex",
              ls: "flex",
              md: "flex",
              sm: "none",
              xs: "none",
            },
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5.5rem",
          }}
        >
          <img
            src={`${Url}${missionVision[0]?.image}`}
            style={{ width: 450, display: "block" }}
            alt="airbuzz"
          />
        </Grid>
        <Grid
          item
          xl={8}
          lg={8}
          md={8}
          sm={12}
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "6rem",
          }}
        >
          <Box my={4} mx={2}>
            <TextContainer
              fontSize={"35px"}
              fontWeight={"bold"}
              color={skyExColors.skyExTextBoxGrey}
              className={`mission-heading-anime`}
              value={missionVision[0]?.title}
              zIndex={2}
              position={"relative"}
            />

            <TextContainer
              fontSize={"1.30rem"}
              fontWeight={"bold"}
              color={skyExColors.skyExTextBoxGrey}
              maxWidth={"95%"}
              value={`❝${missionVision[0]?.subTitle}❞`}
              fontStyle={"italic"}
              paddingTop={"0.5rem"}
              textAlign={"justify"}
            />
            <TextContainer
              fontSize={fontSizes.subcontent}
              color={skyExColors.skyExTextBoxGrey}
              maxWidth={"95%"}
              value={missionVision[0]?.para1}
              fontWeight={400}
              paddingTop={"0.5rem"}
              textAlign={"justify"}
            />
            <TextContainer
              fontSize={fontSizes.subcontent}
              color={skyExColors.skyExTextBoxGrey}
              maxWidth={"95%"}
              fontWeight={400}
              value={missionVision[0]?.para2}
              paddingTop={"0.5rem"}
              textAlign={"justify"}
            />
          </Box>
        </Grid>

        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{ background: skyExColors.secondary }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "row",
                sm: "column-reverse",
                xs: "column-reverse",
              },
            }}
          >
            <Grid
              item
              xl={8}
              lg={8}
              md={8}
              sm={12}
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                xs={12}
                style={{
                  margin: "0rem 1.2rem",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Box my={4}>
                  <TextContainer
                    fontSize={"35px"}
                    fontWeight={"bold"}
                    color={skyExColors.skyExTextBoxGrey}
                    value={missionVision[1]?.title}
                    className={`vission-heading-anime`}
                    zIndex={2}
                    position={"relative"}
                  />
                  <TextContainer
                    fontSize={"1.30rem"}
                    fontWeight={"bold"}
                    color={skyExColors.skyExTextBoxGrey}
                    maxWidth={"95%"}
                    value={`❝${missionVision[1]?.subTitle}❞`}
                    fontStyle={"italic"}
                    paddingTop={"0.5rem"}
                    textAlign={"justify"}
                  />

                  <TextContainer
                    fontSize={fontSizes.subcontent}
                    color={skyExColors.skyExTextBoxGrey}
                    maxWidth={"100%"}
                    value={missionVision[1]?.para1}
                    paddingTop={"0.5rem"}
                    fontWeight={400}
                    textAlign={"justify"}
                  />
                  <TextContainer
                    fontSize={fontSizes.subcontent}
                    color={skyExColors.skyExTextBoxGrey}
                    maxWidth={"100%"}
                    value={missionVision[1]?.para2}
                    paddingTop={"0.5rem"}
                    fontWeight={400}
                    textAlign={"justify"}
                  />
                </Box>
              </div>
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{
                display: {
                  xl: "flex",
                  ls: "flex",
                  md: "flex",
                  sm: "none",
                  xs: "none",
                },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={`${Url}${missionVision[1]?.image}`}
                style={{ width: 450 }}
                alt="airBuzz"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
    </Warapper>
  );
};

export default MissionAndVision;
const Warapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
  overflow: hidden;
`;
