import { Box, Card, Grid, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import FormButton from "./FormButton";
import { skyExColors } from "../../controller/constant";
import TextContainer from "./TextContainer";
import TextInputField from "./TextInputField";
import { instance } from "../../utils/api";
import { errorAlert, successAlert } from "./ToastNotification";
import DatePickers from "./DatePickers";

function ArticleModal({ open, close, getArticles }) {
  const [articleData, setArticleData] = useState({
    date: "",
    title: "",
    description: "",
    image_1: null,
    image_2: null,
    sub_para_1: "",
    sub_para_2: "",
    sub_para_3: "",
    sub_para_4: "",
    sub_para_5: "",
    sub_title_1: "",
    sub_title_2: "",
    sub_title_3: "",
    sub_title_4: "",
    sub_title_5: "",
  });

  const createArticles = async () => {
    if (articleData.image_1) {
      try {
        await instance.post(
          `/Landing/Articles`,
          {
            title: articleData.title,
            description: articleData.description,
            date: articleData.date,
            sub_title_1: articleData.sub_title_1,
            sub_para_1: articleData.sub_para_1,
            sub_title_2: articleData.sub_title_2,
            sub_para_2: articleData.sub_para_2,
            sub_title_3: articleData.sub_title_3,
            sub_para_3: articleData.sub_para_3,
            sub_title_4: articleData.sub_title_4,
            sub_para_4: articleData.sub_para_4,
            sub_title_5: articleData.sub_title_5,
            sub_para_5: articleData.sub_para_5,
            image_1: articleData.image_1,
            image_2: articleData.image_2 ? articleData.image_2 : null,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        successAlert("Success");
      } catch (err) {
        console.log(err);
        errorAlert("Something went wrong");
      }
    } else {
      errorAlert("Upload Image");
    }
  };
  const postArticles = async (e) => {
    e.preventDefault();
    try {
      await createArticles();
      await getArticles();
      close();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={close}
      >
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            width: "90%",
            maxWidth: "600px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <form onSubmit={(e) => postArticles(e)}>
            <TextContainer
              fontSize={"30px"}
              fontWeight={700}
              lineHeight={"1.2"}
              color={"#102C38"}
              value={`Add Articles`}
            />
            <br />
            <Grid container spacing={2}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextInputField
                  label={"Title"}
                  name={"title"}
                  multiline
                  required
                  maxLength={50}
                  rows={2}
                  value={articleData.title}
                  onChange={(e) =>
                    setArticleData({ ...articleData, title: e.target.value })
                  }
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextInputField
                  label={"Description"}
                  name={"description"}
                  multiline
                  required
                  rows={2}
                  maxLength={1000}
                  value={articleData.description}
                  onChange={(e) =>
                    setArticleData({
                      ...articleData,
                      description: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <DatePickers
                  fullWidth
                  background={skyExColors.skyExTextBoxGrey}
                  name={"date"}
                  value={articleData.date}
                  onChange={(e) =>
                    setArticleData({ ...articleData, date: e.target.value })
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <TextInputField
                  label={"Sub Title 1"}
                  background={skyExColors.skyExTextBoxGrey}
                  name={"sub_title_1"}
                  rows={3}
                  maxLength={200}
                  multiline
                  value={articleData.sub_title_1}
                  onChange={(e) =>
                    setArticleData({
                      ...articleData,
                      sub_title_1: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <TextInputField
                  label={"Sub Description 1"}
                  background={skyExColors.skyExTextBoxGrey}
                  name={"sub_para_1"}
                  rows={3}
                  maxLength={1500}
                  multiline
                  value={articleData.sub_para_1}
                  onChange={(e) =>
                    setArticleData({
                      ...articleData,
                      sub_para_1: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <TextInputField
                  label={"Sub Title 2"}
                  background={skyExColors.skyExTextBoxGrey}
                  name={"sub_title_2"}
                  rows={3}
                  maxLength={200}
                  multiline
                  value={articleData.sub_title_2}
                  onChange={(e) =>
                    setArticleData({
                      ...articleData,
                      sub_title_2: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <TextInputField
                  label={"Sub Description 2"}
                  background={skyExColors.skyExTextBoxGrey}
                  name={"sub_para_2"}
                  rows={3}
                  maxLength={1500}
                  multiline
                  value={articleData.sub_para_2}
                  onChange={(e) =>
                    setArticleData({
                      ...articleData,
                      sub_para_2: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <TextInputField
                  label={"Sub Title 3"}
                  background={skyExColors.skyExTextBoxGrey}
                  name={"sub_title_3"}
                  rows={3}
                  maxLength={200}
                  multiline
                  value={articleData.sub_title_3}
                  onChange={(e) =>
                    setArticleData({
                      ...articleData,
                      sub_title_3: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <TextInputField
                  label={"Sub Description 3"}
                  background={skyExColors.skyExTextBoxGrey}
                  name={"sub_para_3"}
                  rows={3}
                  maxLength={1500}
                  multiline
                  value={articleData.sub_para_3}
                  onChange={(e) =>
                    setArticleData({
                      ...articleData,
                      sub_para_3: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <TextInputField
                  label={"Sub Title 4"}
                  background={skyExColors.skyExTextBoxGrey}
                  name={"sub_title_4"}
                  rows={3}
                  maxLength={200}
                  multiline
                  value={articleData.sub_title_4}
                  onChange={(e) =>
                    setArticleData({
                      ...articleData,
                      sub_title_4: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <TextInputField
                  label={"Sub Description 4"}
                  background={skyExColors.skyExTextBoxGrey}
                  name={"sub_para_4"}
                  rows={3}
                  maxLength={1500}
                  multiline
                  value={articleData.sub_para_4}
                  onChange={(e) =>
                    setArticleData({
                      ...articleData,
                      sub_para_4: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <TextInputField
                  label={"Sub Title 5"}
                  background={skyExColors.skyExTextBoxGrey}
                  name={"sub_title_5"}
                  rows={3}
                  maxLength={200}
                  multiline
                  value={articleData.sub_title_5}
                  onChange={(e) =>
                    setArticleData({
                      ...articleData,
                      sub_title_5: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <TextInputField
                  label={"Sub Description 5"}
                  background={skyExColors.skyExTextBoxGrey}
                  name={"sub_para_5"}
                  rows={3}
                  maxLength={1500}
                  multiline
                  value={articleData.sub_para_5}
                  onChange={(e) =>
                    setArticleData({
                      ...articleData,
                      sub_para_5: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <label>
                  <Box
                    sx={{
                      borderStyle: "dotted",
                      borderColor: "#ccc",
                      borderRadius: "10px",
                      padding: "7px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "20px",
                      }}
                    >
                      {articleData.image_1 ? (
                        <img
                          src={
                            articleData?.image_1?.name &&
                            typeof articleData?.image_1 === "object"
                              ? URL.createObjectURL(articleData?.image_1)
                              : ""
                          }
                          alt="imag"
                          style={{
                            width: "150px",
                            height: "120px",
                            borderRadius: "10px",
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography sx={{ color: "#3498db" }}>
                        Choose your Image here
                      </Typography>

                      <Typography sx={{ color: "#ccc" }}>
                        Supports PNG , JPG & WEBP up to any size
                      </Typography>
                    </Box>
                  </Box>
                  <input
                    accept=".png, .jpg, .jpeg"
                    type="file"
                    id="image_1"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setArticleData({
                        ...articleData,
                        image_1: e.target.files[0],
                      })
                    }
                  />
                </label>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <label>
                  <Box
                    sx={{
                      borderStyle: "dotted",
                      borderColor: "#ccc",
                      borderRadius: "10px",
                      padding: "7px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "20px",
                      }}
                    >
                      {articleData.image_2 ? (
                        <img
                          src={
                            articleData?.image_2?.name &&
                            typeof articleData?.image_2 === "object"
                              ? URL.createObjectURL(articleData?.image_2)
                              : ""
                          }
                          alt="imag"
                          style={{
                            width: "150px",
                            height: "120px",
                            borderRadius: "10px",
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography sx={{ color: "#3498db" }}>
                        Choose your Image here
                      </Typography>

                      <Typography sx={{ color: "#ccc" }}>
                        Supports PNG , JPG & WEBP up to any size
                      </Typography>
                    </Box>
                  </Box>
                  <input
                    accept=".png, .jpg, .jpeg"
                    type="file"
                    id="image_2"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setArticleData({
                        ...articleData,
                        image_2: e.target.files[0],
                      })
                    }
                  />
                </label>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box sx={{ float: "right" }}>
                  <FormButton
                    value={"Submit"}
                    padding={"0rem 2rem"}
                    height={"40px"}
                    background={skyExColors.secondary}
                    shadow={"#fff"}
                    fullWidth
                    border
                    type={"submit"}
                  />
                </Box>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Modal>
    </div>
  );
}

export default ArticleModal;
