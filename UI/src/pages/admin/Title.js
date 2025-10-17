import React, { useEffect, useState } from "react";
import TextInputField from "../../components/elements/TextInputField";
import { Box, Card, Grid, Stack } from "@mui/material";
import { FormButton, TextContainer } from "../../components/elements";
import { skyExColors } from "../../controller/constant";
import {
  errorAlert,
  successAlert,
} from "../../components/elements/ToastNotification";
import { instance } from "../../utils/api";

const Title = () => {
  const [TitleData, setTitleData] = useState({
    title: "",
    description: "",
  });



  const fetchPageDetails = async () => {
    try {
      const response = await instance.get(`/Service/getmetaTitle`);
  
      if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
        const [metaTitle] = response.data; 
        setTitleData({
          title: metaTitle.title || "",
          description: metaTitle.description || "",
        });
      } else {
        setTitleData({
          title: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("Error fetching page details:", error);
    }
  };
  
  // const fetchPageDetails = async () => {
  //   try {
  //     const response = await instance.get(`/Service/getmetaTitle`);

  //     if (response.status === 200) {
  //       setPageTitle(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching page details:", error);
  //   }
  // };


  const postTitle = async () => {
    try {
      const response = await instance.post(`/Service/postmetaTitle`, { 
        id: "1",
        title: TitleData.title,
        description: TitleData.description,
      });
      if (response.status === 200) {
        successAlert("Success");
        fetchPageDetails();
      }
    } catch (err) {
      console.log(err);
      errorAlert("Something went wrong");
    }
  };
  useEffect(() => {
    fetchPageDetails();
  }, []);
 
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#f3f3f3",
      }}
    >
      <Stack
        sx={{
          width: { md: "70%", xs: "95%" },
          margin: "auto",
          flexDirection: {
            xl: "row",
            lg: "row",
            md: "row",
            sm: "row",
            xs: "row",
          },
        }}
        paddingBottom={"10px"}
        justifyContent={"space-between"}
      >
        <TextContainer
          fontSize={{ md: "40px", xs: "30px" }}
          fontWeight={700}
          lineHeight={"1.2"}
          color={"#102C38"}
          value={"Meta-Title"}
        />
      </Stack>

      <Card
        sx={{
          padding: "3.5vh",
          width: { md: "70%", xs: "95%" },
          margin: "auto",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextInputField
              label={"Title"}
              name={"title"}
              value={TitleData.title}
              onChange={(a) =>
                setTitleData((e) => ({
                  ...e,
                  title: a.target.value,
                }))
              }
              maxLength={200}
              required
            />
          </Grid>

          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextInputField
              label={"Description"}
              name={"description"}
              rows={3}
              value={TitleData.description}
              onChange={(a) =>
                setTitleData((e) => ({
                  ...e,
                  description: a.target.value,
                }))
              }
              maxLength={1000}
              required
            />
          </Grid>
        </Grid>
        <br />
        <Stack direction={"row"} justifyContent={"end"}>
          <Box sx={{ alignSelf: "center" }}>
            <FormButton
              value={"Submit"}
              padding={"0rem 2rem"}
              height={"40px"}
              background={skyExColors.secondary}
              shadow={"#fff"}
              fullWidth
              type={"submit"}
              clickFunction={postTitle}
            />
          </Box>
        </Stack>
      </Card>
    </div>
  );
};

export default Title;
