import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { FormButton, TextContainer } from "../../components/elements";
import TextInputField from "../../components/elements/TextInputField";
import { skyExColors } from "../../controller/constant";
import { Url, instance } from "../../utils/api";
import {
  errorAlert,
  successAlert,
} from "../../components/elements/ToastNotification";
import Crop from "../../components/elements/Crop";

function Logistics() {
  const [logistics, setLogistics] = useState({});
  const [openCropModalInternational, setOpenCropModalInternational] =
    useState(false);
  const [openCropModalDomestic, setOpenCropModalDomestic] = useState(false);
  const getLogistics = async () => {
    try {
      const response = await instance.get(`/Landing/getServices`);
      if (response?.status === 200) {
        setLogistics(response?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setLogistics({ ...logistics, [e.target.name]: [e.target.value] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.put(
        `/Landing/service/${logistics.id}`,
        {
          id: logistics.id,
          title: logistics.title,
          description: logistics.description,
          international_title: logistics.international_title,

          international_description: logistics.international_description,
          international_image: logistics.international_image,
          domestic_title: logistics.domestic_title,
          domestic_description: logistics.domestic_description,
          domestic_image: logistics.domestic_image,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await getLogistics;
      successAlert("Success");
    } catch (err) {
      console.log(err);
      errorAlert("Something went wrong");
    }
  };
  useEffect(() => {
    getLogistics();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#f3f3f3",
      }}
    >
      <br />
      {logistics ? (
        <Card
          sx={{
            padding: "3.5vh",
            width: { md: "70%", xs: "95%" },
            margin: "auto",
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
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
                fontSize={"40px"}
                fontWeight={700}
                lineHeight={"1.2"}
                color={"#102C38"}
                value={"Service"}
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
                  label={"Title"}
                  name={"title"}
                  multiline
                  required
                  rows={2}
                  maxLength={50}
                  value={logistics.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextInputField
                  label={"Description"}
                  background={skyExColors.skyExTextBoxGrey}
                  name={"description"}
                  multiline
                  required
                  rows={4}
                  maxLength={300}
                  value={logistics.description}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <>
              <br />
              <br />
              <TextContainer
                fontSize={"20px"}
                fontWeight={700}
                lineHeight={"1.2"}
                color={"#102C38"}
                value={"International Services"}
              />
              <br />
              <Grid container spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextInputField
                    label={"Title"}
                    name={"international_title"}
                    multiline
                    required
                    rows={2}
                    maxLength={30}
                    value={logistics.international_title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextInputField
                    label={"Description"}
                    background={skyExColors.international_description}
                    name={"international_description"}
                    rows={4}
                    maxLength={300}
                    multiline
                    required
                    value={logistics.international_description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <label onClick={() => setOpenCropModalInternational(true)}>
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
                            typeof logistics?.international_image === "object"
                              ? URL.createObjectURL(
                                  logistics?.international_image
                                )
                              : Url + logistics?.international_image
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
                    </Box>
                  </label>
                  <Crop
                    open={openCropModalInternational}
                    handleClose={() => setOpenCropModalInternational(false)}
                    ratio={16 / 9}
                    images={logistics.international_image}
                    CroppedImage={(a) =>
                      setLogistics({
                        ...logistics,
                        international_image: a,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </>
            <>
              <br />
              <br />
              <TextContainer
                fontSize={"20px"}
                fontWeight={700}
                lineHeight={"1.2"}
                color={"#102C38"}
                value={"Domestic Services"}
              />
              <br />
              <Grid container spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextInputField
                    label={"Title"}
                    name={"domestic_title"}
                    multiline
                    required
                    rows={2}
                    maxLength={30}
                    value={logistics.domestic_title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextInputField
                    label={"Description"}
                    background={skyExColors.international_description}
                    name={"domestic_description"}
                    rows={4}
                    maxLength={300}
                    multiline
                    required
                    value={logistics.domestic_description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <label onClick={() => setOpenCropModalDomestic(true)}>
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
                            typeof logistics.domestic_image === "object"
                              ? URL.createObjectURL(logistics.domestic_image)
                              : Url + logistics.domestic_image
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
                    </Box>
                  </label>
                  <Crop
                    open={openCropModalDomestic}
                    handleClose={() => setOpenCropModalDomestic(false)}
                    ratio={16 / 9}
                    images={logistics.domestic_image}
                    CroppedImage={(a) =>
                      setLogistics({ ...logistics, domestic_image: a })
                    }
                  />
                </Grid>
              </Grid>
            </>
          </form>
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Logistics;
