import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormButton, TextContainer } from "../../components/elements";
import { skyExColors } from "../../controller/constant";
import TextInputField from "../../components/elements/TextInputField";
import { Url, instance } from "../../utils/api";
import {
  errorAlert,
  successAlert,
} from "../../components/elements/ToastNotification";
import SelectWithTextField from "../../components/elements/SelectWithTextField";
import Crop from "../../components/elements/Crop";

function Feeds() {
  const [socialFeedData, setSocialFeedData] = useState([]);
  const [socialFeedTitle, setSocialFeedTitle] = useState();
  const [openCropModal, setOpenCropModal] = useState(false);
  const [id, setId] = useState();
  const getSocialFeeds = async () => {
    try {
      const response = await instance.get(`/landing/getSocialFeeds`);
      if (response?.status === 200) {
        const { global_title, feeds } = response.data;
        setSocialFeedTitle(global_title[0].feeds);
        setSocialFeedData(feeds);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSocialFeeds();
  }, []);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setSocialFeedData((prev) =>
      prev.map((a) => {
        if (a.id === id && name === "url_type") {
          return { ...a, [name]: value, url: "" };
        } else if (a.id === id) {
          return { ...a, [name]: value };
        } else {
          return a;
        }
      })
    );
  };

  const updateSocialFeed = async (a, data) => {
    a.preventDefault();
    try {
      await instance.put(
        `/landing/UpdateSocialFeeds/${data.id}`,
        {
          content: data.content,
          file: data.image,
          url_type: data.url_type,
          url: data.url,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await getSocialFeeds();
      successAlert("Success");
    } catch (err) {
      console.log(err);
      errorAlert("Something went wrong");
    }
  };
  const updateSocialFeedTitle = async (a) => {
    a.preventDefault();
    try {
      await instance.get(`/landing/UpdateSocialFeeds/${socialFeedTitle}`);
      await getSocialFeeds();
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
      <Stack direction={"row"} marginLeft={{ md: "15%", xs: 1 }}>
        <TextContainer
          fontSize={{ md: "40px", xs: "30px" }}
          fontWeight={700}
          lineHeight={"1.2"}
          color={"#102C38"}
          value={"Social Media Feeds"}
        />
      </Stack>
      <br />
      <Card
        sx={{
          padding: "3.5vh",
          width: { md: "70%", xs: "95%" },
          margin: "auto",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <form onSubmit={(a) => updateSocialFeedTitle(a)}>
          <Stack
            sx={{
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "row",
                sm: "row",
                xs: "row",
              },
            }}
            justifyContent={"end"}
          >
            <Box>
              <FormButton
                value={"Update"}
                padding={"0rem 2rem"}
                height={"40px"}
                background={skyExColors.secondary}
                shadow={"#fff"}
                fullWidth
                border
                type={"submit"}
              />
            </Box>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Title"}
                background={skyExColors.skyExTextBoxGrey}
                name={"content"}
                rows={2}
                maxLength={20}
                multiline
                required
                value={socialFeedTitle}
                focused={socialFeedTitle}
                onChange={(a) => setSocialFeedTitle(a.target.value)}
              />
            </Grid>
          </Grid>
        </form>
      </Card>
      <br />
      {socialFeedData?.map((e, index) => (
        <div key={e.id}>
          <Card
            sx={{
              padding: "3.5vh",
              width: { md: "70%", xs: "95%" },
              margin: "auto",
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
          >
            <form onSubmit={(a) => updateSocialFeed(a, e)}>
              <Stack
                sx={{
                  flexDirection: {
                    xl: "row",
                    lg: "row",
                    md: "row",
                    sm: "row",
                    xs: "row",
                  },
                }}
                justifyContent={"space-between"}
              >
                <TextContainer
                  fontSize={"20px"}
                  fontWeight={700}
                  lineHeight={"1.2"}
                  color={"#102C38"}
                  value={`Card ${index + 1}`}
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
                    type={"submit"}
                  />
                </Box>
              </Stack>
              <br />

              <Grid container spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextInputField
                    label={"Description"}
                    background={skyExColors.skyExTextBoxGrey}
                    name={"content"}
                    rows={3}
                    maxLength={260}
                    multiline
                    required
                    value={e.content}
                    focused={e.content}
                    onChange={(a) => handleChange(a, e.id)}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <SelectWithTextField
                    list={["Youtube", "Others"]}
                    placeholder={"Paste Your url"}
                    type={"url"}
                    handleselectChange={(name, value) =>
                      handleChange(
                        { target: { name: name, value: value } },
                        e.id
                      )
                    }
                    selectName={"url_type"}
                    selectValue={e.url_type}
                    textname={"url"}
                    textValue={e.url}
                    handleTextChange={(name, value) =>
                      handleChange(
                        { target: { name: name, value: value } },
                        e.id
                      )
                    }
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <label
                    onClick={() => {
                      setOpenCropModal(true);
                      setId(e.id);
                    }}
                  >
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
                        <img
                          src={
                            typeof e?.image === "object"
                              ? URL.createObjectURL(e.image)
                              : Url + e.image
                          }
                          alt=""
                          style={{
                            width: "150px",
                            borderRadius: "10px",
                          }}
                        />
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography sx={{ color: "#3498db" }}>
                          Choose your Image here{" "}
                        </Typography>

                        <Typography sx={{ color: "#ccc" }}>
                          Supports PNG , JPG & WEBP up to any size
                        </Typography>
                      </Box>
                    </Box>
                    {/* <input
                      type="file"
                      id={`${e.id}socialFeed`}
                      name="image"
                      style={{ display: "none" }}
                      onChange={(a) =>
                        handleChange(
                          {
                            target: {
                              name: "image",
                              value: a.target.files[0],
                            },
                          },
                          e.id
                        )
                      }
                    /> */}
                  </label>
                  <Crop
                    open={openCropModal}
                    handleClose={() => setOpenCropModal(false)}
                    ratio={16 / 9}
                    images={e.image}
                    CroppedImage={(image) => ({
                      ...socialFeedData.feeds,
                      image: handleChange(
                        {
                          target: {
                            name: "image",
                            value: image,
                          },
                        },
                        id
                      ),
                    })}
                  />
                </Grid>
              </Grid>
            </form>
          </Card>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Feeds;
