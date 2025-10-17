import { Card, Grid } from "@mui/material";
import { skyExColors } from "../../../controller/constant/colors";
import styled from "styled-components";
import { CardButton, TextContainer } from "../../elements";
import { Url } from "../../../controller/Common";

const ServicesBox = ({ e }) => {
  return (
    <Card sx={{ minHeight: "30vh", minWidth: "100%", borderRadius: 0 }}>
      <Grid container sx={{ padding: "2rem 1.25rem" }}>
        <Grid
          item
          xl={2.5}
          md={2.5}
          xs={3}
          sx={{ display: { xl: "block", md: "block", xs: "none" } }}
        >
          <ImageWrapper className="box">
            <Image
              src={`${Url}images/getImageByKey?key=${e.img}`}
              alt="cardImg"
            />
          </ImageWrapper>
        </Grid>
        <Grid
          item
          xl={9.5}
          md={9.5}
          xs={12}
          sx={{
            position: "relative",
          }}
        >
          <div>
            <TextContainer
              color={skyExColors.skyExOrgange}
              fontWeight={"700"}
              textAlign={"start"}
              fontSize={"28px"}
              value={e.heading}
            />

            <TextContainer
              color={skyExColors.skyExDarkGrey}
              fontSize={"16px"}
              value={e.description}
              maxHeight={"6rem"}
              minHeight={"6rem"}
            />

            <CardButton name={e.buttonName} icon={e.btnIcon} />
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};
export default ServicesBox;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Image = styled.img`
  width: 4rem;
`;
