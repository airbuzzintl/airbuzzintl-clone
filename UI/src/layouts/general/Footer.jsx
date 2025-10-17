import React from "react";
import styled from "styled-components";
import { Box, Grid, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { skyExColors } from "../../controller/constant/colors";
import { Link } from "react-router-dom";
import { footerContent } from "../../controller/data/landingscreenData";
import { useAirbuzzLocation } from "../../controller/constant/LocationContext";

export default function Footer() {
  const { currentLocation } = useAirbuzzLocation();
  return (
    <Wrapper bg={skyExColors.darkPrimary}>
      <br />
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xl={3}
          lg={3}
          md={4}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ImageWrapper>
            <LogoWrap>
              <Img
                src={footerContent.footerLogo}
                alt="Logo"
                draggable={false}
              />
            </LogoWrap>
          </ImageWrapper>
        </Grid>
        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
          <Grid container spacing={2} p={1}>
            {footerContent.footerList.map((section, index) => (
              <Grid item xl={2} lg={2} md={4} sm={4} xs={12} key={index}>
                <FooterContent>
                  <h4 className="whiteColor">{section.heading}</h4>
                  {section.heading === "Location" ? (
                    <FooterItems>
                      <Link
                        className="footerLink"
                        to={
                          currentLocation === "United Arab Emirates"
                            ? "https://maps.app.goo.gl/jRDXAjWx2mSAEQ3s6?g_st=iw"
                            : "https://www.google.com/maps/place/26%C2%B015'16.3%22N+50%C2%B039'55.3%22E/@26.2545338,50.662796,17z/data=!3m1!4b1!4m4!3m3!8m2!3d26.2545338!4d50.6653709?entry=ttu"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography sx={{ fontWeight: "bold" }}>
                              <LocationOnIcon style={{ fontSize: "16px" }} />{" "}
                              &nbsp;
                              {currentLocation === "United Arab Emirates"
                                ? "UAE"
                                : "Bahrain"}
                            </Typography> 
                            <Typography>
                              {currentLocation === "United Arab Emirates"
                                ? "WH 03 - 19th D Street - opposite Raptors Gym - Umm Ramool - Dubai +971557174089"
                                : "No 10, Bldg 361, Rd 104, Al Hidd | Bahrain  +97317335757  +97332226699"}
                            </Typography>
                          </Box>
                        </Box>
                      </Link>
                    </FooterItems>
                  ) : (
                    section.links.map((link, index) => (
                      <FooterItems key={index}>
                        <Link
                          className="footerLink"
                          to={link.path}
                          target={
                            link.target === "target" ? "_blank" : undefined
                          }
                          rel={
                            link.target === "target"
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {link.icon ? (
                            <span>
                              {link.icon}
                              <span style={{ marginLeft: "2px" }}>
                                {link.title}
                              </span>
                            </span>
                          ) : (
                            link.title
                          )}
                        </Link>
                      </FooterItems>
                    ))
                  )}
                </FooterContent>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background: ${(props) => (props.bg ? props.bg : "#171717")};
  min-height: 20vh;
  display: flex;
  // align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ImageWrapper = styled.div`
  max-width: 14rem;
`;
const Img = styled.img`
  width: 8rem;
`;
const FooterContent = styled.ul`
  color: #8d8d8d;
  list-style: none;
`;
const FooterItems = styled.li`
  color: #8d8d8d;
  margin-top: 0.8rem;
  list-style: none;
`;

const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 0.5rem;
`;
