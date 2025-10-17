import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Stack } from "@mui/material";
import { FormButton, TextContainer } from "../../components/elements";
import { skyExColors } from "../../controller/constant";
import TextInputField from "../../components/elements/TextInputField";
import { instance } from "../../utils/api";
import {
  errorAlert,
  successAlert,
} from "../../components/elements/ToastNotification";

const BlogsTitles = () => {
  const [articleData, setArticleData] = useState([]);

  const getArticles = async () => {
    try {
      const response = await instance.get(`/Landing/Articles`);
      if (response?.status === 200) {
        setArticleData(response?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getArticles();
  }, []);

  
  const updateArticlesTitle = async (a) => {
    a.preventDefault();
    try {
      await instance.put(
        `/Landing/UpdateArticleTitle/${articleData.articles_title}/${articleData.articles_description}`,
        { title: articleData.articles_title, description: articleData.articles_description },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      await getArticles();
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
      <br />
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
          value={"Blogs Title"}
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
        <form onSubmit={(a) => updateArticlesTitle(a)}>
          <Stack direction={"row"} justifyContent={"end"}>
            <Box sx={{ alignSelf: "center" }}>
              <FormButton
                value={"Update"}
                padding={"0rem 2rem"}
                height={"40px"}
                background={skyExColors.secondary}
                shadow={"#fff"}
                fullWidth
                type={"submit"}
              />
            </Box>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Title"}
                name={"articles_title"}
                maxLength={50}
                multiline
                rows={2}
                value={articleData.articles_title}
                onChange={(a) =>
                  setArticleData((e) => ({
                    ...e,
                    articles_title: a.target.value,
                  }))
                }
                required
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Description"}
                background={skyExColors.skyExTextBoxGrey}
                name={"articles_description"}
                rows={3}
                maxLength={1000}
                multiline
                value={articleData.articles_description}
                onChange={(a) =>
                  setArticleData((e) => ({
                    ...e,
                    articles_description: a.target.value,
                  }))
                }
                required
              />
            </Grid>
          </Grid>
        </form>
      </Card>
      <br />
    </div>
  );
};

export default BlogsTitles;
