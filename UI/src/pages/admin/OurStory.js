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
import Crop from "../../components/elements/Crop";

function OurStory() {
  const [ourStory, setOurStory] = useState({
    title: {},
    slide: [],
  });
  const [openCropModal, setOpenCropModal] = useState(false);
  const getOurStory = async () => {
    try {
      const response = await instance.get(`/About/OurStory`);

      setOurStory(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOurStory();
  }, []);

  const EditOurStory = (e) => {
    setOurStory({
      ...ourStory,
      title: { ...ourStory.title, [e.target.name]: e.target.value },
    });
  };

  const updateOurStory = async () => {
    try {
      await instance.put(
        `/About/OurStory/1`,
        {
          title: ourStory.title.title,
          file: ourStory.title.image,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      await getOurStory();
      successAlert("success");
    } catch (err) {
      console.log(err);
      errorAlert("Something went wrong");
    }
  };
  const EditSlider = async (e, id) => {
    const updatedSlideData = ourStory.slide?.map((a) => {
      if (a.id === id) {
        return { ...a, [e.target.name]: e.target.value };
      } else return a;
    });
    const updatedOurStory = { ...ourStory, slide: updatedSlideData };
    setOurStory(updatedOurStory);
  };
  const updateSlide = async (id) => {
    const para_1 = ourStory.slide.find((item) => item.id === id)?.para1;
    const para_2 = ourStory.slide.find((item) => item.id === id)?.para2;
    const author = ourStory.slide.find((item) => item.id === id)?.author;
    try {
      await instance.put(`/About/slide/${id}`, {
        para1: para_1,
        para2: para_2,
        author: author,
      });
      await getOurStory();
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
            value={`Our Story`}
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
              clickFunction={updateOurStory}
            />
          </Box>
        </Stack>
        <br />
        <form>
          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Title"}
                height={"1rem"}
                background={skyExColors.skyExTextBoxGrey}
                name={"title"}
                maxLength={50}
                rows={2}
                multiline
                value={ourStory.title?.title}
                focused={ourStory.title?.title}
                onChange={(e) => EditOurStory(e)}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <label onClick={() => setOpenCropModal(true)}>
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
                        typeof ourStory.title?.image === "object"
                          ? URL.createObjectURL(ourStory.title?.image)
                          : Url + ourStory.title?.image
                      }
                      alt="imag"
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
              </label>
              <Crop
                open={openCropModal}
                handleClose={() => setOpenCropModal(false)}
                ratio={16 / 9}
                images={ourStory?.title?.image}
                CroppedImage={(a) => {
                  setOurStory({
                    ...ourStory,
                    title: {
                      ...ourStory.title,
                      image: a,
                    },
                  });
                }}
              />
            </Grid>
          </Grid>
        </form>
      </Card>
      <br />
      {ourStory.slide?.map((data, index) => (
        <div key={data.id}>
          <Card
            sx={{
              padding: "3.5vh",
              width: { md: "70%", xs: "95%" },
              margin: "auto",
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
          >
            <Stack direction={"row"} justifyContent={"space-between"}>
              <TextContainer
                fontSize={"20px"}
                fontWeight={700}
                lineHeight={"1.2"}
                color={"#102C38"}
                value={`Slide ${index + 1}`}
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
                  clickFunction={() => updateSlide(data?.id)}
                />
              </Box>
            </Stack>
            <br />
            <form>
              <Grid container spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextInputField
                    label={"Paragraph 1"}
                    height={"1rem"}
                    background={skyExColors.skyExTextBoxGrey}
                    name={"para1"}
                    rows={3}
                    maxLength={200}
                    multiline
                    value={data?.para1}
                    focused={data?.para1}
                    onChange={(e) => EditSlider(e, data?.id)}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextInputField
                    label={"Paragraph 2"}
                    height={"1rem"}
                    background={skyExColors.skyExTextBoxGrey}
                    name={"para2"}
                    rows={3}
                    maxLength={260}
                    multiline
                    value={data?.para2}
                    focused={data?.para2}
                    onChange={(e) => EditSlider(e, data?.id)}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextInputField
                    label={"Author"}
                    height={"1rem"}
                    background={skyExColors.skyExTextBoxGrey}
                    name={"author"}
                    maxLength={50}
                    multiline
                    rows={2}
                    value={data?.author}
                    focused={data?.author}
                    onChange={(e) => EditSlider(e, data?.id)}
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

export default OurStory;
