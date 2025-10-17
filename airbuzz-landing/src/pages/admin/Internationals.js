import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { FormButton, TextContainer } from "../../components/elements";
import { skyExColors } from "../../controller/constant";
import TextInputField from "../../components/elements/TextInputField";
import { Url, instance } from "../../utils/api";
import { successAlert } from "../../components/elements/ToastNotification";
import ServiceModal from "../../components/elements/ServiceModal";
import Crop from "../../components/elements/Crop";

function Internationals() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [international, setInterNational] = useState([]);
  const [openCropModal, setOpenCropModal] = useState(false);
  const [id, setId] = useState();

  const getProvideServices = async () => {
    try {
      const response = await instance.get(
        `/Service/getProvideServices/international`
      );
      setInterNational(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProvideServices();
  }, []);

  const handleChange = (e, id) => {
    let data = international?.service?.map((element, index) => {
      if (element.id === id) {
        return {
          ...element,
          [e.target.name]: e.target.value,
        };
      } else {
        return element;
      }
    });
    setInterNational((prev) => ({ ...prev, service: data }));
  };

  const updateProvideService = async (e) => {
    try {
      await instance.put(
        `/Service/updateProvideService/${e.id}`,
        {
          title: e.title,
          description: e.description,
          button_name: e.button_name,
          path: e.path,
          file: e.image,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      await getProvideServices();
      successAlert("Success");
    } catch (e) {
      console.log(e);
    }
  };

  const deleteProvideService = async (e) => {
    try {
      await instance.delete(`/Service/deleteProvideService/${e.id}`);
      await getProvideServices();
      successAlert("Success");
    } catch (e) {
      console.log(e);
    }
  };

  const updateInternationTitle = async (a) => {
    a.preventDefault();
    try {
      await instance.put(`/Service/updateInternationalTitle`, {
        title: international.international_service_title,
        para1: international.international_service_Para_1,
        para2: international.international_service_Para_2,
      });
      await getProvideServices();
      successAlert("Success");
    } catch (e) {
      console.log(e);
    }
  };
  const paths = [
    { id: 1, path: "none", name: "none" },
    {
      id: 2,
      path: "/Services/International",
      name: "International Services",
    },
    { id: 3, path: "/Services/Domestic", name: "Domestic services" },
    { id: 4, path: "/Contact/Careers", name: "Career" },
    { id: 5, path: "/Contact/Franchise", name: "Franchise" },
    { id: 6, path: "/Support/FAQ", name: "Faq" },
    { id: 7, path: "/Support/Downloads", name: "Documents" },
    { id: 8, path: "/About", name: "About" },
    { id: 9, path: "#estimation", name: "Estimation" },
  ];
  return (
    <>
      {open ? (
        <ServiceModal
          open={open}
          close={handleClose}
          serviceType={"international"}
          getProvideServices={getProvideServices}
        />
      ) : null}

      <Stack
        sx={{
          width: { md: "70%", xs: "95%" },
          margin: "auto",
          flexDirection: {
            xl: "row",
            lg: "row",
            md: "row",
            sm: "row",
            xs: "column",
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
          value={"International"}
        />
        <Box>
          <FormButton
            value={"Add"}
            padding={"0rem 2rem"}
            height={"40px"}
            background={skyExColors.secondary}
            shadow={"#fff"}
            fullWidth
            border
            clickFunction={handleOpen}
          />
        </Box>
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
        <form onSubmit={(a) => updateInternationTitle(a)}>
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
                name={"international_service_title"}
                multiline
                rows={2}
                maxLength={30}
                value={international.international_service_title}
                onChange={(a) =>
                  setInterNational((e) => ({
                    ...e,
                    international_service_title: a.target.value,
                  }))
                }
                required
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 1"}
                background={skyExColors.skyExTextBoxGrey}
                name={"international_service_Para_1"}
                rows={4}
                maxLength={300}
                multiline
                value={international.international_service_Para_1}
                onChange={(a) =>
                  setInterNational((e) => ({
                    ...e,
                    international_service_Para_1: a.target.value,
                  }))
                }
                required
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 2"}
                background={skyExColors.skyExTextBoxGrey}
                name={"international_service_Para_2"}
                rows={5}
                maxLength={450}
                multiline
                value={international.international_service_Para_2}
                onChange={(a) =>
                  setInterNational((e) => ({
                    ...e,
                    international_service_Para_2: a.target.value,
                  }))
                }
                required
              />
            </Grid>
          </Grid>
        </form>
      </Card>
      <br />
      {international?.service?.map((e, index) => (
        <div
          key={e.id}
          style={{
            minHeight: "65vh",
            width: "100%",
            background: "#f3f3f3",
          }}
        >
          <form onSubmit={(a) => updateProvideService(a, e)}>
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
                  value={`Card ${index + 1}`}
                />
                <Box
                  sx={{
                    display: { md: "flex", xs: "flex" },
                    alignSelf: { md: "center", xs: "none" },
                  }}
                >
                  <FormButton
                    value={"Delete"}
                    padding={"0rem 2rem"}
                    height={"40px"}
                    background={skyExColors.secondary}
                    shadow={"#fff"}
                    fullWidth
                    border
                    clickFunction={() => deleteProvideService(e)}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <FormButton
                    value={"Update"}
                    padding={"0rem 2rem"}
                    height={"40px"}
                    background={skyExColors.secondary}
                    shadow={"#fff"}
                    fullWidth
                    border
                    clickFunction={() => updateProvideService(e)}
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
                    rows={2}
                    maxLength={30}
                    value={e?.title}
                    onChange={(event) => handleChange(event, e.id)}
                    required
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextInputField
                    label={"Description"}
                    background={skyExColors.skyExTextBoxGrey}
                    name={"description"}
                    multiline
                    rows={4}
                    maxLength={300}
                    value={e?.description}
                    required
                    onChange={(event) => handleChange(event, e.id)}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextInputField
                    label={"Button name"}
                    height={"1rem"}
                    background={skyExColors.skyExTextBoxGrey}
                    name={"button_name"}
                    maxLength={20}
                    multiline
                    rows={2}
                    value={e?.button_name}
                    focused={e?.button_name}
                    onChange={(event) => handleChange(event, e.id)}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <Stack justifyContent={"space-between"}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#0d4f6c",
                          width: "50%",
                        }}
                      >
                        {"Path"} &nbsp;&nbsp;(
                        {e.path != "none"
                          ? paths
                              ?.filter((a) => a.path == e.path)
                              ?.map((a) => a.name)
                          : "none"}
                        )
                      </Typography>
                    </Stack>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={e?.path?.toString()}
                      name="path"
                      onChange={(event) => handleChange(event, e.id)}
                      sx={{
                        background: "#f3f3f3",
                        borderColor: skyExColors.green,
                      }}
                    >
                      {paths.map((e, i) => (
                        <MenuItem value={e.path} key={i}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                    images={e.image}
                    CroppedImage={(image) => ({
                      ...international?.service,
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
            </Card>
          </form>
          <br />
        </div>
      ))}
    </>
  );
}

export default Internationals;
