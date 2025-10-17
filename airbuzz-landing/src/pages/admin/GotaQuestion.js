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
import Crop from "../../components/elements/Crop";

function GotaQuestion() {
  const [introduction, setIntroduction] = useState({});
  const [openCropModal, setOpenCropModal] = useState(false);

  const handleEditFaq = (e) => {
    setIntroduction({
      ...introduction,
      [e.target.name]: e.target.value,
    });
  };

  const getFaq = async () => {
    try {
      const response = await instance.get(`/Landing/Faq`);
      if (response.status === 200) {
        setIntroduction(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFaq();
  }, []);

  const updateFaq = async () => {
    try {
      await instance.put(
        `/Landing/Faq/1`,
        {
          title: introduction.title,
          description: introduction.description,
          file: introduction.image,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      await getFaq();
      successAlert("Success");
    } catch (err) {
      errorAlert("Something went wrong");
      console.log(err);
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
        <Stack direction={"row"} justifyContent={"space-between"}>
          <TextContainer
            fontSize={{ md: "40px", xs: "30px" }}
            fontWeight={700}
            lineHeight={"1.2"}
            color={"#102C38"}
            value={"FAQ"}
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
              clickFunction={updateFaq}
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
                maxLength={50}
                rows={2}
                multiline
                value={introduction.title}
                onChange={handleEditFaq}
                focused={introduction.title}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"description"}
                height={"1rem"}
                name={"description"}
                maxLength={560}
                rows={7}
                multiline
                value={introduction.description}
                focused={introduction.description}
                onChange={handleEditFaq}
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
                        typeof introduction.image === "object"
                          ? URL.createObjectURL(introduction.image)
                          : Url + introduction.image
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
                image={introduction.image}
                CroppedImage={(image) =>
                  setIntroduction({ ...introduction, image: image })
                }
              />
            </Grid>
          </Grid>
        </form>
      </Card>
    </div>
  );
}

export default GotaQuestion;
