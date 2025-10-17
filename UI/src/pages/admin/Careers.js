import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { FormButton, TextContainer } from "../../components/elements";
import { skyExColors } from "../../controller/constant";
import TextInputField from "../../components/elements/TextInputField";
import { Url, instance } from "../../utils/api";
import { successAlert } from "../../components/elements/ToastNotification";
import Crop from "../../components/elements/Crop";

function Careers() {
  const [careerData, setCareerData] = useState({});
  const [openCropModal, setOpenCropModal] = useState(false);
  const getCareerDatas = async () => {
    try {
     
      const response = await instance.get(`/Contact/getCareer`);
      if (response.status === 200) {
        setCareerData(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  
  useEffect(() => {
    getCareerDatas();
  }, []);

  const handleEditIntro = (e) => {
    const { name, value } = e.target;
    const updatedCareerData = { ...careerData, [name]: value };
    // setCareerData([updatedCareerData]);
    setCareerData(updatedCareerData); 
  };
  const updateCareerData = async () => {
    try {
      const formData = new FormData();
      formData.append("title", careerData.title);
      formData.append("para_1", careerData.para_1);
      formData.append("para_2", careerData.para_2);
      formData.append("para_3", careerData.para_3);
      formData.append("para_4", careerData.para_4);
      
   
      if (careerData.image instanceof Blob || careerData.image instanceof File) {
        formData.append("file", careerData.image);
      }
  
      const response = await instance.put(
        `/Contact/updateCareerData/1`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      if (response.status === 200) {
        await getCareerDatas();
        successAlert("Success");
      }
    } catch (e) {
      console.log(e);
    }
  };

  

  // const updateCareerData = async () => {
  //   try {
  //     const response = await instance.put(
  //       `/Contact/updateCareerData/1`,
  //       {
  //         title: careerData.title,
  //         para_1: careerData.para_1,
  //         para_2: careerData.para_2,
  //         para_3: careerData.para_3,
  //         para_4: careerData.para_4,
  //         file: careerData.image,
  //       },
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );
  //     if (response.status === 200) {
  //       await getCareerDatas();
  //       successAlert("Success");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
 

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
            value={"Career"}
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
              clickFunction={updateCareerData}
            />
          </Box>
        </Stack>
        <br />
        <form>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextInputField
                label={"Title"}
                name={"title"}
                multiline
                rows={2}
                maxLength={60}
                value={careerData?.title}
                onChange={(e) => handleEditIntro(e)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextInputField
                label={"Paragraph 1"}
                background={skyExColors.skyExTextBoxGrey}
                name={"para_1"}
                multiline
                rows={2}
                maxLength={150}
                value={careerData?.para_1}
                onChange={(e) => handleEditIntro(e)}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 2"}
                height={"1rem"}
                background={skyExColors.skyExTextBoxGrey}
                name={"para_2"}
                rows={3}
                maxLength={270}
                multiline
                value={careerData?.para_2}
                onChange={handleEditIntro}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 3"}
                height={"1rem"}
                name={"para_3"}
                rows={3}
                maxLength={270}
                multiline
                value={careerData?.para_3}
                onChange={handleEditIntro}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 4"}
                height={"1rem"}
                background={skyExColors.skyExTextBoxGrey}
                name={"para_4"}
                rows={3}
                maxLength={200}
                multiline
                value={careerData?.para_4}
                onChange={handleEditIntro}
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
                        typeof careerData?.image === "object"
                          ? URL.createObjectURL(careerData?.image)
                          : Url + careerData?.image
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
                      Choose your Image here
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
                ratio={2650 / 3550}
                image={careerData?.image}
                CroppedImage={(image) =>
                  setCareerData({ ...careerData, image: image })
                }
              />
            </Grid>
          </Grid>
        </form>
      </Card>
    </div>
  );
}

export default Careers;
