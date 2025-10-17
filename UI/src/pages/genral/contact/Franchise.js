import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fontSizes, skyExColors } from "../../../controller/constant";
import { FormInputFields, TextContainer } from "../../../components/elements";
import { Box, Button, Grid } from "@mui/material";
import { Form } from "react-bootstrap";
import { breadcrumbs, emailFormat } from "../../../controller/Common";
import {
  errorAlert,
  successAlert,
} from "../../../components/elements/ToastNotification";
import { images } from "../../../controller/constant/images";
import { instance } from "../../../utils/api";
import StickyFooter from "../landing/StickyFooter"; 

const Franchise = () => {
  const [formDetails, setFormDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const validation = () => {
    const errorMessage = {};
    if (!formDetails.name) {
      errorMessage.name = "Name is required";
    }
    if (!formDetails.email) {
      errorMessage.email = "Email is required";
    }
    if (formDetails.email && !emailFormat.test(formDetails.email)) {
      errorMessage.email = "Invalid";
    }
    if (!formDetails.phone) {
      errorMessage.phone = "Phone is required";
    }

    if (!formDetails.message) {
      errorMessage.message = "Message is required";
    } else {
      redirectMe();
    }
    setErrorMessage(errorMessage);
  };

  function redirectMe() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "fs_ab1=control");

    var raw = JSON.stringify(formDetails);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://formspree.io/f/xpzevebr", requestOptions)
      .then((response) =>
        response.status === 200
          ? successAlert("Your request submitted successfully")
          : errorAlert("Error")
      )
      .catch((error) => console.log("error", error));

    return false;
  }

  const handleFormChange = (name, value) => {
    setErrorMessage({});
    setFormDetails({ ...formDetails, [name]: value });
  };
  const [franchise, setFranchise] = useState({});
  const getFranchise = async () => {
    try {
      const response = await instance.get(`/Contact/Franchise`);
      if (response?.status === 200) {
        setFranchise(response?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFranchise();
  }, []);
  return (
    <section style={{ minHeight: "100%" }}>
      <Wrapper bg={images.FaqBg} class="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
        <div id="stars4"></div>
        <div
          style={{
            position: "absolute",
            top: "6rem",
            left: "6rem",
            zIndex: 99,
          }}
        >
          {breadcrumbs("Contact / Franchise")}
        </div>
        <br />
        <br />
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: {
              xl: "0rem",
              lg: "2.5rem",
              md: "4.5rem",
              sm: "4.5rem",
              xs: "4.5rem",
            },
            minHeight: "80%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
            <Box
              sx={{ px: 2, position: "relative", zIndex: 1 }}
              className={"franchise-heading-animination"}
            >
              <TextContainer
                fontSize={fontSizes.careerCardContentHeading.h1}
                fontWeight={"bold"}
                color={"#fff"}
                value={franchise[0]?.title}
                textAlign={"jutify"}
                className={`franchise-heading-anime`}
                position={"relative"}
                zIndex={1}
              />
              <TextContainer
                fontSize={fontSizes.careerCardContentDescription.sm}
                color={skyExColors.textGrey}
                value={franchise[0]?.para1}
                paddingTop={"1rem"}
                textAlign={"jutify"}
              />
              <TextContainer
                fontSize={fontSizes.careerCardContentDescription.sm}
                color={skyExColors.textGrey}
                value={franchise[0]?.para2}
                paddingTop={"1rem"}
                textAlign={"jutify"}
              />
              <TextContainer
                fontSize={fontSizes.careerCardContentDescription.sm}
                color={skyExColors.textGrey}
                value={franchise[0]?.para3}
                paddingTop={"1rem"}
                textAlign={"jutify"}
              />
              <TextContainer
                fontSize={fontSizes.careerCardContentDescription.sm}
                color={skyExColors.textGrey}
                value={franchise[0]?.para4}
                paddingTop={"1rem"}
                textAlign={"jutify"}
              />
              <TextContainer
                fontSize={fontSizes.careerCardContentDescription.sm}
                color={skyExColors.textGrey}
                value={franchise[0]?.para5}
                paddingTop={"1rem"}
                textAlign={"jutify"}
              />
            </Box>
          </Grid>
          <Grid
            item
            xl={5}
            lg={5}
            md={5}
            sm={12}
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GlassyBackground>
                <Form style={{ padding: "1rem", paddingTop: "0.40rem" }}>
                  <TextContainer
                    fontSize={fontSizes.careerCardContentHeading.h2}
                    color={"#fff"}
                    fontWeight={"bold"}
                    value={"Contact our team to start the process."}
                    paddingTop={"1rem"}
                  />

                  <Box mt={1} />
                  <TextContainer
                    fontSize={fontSizes.careerCardContentDescription.sm}
                    color={skyExColors.grey}
                    value={
                      "Please fill out and submit the form below and someone form our team will contact you."
                    }
                  />
                  <Box mt={1} />
                  <FormInputFields
                    placeholder={"Name*"}
                    size={"small"}
                    background={skyExColors.skyExTextBoxGrey}
                    id="name"
                    name="name"
                    handleChange={handleFormChange}
                    value={formDetails.name}
                    error={errorMessage.name}
                    helperText={errorMessage.name}
                  />
                  <Box mt={1} />
                  <FormInputFields
                    placeholder={"Email*"}
                    size={"small"}
                    background={skyExColors.skyExTextBoxGrey}
                    id="email"
                    name={"email"}
                    handleChange={handleFormChange}
                    value={formDetails.email}
                    error={errorMessage.email}
                    helperText={errorMessage.email}
                  />
                  <Box mt={1} />
                  <FormInputFields
                    placeholder={"Phone*"}
                    size={"small"}
                    background={skyExColors.skyExTextBoxGrey}
                    id="phone"
                    name={"phone"}
                    value={formDetails.phone}
                    handleChange={handleFormChange}
                    error={errorMessage.phone}
                    helperText={errorMessage.phone}
                  />
                  <Box mt={1} />
                  <FormInputFields
                    type={"text"}
                    multiline={3}
                    rows={3}
                    name={"message"}
                    placeholder={"Message*"}
                    background={skyExColors.skyExTextBoxGrey}
                    value={formDetails.message}
                    handleChange={handleFormChange}
                    error={errorMessage.message}
                    helperText={errorMessage.message}
                  />
                  <Box mt={1} />

                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: skyExColors.secondary,
                    }}
                    fullWidth
                    onClick={validation}
                  >
                    Submit
                  </Button>
                </Form>
              </GlassyBackground>
            </Box>
          </Grid>
        </Grid>
      </Wrapper>
      <StickyFooter />
    </section>
  );
};

export default Franchise;
const Wrapper = styled.section`
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
  width: 100%;
  background-position: center;
  background-size: cover;
  padding: 7% 0% 7% 2.5%;

  min-height: 100vh;
  background-attachment: fixed;
  overflow: hidden;
`;

const GlassyBackground = styled.div`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  // border-radius: 10px;
  min-height: 40vh;
  width: 80%;
  padding-top: 7%;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
