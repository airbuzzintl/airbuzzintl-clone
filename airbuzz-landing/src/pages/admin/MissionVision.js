import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { FormButton, TextContainer } from "../../components/elements";
import { skyExColors } from "../../controller/constant";
import { Url, instance } from "../../utils/api";
import TextInputField from "../../components/elements/TextInputField";
import {
  errorAlert,
  successAlert,
} from "../../components/elements/ToastNotification";
import Crop from "../../components/elements/Crop";

function MissionVision() {
  const [openCropModalMision, setOpenCropModalMision] = useState(false);
  const [openCropModalVision, setOpenCropModalVision] = useState(false);
  const [mission, setMission] = useState({});
  const [vision, setVision] = useState({});
  const getMissionVision = async () => {
    try {
      const response = await instance.get(`/About/mission-vission`);
      if (response?.status === 200) {
        setMission(response.data[0]);
        setVision(response.data[1]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMissionVision();
  }, []);

  const updateMissionVision = async (data) => {
    try {
      await instance.put(
        `/About/mission-vission/${data.id}`,
        {
          title: data.title,
          subTitle: data.subTitle,
          para1: data.para1,
          para2: data.para2,
          file: data.image,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await getMissionVision();
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
        <Stack direction={"row"} justifyContent={"space-between"}>
          <TextContainer
            fontSize={{ md: "40px", xs: "30px" }}
            fontWeight={700}
            lineHeight={"1.2"}
            color={"#102C38"}
            value={"Mission"}
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
              clickFunction={() => updateMissionVision(mission)}
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
                maxLength={40}
                rows={3}
                multiline
                value={mission?.title}
                focused={mission?.title}
                onChange={(e) =>
                  setMission((prevMission) => ({
                    ...prevMission,
                    title: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Sub Title"}
                height={"1rem"}
                background={skyExColors.skyExTextBoxGrey}
                name={"subTitle"}
                rows={3}
                maxLength={180}
                multiline
                value={mission?.subTitle}
                focused={mission?.subTitle}
                onChange={(e) =>
                  setMission((prevMission) => ({
                    ...prevMission,
                    subTitle: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 1"}
                height={"1rem"}
                background={skyExColors.skyExTextBoxGrey}
                name={"para1"}
                rows={4}
                maxLength={200}
                multiline
                value={mission?.para1}
                focused={mission?.para1}
                onChange={(e) =>
                  setMission((prevMission) => ({
                    ...prevMission,
                    para1: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 2"}
                height={"1rem"}
                background={skyExColors.skyExTextBoxGrey}
                name={"para2"}
                rows={4}
                maxLength={200}
                multiline
                value={mission?.para2}
                focused={mission?.para2}
                onChange={(e) =>
                  setMission((prevMission) => ({
                    ...prevMission,
                    para2: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <label
                onClick={() => {
                  setOpenCropModalMision(true);
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
                        typeof mission?.image === "object"
                          ? URL.createObjectURL(mission?.image)
                          : Url + mission?.image
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
                      Choose your Image here
                    </Typography>

                    <Typography sx={{ color: "#ccc" }}>
                      Supports PNG , JPG & WEBP up to any size
                    </Typography>
                  </Box>
                </Box>
              </label>
              <Crop
                open={openCropModalMision}
                handleClose={() => setOpenCropModalMision(false)}
                ratio={16 / 9}
                images={mission?.image}
                CroppedImage={(croppedImage) => {
                  setMission((prevMission) => ({
                    ...prevMission,
                    image: croppedImage,
                    name: "image",
                  }));
                }}
              />
            </Grid>
          </Grid>
        </form>
      </Card>
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
            value={"Vision"}
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
              clickFunction={() => updateMissionVision(vision)}
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
                maxLength={40}
                rows={2}
                multiline
                value={vision?.title}
                focused={vision?.title}
                onChange={(e) =>
                  setVision((prevVision) => ({
                    ...prevVision,
                    title: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Sub Title"}
                height={"1rem"}
                background={skyExColors.skyExTextBoxGrey}
                name={"subTitle"}
                rows={3}
                multiline
                maxLength={180}
                value={vision?.subTitle}
                focused={vision?.subTitle}
                onChange={(e) =>
                  setVision((prevVision) => ({
                    ...prevVision,
                    subTitle: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 1"}
                height={"1rem"}
                background={skyExColors.skyExTextBoxGrey}
                name={"para1"}
                rows={4}
                maxLength={200}
                multiline
                value={vision?.para1}
                focused={vision?.para1}
                onChange={(e) =>
                  setVision((prevVision) => ({
                    ...prevVision,
                    para1: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 2"}
                height={"1rem"}
                background={skyExColors.skyExTextBoxGrey}
                name={"para2"}
                rows={4}
                maxLength={200}
                multiline
                value={vision?.para2}
                focused={vision?.para2}
                onChange={(e) =>
                  setVision((prevVision) => ({
                    ...prevVision,
                    para2: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <label
                onClick={() => {
                  setOpenCropModalVision(true);
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
                        typeof vision?.image === "object"
                          ? URL.createObjectURL(vision?.image)
                          : Url + vision?.image
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
                open={openCropModalVision}
                handleClose={() => setOpenCropModalVision(false)}
                ratio={16 / 9}
                images={vision?.image}
                CroppedImage={(croppedImage) => {
                  setVision((prevMission) => ({
                    ...prevMission,
                    image: croppedImage,
                    name: "image",
                  }));
                }}
              />
            </Grid>
          </Grid>
        </form>
      </Card>
    </div>
  );
}

export default MissionVision;
