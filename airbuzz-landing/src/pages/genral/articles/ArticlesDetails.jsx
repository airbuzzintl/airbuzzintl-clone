"use client";
import React from "react";
import styled from "styled-components";
import { skyExColors } from "../../../controller/constant";
// import StickyFooter from "../landing/StickyFooter";
import { TextContainer } from "@/components/elements";
import { Card } from "@mui/material";
import { Url } from "@/utils/api";
// import { skyExColors } from "@/controller/constant";
import StickyFooter from "../landing/StickyFooter";

function ArticlesDetails({ data }) {
  if (!data) {
    return <p>Loading...</p>; // Handle the case where data is undefined
  }

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
          value={data?.title}
          margin={"1.5% 0"}
          textAlign={"center"}
        />
        <Card
          sx={{
            background: `url(${Url}${data?.img})`,
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
        <br />{" "}
        {data?.description ? (
          <TextContainer
            fontSize={"18px"}
            lineHeight={"1.8"}
            color={"#FFF5E1"}
            textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
            margin={"0.5% 0"}
            value={data?.description}
            parser
            maxChar={100000000000}
          />
        ) : (
          <p>No description available.</p>
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
