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
import { Url, instance } from "../../utils/api";
import TextInputField from "../../components/elements/TextInputField";
import {
  errorAlert,
  successAlert,
} from "../../components/elements/ToastNotification";
import Crop from "../../components/elements/Crop";

function Introduction() {
  const [introduction, setIntroduction] = useState({});
  const [openCropModal, setOpenCropModal] = useState(false);
  const handleEditIntro = (e) => {
    setIntroduction({
      ...introduction,
      [e.target.name]: e.target.value,
    });
  };

  const getIntroduction = async () => {
    try {
      const response = await instance.get(`/Landing/Header`);
      if (response?.status === 200) {
        setIntroduction(response?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getIntroduction();
  }, []);

const updateHeader = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  formData.append("title", introduction.title);
  formData.append("para1", introduction.para1);
  formData.append("para2", introduction.para2);
  formData.append("para3", introduction.para3);
  formData.append("para4", introduction.para4);
  formData.append("link", introduction.path);
  formData.append("button_name", introduction.button_name);

  if (introduction.image instanceof File) {
    formData.append("file", introduction.image);
  } else if (introduction.image) {
    formData.append("file", introduction.image); // Or skip appending if the server only expects new uploads
  }

  try {
    const response = await instance.put(`/Landing/Header/1`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      await getIntroduction();
      successAlert("Success");
    }
  } catch (err) {
    console.log(err);
    errorAlert("Something went wrong");
  }
};

  const paths = [
    { id: 1, path: "none", name: "none" },
    { id: 2, path: "/Services/International", name: "International Services" },
    { id: 3, path: "/Services/Domestic", name: "Domestic services" },
    { id: 4, path: "/Contact/Careers", name: "Career" },
    { id: 5, path: "/Contact/Franchise", name: "Franchise" },
    { id: 6, path: "/Support/FAQ", name: "Faq" },
    { id: 7, path: "/Support/Downloads", name: "Documents" },
    { id: 8, path: "/About", name: "About" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#f3f3f3",
      }}
    >
      <Card
        sx={{
          padding: "3.5vh",
          width: { md: "70%", xs: "95%" },
          margin: "auto",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <form onSubmit={(e) => updateHeader(e)}>
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
              value={"Introduction"}
            />
            <Box>
              <FormButton
                value={"Update"}
                padding={"0rem 2rem"}
                height={"40px"}
                background={skyExColors.secondary}
                fullWidth
                border
                shadow={"#fff"}
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
                maxLength={70}
                value={introduction.title}
                onChange={(e) => handleEditIntro(e)}
                focused={introduction.title}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 1"}
                background={skyExColors.skyExTextBoxGrey}
                name={"para1"}
                multiline
                required
                maxLength={220}
                rows={3}
                value={introduction.para1}
                focused={introduction.para1}
                onChange={handleEditIntro}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 2"}
                height={"1rem"}
                background={skyExColors.skyExTextBoxGrey}
                name={"para2"}
                rows={3}
                multiline
                required
                maxLength={270}
                value={introduction.para2}
                focused={introduction.para2}
                onChange={handleEditIntro}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 3"}
                height={"1rem"}
                name={"para3"}
                rows={3}
                multiline
                required
                maxLength={200}
                value={introduction.para3}
                focused={introduction.para3}
                onChange={handleEditIntro}
              />
            </Grid>

            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Button name"}
                height={"1rem"}
                required
                maxLength={20}
                multiline
                rows={2}
                background={skyExColors.skyExTextBoxGrey}
                name={"button_name"}
                value={introduction.button_name}
                focused={introduction.button_name}
                onChange={handleEditIntro}
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
                    {introduction.path != "none"
                      ? paths
                          ?.filter((e) => e.path == introduction.path)
                          ?.map((e) => e.name)
                      : "none"}
                    )
                  </Typography>
                </Stack>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={introduction?.path?.toString()}
                  name="path"
                  onChange={handleEditIntro}
                  sx={{ background: "#f3f3f3", borderColor: skyExColors.green }}
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

export default Introduction;
