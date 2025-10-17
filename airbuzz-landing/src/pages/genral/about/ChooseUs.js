import React from "react";
import styled from "styled-components";
import { Box, Grid, Stack } from "@mui/material";
import { Url } from "../../../utils/api";
import { TextContainer } from "@/components/elements";
import { fontSizes, skyExColors } from "@/controller/constant";

const ChooseUs = ({ chooseUs }) => {
  return (
    <ChooseUS>
      <TextContainer
        fontSize={fontSizes.headings}
        fontWeight={"bold"}
        color={skyExColors.skyExTextBoxGrey}
        value={chooseUs?.title}
        textAlign={"center"}
        marginTop={"1rem"}
      />
      <br />
      <Grid
        container
        spacing={2}
        sx={{ mt: "1rem", display: "flex", justifyContent: "space-around" }}
      >
        {chooseUs?.chooseus?.map((e) => (
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12} key={e.id}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                style={{
                  height: "4.5rem",
                  width: "4.5rem",
                  borderRadius: "50%",
                  backgroundColor: skyExColors.secondary,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={`${Url}${e?.image}`}
                  alt="skyEx"
                  style={{
                    height: "3rem",
                    width: "3rem",
                  }}
                />
              </Box>
              <TextContainer
                fontSize={fontSizes.subcontent}
                color={skyExColors.skyExTextBoxGrey}
                fontWeight={"bold"}
                value={e.title}
                textAlign={"center"}
                paddingTop={"1rem"}
              />
              <Stack
                sx={{
                  maxWidth: {
                    xl: "50%",
                    lg: "75%",
                    md: "85%",
                    sm: "90%",
                    xs: "95%",
                  },
                }}
              >
                <TextContainer
                  fontSize={fontSizes.subcontent}
                  color={skyExColors.textGrey}
                  value={e.para}
                  textAlign={"center"}
                  paddingTop={".5rem"}
                />
              </Stack>
            </Box>
            <br />
          </Grid>
        ))}
        <br />
      </Grid>
    </ChooseUS>
  );
};

export default ChooseUs;

const ChooseUS = styled.div`
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
  min-height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
