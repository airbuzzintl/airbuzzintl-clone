import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Stack } from "@mui/material";
import { FormButton, TextContainer } from "../../components/elements";
import TextInputField from "../../components/elements/TextInputField";
import {
  errorAlert,
  successAlert,
} from "../../components/elements/ToastNotification";
import { skyExColors } from "../../controller/constant";
import { instance } from "../../utils/api";

function Franchises() {
  const [franchise, setFranchise] = useState({});

  const getFranchise = async () => {
    try {
      const response = await instance.get(`/Contact/Franchise`);
      if (response?.status === 200) {
        setFranchise(response?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFranchise();
  }, []);

  const editFranchise = (e, index) => {
    const { name, value } = e.target;
    setFranchise((prevFranchise) => ({
      ...prevFranchise,
      [index]: {
        ...prevFranchise[index],
        [name]: value,
      },
    }));
  };
  const updateFranchise = async () => {
    try {
      await instance.put(`/Contact/Franchise`, {
        id: 1,
        title: franchise[0].title,
        para1: franchise[0].para1,
        para2: franchise[0].para2,
        para3: franchise[0].para3,
        para4: franchise[0].para4,
        para5: franchise[0].para5,
      });
      await getFranchise();
      successAlert("Success");
    } catch (err) {
      console.log(err);
      errorAlert("Something went wrong");
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#f3f3f3",
      }}
    >
      <Card
        sx={{
          padding: "3.5vh",
          width: { md: "70%", xs: "95%" },
          margin: "auto",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <Stack
          sx={{
            margin: "auto",
            flexDirection: {
              xl: "row",
              lg: "row",
              md: "row",
              sm: "row",
              xs: "column",
            },
          }}
          justifyContent={"space-between"}
        >
          <TextContainer
            fontSize={{ md: "40px", xs: "30px" }}
            fontWeight={700}
            lineHeight={"1.2"}
            color={"#102C38"}
            value={"Franchise"}
          />
          <Box>
            <FormButton
              value={"Update"}
              padding={"0rem 2rem"}
              height={"40px"}
              background={skyExColors.secondary}
              shadow={"#fff"}
              fullWidth
              border
              clickFunction={updateFranchise}
            />
          </Box>
        </Stack>
        <br />

        <form>
          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Title"}
                name={"title"}
                multiline
                rows={2}
                maxLength={60}
                value={franchise[0]?.title}
                onChange={(e) => editFranchise(e, 0)}
                focused={franchise[0]?.title}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 1"}
                name={"para1"}
                multiline
                rows={4}
                maxLength={220}
                value={franchise[0]?.para1}
                onChange={(e) => editFranchise(e, 0)}
                focused={franchise[0]?.para1}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 2"}
                name={"para2"}
                multiline
                rows={4}
                maxLength={350}
                value={franchise[0]?.para2}
                onChange={(e) => editFranchise(e, 0)}
                focused={franchise[0]?.para2}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 3"}
                name={"para3"}
                multiline
                rows={4}
                maxLength={200}
                value={franchise[0]?.para3}
                onChange={(e) => editFranchise(e, 0)}
                focused={franchise[0]?.para3}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 4"}
                name={"para4"}
                multiline
                rows={4}
                maxLength={220}
                value={franchise[0]?.para4}
                onChange={(e) => editFranchise(e, 0)}
                focused={franchise[0]?.para4}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 5"}
                name={"para5"}
                multiline
                rows={3}
                maxLength={100}
                value={franchise[0]?.para5}
                onChange={(e) => editFranchise(e, 0)}
                focused={franchise[0]?.para5}
              />
            </Grid>
          </Grid>
        </form>
      </Card>
    </div>
  );
}

export default Franchises;
