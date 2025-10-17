import styled from "styled-components";
import { Box, Grid, Button } from "@mui/material";
import { TextContainer } from "../../../components/elements";
import { Url } from "../../../utils/api";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
// import { useNavigate } from "react-router";
import { skyExColors } from "../../../controller/constant";
import { useRouter } from "next/navigation";

const Header = ({ data }) => {
  const navigate = useRouter();

  return (
    <>
      <Wrapper className="slider-thumb" style={{ zIndex: "100" }}>
        <Grid container spacing={2}>
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
            sx={{ display: "grid", placeItems: "center" }}
          >
            <TextBox>
              <TextContainer
                fontSize={"48px"}
                fontWeight={700}
                lineHeight={"1.2"}
                color={"#fff"}
                textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
                value={data?.title}
                textAlign={"left"}
              />
              <TextContainer
                fontSize={"16px"}
                color={"#fff"}
                textAlign={"justify"}
                textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
                gutterBottom
                value={data?.para1}
                marginTop={"2%"}
              />
              <TextContainer
                fontSize={"16px"}
                color={"#fff"}
                textAlign={"justify"}
                textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
                gutterBottom
                value={data?.para2}
                marginTop={"2%"}
              />
              <TextContainer
                fontSize={"16px"}
                color={"#fff"}
                textAlign={"justify"}
                textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
                gutterBottom
                value={data?.para3}
                marginTop={"2%"}
              />

              {data?.link !== "none" ? (
                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate.push(data?.path)}
                    sx={{
                      background: skyExColors.green,
                      color: "#fff",
                      textTransform: "capitalize",
                    }}
                  >
                    {data?.button_name} &nbsp;
                    <TrendingFlatIcon
                      style={{ fontSize: "x-large", color: "#fff" }}
                    />
                  </Button>
                </Box>
              ) : (
                <></>
              )}
            </TextBox>
          </Grid>
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
              position: "relative",
            }}
          >
            <div style={{ position: "relative" }}>
              <div id="moon-circle">
                <div className="small-circle" id="small-circle-one"></div>
                <div className="small-circle" id="small-circle-two"></div>
                <div className="small-circle" id="small-circle-three"></div>
                <div className="small-circle" id="small-circle-four"></div>
                <div className="small-circle" id="small-circle-five"></div>
                <div className="small-circle" id="small-circle-six"></div>
              </div>

              <Img
                src={`${Url}${data?.image}`}
                alt="landingImage"
                style={{ width: "50vw", height: "auto" }}
              />
            </div>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};

export default Header;

const Wrapper = styled.section`
  margin-top: 2px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2% 2% 0.5% 2%;
  overflow: hidden;
  @media (max-width: 1100px) {
    background-size: cover;
    padding: 6% 3% 1% 3%;
  }
  @media (max-width: 800px) {
    padding: 8% 3% 1% 3%;
  }
  @media (max-width: 650px) {
    padding: 10% 3% 1% 3%;
  }

  @media (max-width: 400px) {
    padding: 12% 3% 1% 3%;
  }
`;
const TextBox = styled.div`
  @media (max-width: 600px) {
    margin-top: 20px;
  }
`;
const Img = styled.img`
  width: 50vw;
  height: auto;
  filter: drop-shadow(white 2px 1px 0px) brightness(1) saturate(1.5);
  @media (max-width: 800px) {
    background-size: cover;
  }
`;
