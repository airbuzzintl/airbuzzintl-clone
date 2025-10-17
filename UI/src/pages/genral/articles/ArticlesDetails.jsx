import React from "react";
import styled from "styled-components";
import { skyExColors } from "../../../controller/constant";
import { Card, Grid } from "@mui/material";
import { useLocation, useParams } from "react-router";
import { Url } from "../../../utils/api";
import { TextContainer } from "../../../components/elements";
import StickyFooter from "../landing/StickyFooter"; 
function ArticlesDetails() {

  const {title : titleSlug } = useParams();
  const {state } = useLocation();

  const title1 = decodeURIComponent(titleSlug.replace(/-/g, ' '));

  const articleTitle = title1 || state?.title;
  const {
    state: {
      title,
      description,
      image_1,
      sub_title_1,
      sub_para_1,
      sub_title_2,
      sub_para_2,
      sub_title_3,
      sub_para_3,
      sub_title_4,
      sub_para_4,
      sub_title_5,
      sub_para_5,
      image_2,
    },
  } = useLocation();
  return (
    <>
    <Wrapper
      style={{
        padding: "20px 3%",
        marginTop: "65px",
        "@media (max-width: 1000px)": {
          marginTop: "15%",
        },
        minHeight: "100vh",
      }}
    >
      <TextContainer
        fontSize={"48px"}
        fontWeight={700}
        lineHeight={"1.5"}
        color={"#fff"}
        textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
        value={articleTitle}
        margin={"1.5% 0"}
        textAlign={"center"}
      />
      <Card
        sx={{
          background: `url(${Url}${image_1})`,
          backgroundPosition: "center",
          width: "55%",
          height: "50vh",
          margin: "0 auto",
          backgroundSize: "100% 100%",
          "@media (max-width: 600px)": {
            width: "90%",
            height: "20vh",
            margin: "0 auto",
          },
        }}
      ></Card>
      <br />
      <Grid container spacing={2}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <TextContainer
            fontSize={"18px"}
            lineHeight={"1.8"}
            color={"#FFF5E1"}
            textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
            value={description}
            margin={"1.5% 0"}
            textAlign={"left"}
          />
        </Grid>
      </Grid>
      <br />
      {sub_title_1 && (
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextContainer
              fontSize={"27px"}
              fontWeight={600}
              color={"#fff"}
              textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              value={sub_title_1}
              textAlign={"left"}
            />
          </Grid>
        </Grid>
      )}
      {sub_para_1 && (
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextContainer
              fontSize={"18px"}
              lineHeight={"1.8"}
              color={"#FFF5E1"}
              textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              value={sub_para_1}
              margin={"0.5% 0"}
              textAlign={"left"}
            />
          </Grid>
        </Grid>
      )}
      <br />
      {sub_title_2 && (
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextContainer
              fontSize={"27px"}
              fontWeight={600}
              color={"#fff"}
              textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              value={sub_title_2}
              textAlign={"left"}
            />
          </Grid>
        </Grid>
      )}
      {sub_para_2 && (
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextContainer
              fontSize={"18px"}
              lineHeight={"1.8"}
              color={"#FFF5E1"}
              textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              value={sub_para_2}
              margin={"0.5% 0"}
              textAlign={"left"}
            />
          </Grid>
        </Grid>
      )}
      <br />
      {image_2 === "null" ? null : (
        <>
          <Card
            sx={{
              backgroundImage: `url(${Url}${image_2})`,
              backgroundPosition: "center",
              width: "55%",
              height: "50vh",
              margin: "0 auto",
              backgroundSize: "100% 100%",
              "@media (max-width: 600px)": {
                width: "90%",
                height: "20vh",
                margin: "0 auto",
              },
            }}
          ></Card>
          <br />
        </>
      )}
      <Grid container spacing={2}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <TextContainer
            fontSize={"18px"}
            lineHeight={"1.8"}
            color={"#FFF5E1"}
            textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
            value={description}
            margin={"0.5% 0"}
            textAlign={"left"}
          />
        </Grid>
      </Grid>
      <br />
      {sub_title_3 && (
        <Grid container spacing={2}>
          <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
            <TextContainer
              fontSize={"27px"}
              fontWeight={600}
              color={"#fff"}
              textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              value={sub_title_3}
              textAlign={"left"}
            />
          </Grid>
        </Grid>
      )}
      {sub_para_3 && (
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextContainer
              fontSize={"18px"}
              lineHeight={"1.8"}
              color={"#FFF5E1"}
              textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              value={sub_para_3}
              margin={"0.5% 0"}
              textAlign={"left"}
            />
          </Grid>
        </Grid>
      )}
      <br />
      {sub_title_4 && (
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextContainer
              fontSize={"27px"}
              fontWeight={600}
              color={"#fff"}
              textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              value={sub_title_4}
              textAlign={"left"}
            />
          </Grid>
        </Grid>
      )}
      {sub_para_4 && (
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextContainer
              fontSize={"18px"}
              lineHeight={"1.8"}
              color={"#FFF5E1"}
              textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              value={sub_para_4}
              margin={"0.5% 0"}
              textAlign={"left"}
            />
          </Grid>
        </Grid>
      )}
      <br />
      {sub_title_5 && (
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextContainer
              fontSize={"27px"}
              fontWeight={600}
              color={"#fff"}
              textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              value={sub_title_5}
              textAlign={"left"}
            />
          </Grid>
        </Grid>
      )}
      {sub_para_5 && (
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextContainer
              fontSize={"18px"}
              lineHeight={"1.8"}
              color={"#FFF5E1"}
              textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              value={sub_para_5}
              margin={"0.5% 0"}
              textAlign={"left"}
            />
          </Grid>
        </Grid>
      )}
    </Wrapper>
       <StickyFooter />
       </>
  );
}

export default ArticlesDetails;
const Wrapper = styled.section`
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
`;
