import React from "react";
import styled from "styled-components";
import { Breadcrumbs, Grid } from "@mui/material";
import { skyExColors } from "../../controller/constant/colors";
import { Link } from "react-router-dom";
import { footerContent } from "../../controller/data/landingscreenData";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Footer() {
  const year = new Date();
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
          xl={4}
          lg={4}
          md={6}
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
            <FooterText>{footerContent.footerDiscription}</FooterText>
          </ImageWrapper>
        </Grid>
        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
          <Grid container spacing={2} p={1}>
            {footerContent.footerList.map((e, i) => (
              <Grid item xl={3} lg={3} md={4} sm={4} xs={12}>
                <FooterContent>
                  <h4 className="whiteColor">{e.heading}</h4>
                  {e.links.map((e, i) => {
                    console.log(e, "fdd");
                    return (
                      <FooterItems key={e.title}>
                        <Link className="footerLink" to={`${e.path}`}>
                          <LocationOnIcon />
                          {e.title}
                        </Link>
                      </FooterItems>
                    );
                  })}
                </FooterContent>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ padding: ".5rem 1rem 0 1rem" }}>
        <Grid
          item
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <CopyRights>
            {`Copyright © ${year.getFullYear()}. AirBuzz International LLC.All rights reserved`}
          </CopyRights>
        </Grid>
        <Grid
          item
          xl={6}
          lg={6}
          md={6} 
          sm={12}
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Breadcrumbs
            separator={"|"}
            aria-label="breadcrumb"
            sx={{ color: "white", fontSize: ".7rem" }}
          >
            {footerContent.policies.map((e) => (
              <a
                className="footerLink"
                underline="hover"
                color="white"
                href={e.path}
              >
                {e.name}
              </a>
            ))}
          </Breadcrumbs>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background: ${(props) => (props.bg ? props.bg : "#171717")};
  min-height: 30vh;
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

const CopyRights = styled.div`
  font-size: 0.73rem;
  color: #fff;
`;
const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 0.5rem;
`;
const FooterText = styled.div`
  text-align: center;
  font-size: 0.75rem;
  color: #fff;
`;
