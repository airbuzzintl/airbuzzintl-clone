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

function AirBuzzAccount() {
  const [introduction, setIntroduction] = useState({});
  const [openCropModal, setOpenCropModal] = useState(false);

  const handleEditAccount = (e) => {
    setIntroduction({
      ...introduction,
      [e.target.name]: e.target.value,
    });
  };

  const getAirBuzzAcc = async () => {
    try {
      const response = await instance.get(`/Landing/OpenAccount`);
      if (response.status === 200) {
        setIntroduction(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAirBuzzAcc();
  }, []);

  const updateAccount = async (e) => {
    e.preventDefault();
    try {
      await instance.put(
        `/Landing/OpenAccount/1`,
        {
          title: introduction.title,
          description: introduction.description,
          file: introduction.image,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      await getAirBuzzAcc();
      successAlert("Succes");
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
        <form onSubmit={(e) => updateAccount(e)}>
          <Stack
            sx={{
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
              value={"AirBuzz Account"}
            />
            <Box>
              <FormButton
                value={"Update"}
                type={"submit"}
                padding={"0rem 2rem"}
                height={"40px"}
                background={skyExColors.secondary}
                shadow={"#fff"}
                fullWidth
                border
              />
            </Box>
          </Stack>
          <br />

          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                required
                label={"Title"}
                name={"title"}
                maxLength={50}
                rows={2}
                multiline
                value={introduction.title}
                onChange={handleEditAccount}
                focused={introduction.title}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                required
                label={"Content"}
                value={introduction.description}
                onChange={handleEditAccount}
                name={"description"}
                maxLength={380}
                rows={5}
                multiline
                focused={introduction.description}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <label
                htmlFor="imageUpload"
                onClick={() => setOpenCropModal(true)}
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
                CroppedImage={(a) =>
                  setIntroduction({ ...introduction, image: a })
                }
              />
            </Grid>
          </Grid>
        </form>
      </Card>
    </div>
  );
}

export default AirBuzzAccount;
