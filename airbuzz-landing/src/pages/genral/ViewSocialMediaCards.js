import { Grid } from "@mui/material";
import React from "react";
import SocialMediaCard from "../../components/elements/SocialMediaCard";
import { socialMedia_1 } from "../../controller/constant/SocialMediaArray";
import styled from "styled-components";
import { skyExColors } from "../../controller/constant";

const ViewSocialMediaCards = () => {
  return (
    <Wrapper className="bg-animation">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="stars4"></div>
      <div id="stars4"></div>
      <Grid container spacing={2} p={2}>
        {socialMedia_1?.map((e, i) => (
          <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
            <SocialMediaCard data={e} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default ViewSocialMediaCards;
const Wrapper = styled.section`
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: hidden;
  padding-top: 5rem;
`;
