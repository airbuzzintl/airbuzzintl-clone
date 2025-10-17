"use client";
import styled from "styled-components";
import { skyExColors } from "../../../controller/constant/colors";
import { fontSizes } from "../../../controller/constant/fontSize";
import { FormButton, TextContainer } from "../../../components/elements";
import { Grid } from "@mui/material";
import { rowAlignCenter } from "../../../controller/constant/muiThemes";
import { Url } from "../../../utils/api";
import { useRouter } from "next/navigation";

const FaqContent = ({ faqData }) => {
  const navigate = useRouter();
  return (
    <Wrapper>
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
            src={`${Url}${faqData?.image}`}
            alt="landingImage"
            style={{ width: "50vw", height: "auto" }}
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
          }}
          className="Faq-content-heading-anime"
        >
          <TextBox>
            <TextContainer
              fontSize={fontSizes.headings}
              fontWeight={"700"}
              lineHeight={"1.1"}
              color={skyExColors.skyExTextBoxGrey}
              value={faqData?.title}
            />
            <br />
            <TextContainer
              fontSize={fontSizes.subcontent}
              lineHeight={"1.5"}
              color={skyExColors.skyExTextBoxGrey}
              textAlign={"justify"}
              gutterBottom
              value={faqData?.description}
            />

            <br />
            <br />
            <FormButton
              value={"Know More"}
              background={skyExColors.secondary}
              padding={".45rem 2rem"}
              clickFunction={() => navigate.push("/Support/FAQ")}
              border={1}
              icon
            />
          </TextBox>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default FaqContent;

const Wrapper = styled.section`
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 2%;
  @media (max-width: 600px) {
    padding: 0 2%;
  }
`;
const TextBox = styled.div`
  transform: translateY(-15%);
  z-index: 2;

  @media (max-width: 600px) {
    padding: 0 2%;
    transform: translateY(0%);
  }
`;
const Img = styled.img`
  width: 50vw;
  height: auto;
  @media (max-width: 800px) {
    background-size: cover;
  }
`;
