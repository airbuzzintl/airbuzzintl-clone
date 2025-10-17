import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { FormButton, TextContainer } from "../../components/elements";
import { skyExColors } from "../../controller/constant";
import TextInputField from "../../components/elements/TextInputField";
import { Url, instance } from "../../utils/api";
import {
  errorAlert,
  successAlert,
} from "../../components/elements/ToastNotification";

function SocialFeeds() {
  const [socialFeeds, setSocialFeeds] = useState([]);
  const handleEditSocialFeeds = async (e, id) => {
    const data = await socialFeeds.map((a) => {
      if (a.id === id) {
        return { ...a, [e.target.name]: e.target.value };
      } else return a;
    });
    setSocialFeeds(data);
  };
  const handleFile = async (e, id) => {
    const data = await socialFeeds.map((dt) => {
      if (dt.id == id) {
        return { ...dt, image: e.target.files[0] };
      } else return dt;
    });
    setSocialFeeds(data);
  };

  const getSocialFeeds = async () => {
    try {
      const response = await instance.get(`/Landing/Airfreight`);
      if (response?.status === 200) {
        setSocialFeeds(response?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSocialFeeds();
  }, []);

  const updateSocialFeeds = async (e) => {
    try {
      await instance.put(
        `/Landing/Airfreight/${e.id}`,
        {
          title: e.title,
          description: e.description,
          file: e.image,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      await getSocialFeeds();
      successAlert("success");
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
      <Stack marginLeft={{ md: "15%", xs: 2 }}>
        <TextContainer
          fontSize={{ md: "40px", xs: "30px" }}
          fontWeight={700}
          lineHeight={"1.2"}
          color={"#102C38"}
          value={"Service Feeds"}
        />
      </Stack>
      <br />
      {socialFeeds?.map((e, i) => (
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
                value={`Card ${i + 1}`}
              />
              <Box sx={{ alignSelf: "center" }}>
                <FormButton
                  value={"Update"}
                  padding={"0rem 2rem"}
                  height={"40px"}
                  background={skyExColors.secondary}
                  shadow={"#fff"}
                  fullWidth
                  border
                  clickFunction={() => updateSocialFeeds(e)}
                />
              </Box>
            </Stack>
            <form>
              <Grid container spacing={2}>
                <>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextInputField
                      label={"Title"}
                      name={"title"}
                      multiline
                      rows={2}
                      value={e.title}
                      onChange={(a) => handleEditSocialFeeds(a, e.id)}
                      focused={e.title}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextInputField
                      label={"Paragraph"}
                      background={skyExColors.skyExTextBoxGrey}
                      name={"description"}
                      rows={3}
                      multiline
                      value={e.description}
                      focused={e.description}
                      onChange={(a) => handleEditSocialFeeds(a, e.id)}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                          <img
                            src={
                              typeof e.image === "object"
                                ? URL.createObjectURL(e.image)
                                : `${Url}${e.image}`
                            }
                            alt="images"
                            style={{
                              width: "150px",
                              borderRadius: "10px",
                            }}
                          />
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography sx={{ color: "#3498db" }}>
                            Choose your Image here
                          </Typography>

                          <Typography sx={{ color: "#ccc" }}>
                            Supports PNG , JPG & WEBP up to any size
                          </Typography>
                        </Box>
                      </Box>{" "}
                      <input
                        type="file"
                        id="imageUpload"
                        name="image"
                        style={{ display: "none" }}
                        onChange={(a) => handleFile(a, e.id)}
                      />
                    </label>
                  </Grid>
                </>
              </Grid>
            </form>
          </Card>
          <br />
        </div>
      ))}
    </div>
  );
}

export default SocialFeeds;
