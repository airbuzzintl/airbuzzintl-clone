import { Box, Card, Grid } from "@mui/material";
import { skyExColors } from "../../../controller/constant/colors";
import styled from "styled-components";
import { CardButton, TextContainer } from "../../elements";
import { useNavigate } from "react-router";
import { Url } from "../../../utils/api";

const ServicesCard = ({ e }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        minHeight: {
          xl: "40vh",
          lg: "48vh",
          md: "55vh",
          sm: "35vh",
          xs: "40vh",
        },
        maxHeight: {
          xl: "40vh",
          lg: "45vh",
          md: "55vh",
          sm: "35vh",
          xs: "100vh",
        },
        minWidth: "100%",
        borderRadius: 5,
        position: "relative",
      }}
    >
      <Grid container sx={{ padding: "2rem 1.25rem" }}>
        <Grid
          item
          xl={3.5}
          md={3.5}
          xs={3}
          sx={{
            display: { xl: "block", md: "block", xs: "none" },
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageWrapper className="box">
            <Image draggable={false} src={`${Url}${e.img}`} alt="cardImg" />
          </ImageWrapper>
        </Grid>
        <Grid item xl={8.5} md={8.5} xs={12} sx={{}}>
          <div>
            <TextContainer
              color={skyExColors.primary}
              fontWeight={"700"}
              textAlign={"start"}
              fontSize={"22px"}
              value={e.heading}
            />

            <TextContainer
              color={skyExColors.skyExDarkGrey}
              fontSize={"16px"}
              value={e.description}
              WebkitLineClamp={6}
            />

            <Box
              sx={{
                position: {
                  xl: "absolute",
                  lg: "absolute",
                  md: "absolute",
                  sm: "absolute",
                  xs: "relative",
                },
                bottom: {
                  xl: "1%",
                  lg: "1%",
                  md: "2%",
                  sm: "4%",
                  xs: "0",
                },
                left: {
                  xl: "30%",
                  lg: "30%",
                  md: "30%",
                  sm: "5%",
                  xs: "0%",
                },
              }}
            >
              <CardButton
                name={e.buttonName}
                icon={e.btnIcon}
                onClick={() => navigate(e.path)}
              />
            </Box>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};
export default ServicesCard;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Image = styled.img`
  height: 7rem;
  margin-bottom: 30px;
`;
