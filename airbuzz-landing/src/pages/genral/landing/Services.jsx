import { Grid } from "@mui/material";

import styled from "styled-components";
import { TextContainer } from "../../../components/elements";
import { ServicesCard } from "../../../components/sectionElements/services";
import { skyExColors } from "../../../controller/constant/colors";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { fontSizes } from "../../../controller/constant";

const Services = ({ data }) => {
  return (
    <Wrapper style={{ position: "relative" }}>
      <TopContent>
        <Grid container spacing={2} sx={{ position: "relative" }}>
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              position: {
                xl: "absolute",
                lg: "absolute",
                md: "absolute",
                sm: "relative",
                xs: "relative",
              },
              zIndex: "10",
            }}
          >
            <TextContainer
              wordBreak={"break-word"}
              value={data?.title}
              fontSize={fontSizes.headings}
              fontWeight={700}
              color={skyExColors.skyExTextBoxGrey}
              lineHeight={"1.2"}
              className={"services-heading-anime"}
            />
            <br />
            <TextContainer
              wordBreak={"break-word"}
              fontSize={"16px"}
              value={data?.description}
              color={skyExColors.skyExTextBoxGrey}
            />
          </Grid>
        </Grid>
      </TopContent>
      <TopCurve />
      <ServiceWrapper>
        <Grid
          container
          spacing={4}
          sx={{
            padding: {
              xl: "0 96px",
              lg: "0 96px",
              md: "0 46px",
              sm: "0 16px",
              xs: "0 8px",
            },
          }}
        >
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <ServicesCard
              e={{
                img: data?.international_image,
                heading: data?.international_title,
                description: data?.international_description,
                buttonName: `learn more`,
                btnIcon: <TrendingFlatIcon style={{ fontSize: "x-large" }} />,
                path: "/Services/International",
              }}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <ServicesCard
              e={{
                img: data?.domestic_image,
                heading: data?.domestic_title,
                description: data?.domestic_description,
                buttonName: `learn more`,
                btnIcon: <TrendingFlatIcon style={{ fontSize: "x-large" }} />,
                path: "/Services/Domestic",
              }}
            />
          </Grid>
        </Grid>
      </ServiceWrapper>
      <BottomCurve />
    </Wrapper>
  );
};

export default Services;
const Wrapper = styled.section`
  min-height: 90vh;
  background: ${skyExColors.secondary};
`;
const TopCurve = styled.div`
  clip-path: ellipse(60% 70% at 50% 0%);
  height: 20vh;
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
`;
const BottomCurve = styled.div`
  clip-path: ellipse(60% 70% at 50% 100%);
  height: 20vh;
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
`;

const ServiceWrapper = styled.div`
  display: flex;
  justifycontent: center;
`;
const TopContent = styled.section`
  min-height: 20vh;
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
  padding: 0 3%;
  position: relative;
`;
