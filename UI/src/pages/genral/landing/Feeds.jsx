import styled from "@emotion/styled";
import { Box, Card, Grid } from "@mui/material";
import { TextContainer } from "../../../components/elements";
import { fontSizes, skyExColors } from "../../../controller/constant";
import { Url } from "../../../utils/api";
const CardAirfreight = ({ title, content, height, bg }) => {
  return (
    <Card
      className="flip-card glass"
      sx={{
        minHeight: height,
        width: "100%",
        border: `2.5px solid ${skyExColors.green}`,
        position: "relative",
        borderRadius: 0,
        cursor: "pointer",
        background: `url(${bg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(4px)",

        ":hover": {
          opacity: 0.8,
        },
      }}
    >
      <div class="flip-card-inner">
        <div class="flip-card-front"></div>
        <div class="flip-card-back">
          <TextBox>
            <TextContainer
              color={"#FFF"}
              textAlign={"center"}
              fontWeight={"600"}
              fontSize={"20px"}
              value={title}
            />
            <TextContainer
              color={skyExColors.skyExTextBoxGrey}
              textAlign={"justify"}
              fontWeight={400}
              fontSize={"14px"}
              value={content}
              padding={"1rem"}
            />
          </TextBox>
        </div>
      </div>
    </Card>
  );
};
const Feeds = ({ AirfreightData }) => {
  const firstArray = AirfreightData?.slice(0, 1);
  const secondArray = AirfreightData?.slice(1, 5);
  return (
    <Wrapper className="Feeds-content-heading-anime">
      <Box sx={{ position: "relative", zIndex: "2" }}>
        <TextContainer
          value={`
Let’s talk more about Airfreight`}
          gutterBottom
          fontSize={fontSizes.headings}
          maxWidth={"97%"}
          fontWeight={700}
          textAlign={"center"}
          color={skyExColors.skyExTextBoxGrey}
          lineHeight={"1.2"}
        />
      </Box>
      <br />
      <Grid container spacing={2} p={2}>
        <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
          {firstArray?.map((e) => (
            <CardAirfreight
              height={"100%"}
              title={e?.title}
              bg={`${Url}${e.image}`}
              content={e?.description}
            />
          ))}
        </Grid>
        <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
          <Grid container spacing={1}>
            {secondArray?.map((e) => (
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} p={1}>
                <CardAirfreight
                  height={"37.5vh"}
                  title={e?.title}
                  bg={`${Url}${e.image}`}
                  content={e?.description}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};
export default Feeds;
const Wrapper = styled.section`
  min-height: 110vh;
  @media (max-width: 1250px) {
    min-height: 140vh;
  }
  @media (max-width: 1000px) {
    min-height: 140vh;
  }
  @media (max-width: 750px) {
    min-height: 275vh;
  }
  @media (max-width: 600px) {
    min-height: 265vh;
  }
  @media (max-width: 500px) {
    min-height: 230vh;
  }
`;
const TextBox = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2%;
`;
