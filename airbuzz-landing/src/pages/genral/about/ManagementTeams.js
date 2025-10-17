import styled from "styled-components";
import { skyExColors } from "../../../controller/constant/colors";
import { fontSizes } from "../../../controller/constant/fontSize";
import { TextContainer } from "../../../components/elements";
import { useEffect } from "react";
import { Box, Card, Grid, Stack } from "@mui/material";
import { rowAlignCenter } from "../../../controller/constant/muiThemes";
import { useState } from "react";
import { Url } from "../../../utils/api";

const ManagementTeams = ({ ourStoryData, slideData }) => {
  const [slide, setSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const nextSlide = () => {
    if (!isHovered && slide < slideData.length - 1) {
      setSlide((prev) => prev + 1);
    }
  };
  const reset = () => {
    setSlide(0);
  };

  useEffect(() => {
    if (slide < slideData?.length - 1) {
      var timeout1 = setTimeout(nextSlide, 5000);
      return () => {
        clearTimeout(timeout1);
      };
    } else {
      var timeout2 = setTimeout(reset, 5000);
      return () => {
        clearTimeout(timeout2);
      };
    }
    // eslint-disable-next-line
  }, [slide, isHovered]);
  return (
    <Wrapper>
      <TextContainer
        color={"#fff"}
        fontSize={fontSizes.headings}
        fontWeight={700}
        value={ourStoryData?.title}
        className={`mastermind-heading-anime`}
        zIndex={2}
        position={"relative"}
      />
      <br />
      <br />
      <Grid container spacing={2} sx={rowAlignCenter}>
        <Grid
          item
          xl={6}
          lg={6}
          md={0}
          sm={0}
          xs={0}
          sx={{
            display: {
              xl: "flex",
              lg: "flex",
              md: "none",
              sm: "none",
              xs: "none",
            },
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Img
            src={`${Url}${ourStoryData?.image}`}
            alt="landingImage"
            style={{
              width: "50vw",
              height: "auto",
              filter:
                "drop-shadow(2px 1px 0px white) brightness(1) saturate(1.5)",
            }}
          />
        </Grid>
        <Grid
          item
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {slideData?.length > 0 && (
            <Card
              sx={{
                height: "45vh",
                borderRadius: 5,
                margin: 2,
                boxShadow: "0 1px 20px 0 rgba(17,30,79,.1)",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Box sx={{ padding: "5%" }}>
                <TextContainer
                  color={skyExColors.skyExDarkGrey}
                  fontSize={"16px"}
                  value={slideData[slide]?.para1}
                />
                <br />
                <TextContainer
                  color={skyExColors.skyExDarkGrey}
                  fontSize={"16px"}
                  value={slideData[slide]?.para2}
                  gutterBottom
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    padding: "0 2%",
                  }}
                >
                  <TextContainer
                    color={skyExColors.green}
                    fontSize={"16px"}
                    value={`~ ${slideData[slide]?.author}`}
                  />
                </Box>
              </Box>
            </Card>
          )}

          <Stack
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 5,
              width: "100%",
            }}
          >
            {slideData?.map((e, i) => (
              <Card
                key={e.id}
                sx={{
                  height: 9,
                  width: slide === i ? 25 : 9,
                  backgroundColor: slide === i ? "#61bb21" : "white",
                  margin: 0.5,
                  cursor: "pointer",
                }}
                onClick={() => setSlide(i)}
              ></Card>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default ManagementTeams;

const Wrapper = styled.section`
  padding-top: 2%;
  min-height: 70vh;

  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2%;
  @media (max-width: 600px) {
    padding: 0 2%;
  }
`;

const Img = styled.img`
  width: 50vw;
  height: auto;
  @media (max-width: 800px) {
    background-size: cover;
  }
`;
