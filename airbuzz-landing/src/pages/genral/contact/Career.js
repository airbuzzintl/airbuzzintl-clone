"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { fontSizes, skyExColors } from "../../../controller/constant";
import { FormInputFields, TextContainer } from "../../../components/elements";
import { Box, Button, Grid } from "@mui/material";
import { breadcrumbs, emailFormat } from "../../../controller/Common";
import { Form } from "react-bootstrap";
import {
  errorAlert,
  successAlert,
} from "../../../components/elements/ToastNotification";
import { images } from "../../../controller/constant/images";
import { Url, instance } from "../../../utils/api";
import StickyFooter from "../landing/StickyFooter";
import "../../../styles/animation.css";
import ReCAPTCHA from "react-google-recaptcha";
const Career = () => {
  const [formDetails, setFormDetails] = useState({});
  const recaptchaRef = useRef(null);
  const [isClient, setIsClient] = useState(false); // Track if we're on the client side
  const [pdfFile, setPdfFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});
  const [careerData, setCareerData] = useState({});
  const [captchaToken, setCaptchaToken] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
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
    getCareerDatas();
  }, []);

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
    } else {
      handleSubmit();
    }
    setErrorMessage(errorMessage);
    return errorMessage;
  };

  const handleSubmit = async () => {
    if (!recaptchaRef.current) {
      errorAlert("reCAPTCHA is not loaded");
      return;
    }

    const token = recaptchaRef.current.getValue(); // Get the reCAPTCHA token
    if (!token) {
      errorAlert("Please complete the reCAPTCHA");
      return;
    }
    recaptchaRef.current.reset();
    const formData = new FormData();
    formData.append("name", formDetails.name);
    formData.append("email", formDetails.email);
    formData.append("phone", formDetails.phone);
    formData.append("pdf", pdfFile);

    fetch("https://formspree.io/f/xpzevebr", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          successAlert("Your request submitted successfully");
          setCaptchaToken("");
        }
      })
      .catch((error) => {
        errorAlert("");
      });
  };
  const handleFormChange = (name, value) => {
    setErrorMessage({});
    setFormDetails({ ...formDetails, [name]: value });
  };
  const handleChange = (name, value) => {
    setPdfFile(value);
  };

  return (
    <>
      <Wrapper bg={images.CareersBg} className="bg-animation">
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
          {breadcrumbs("Contact / Careers")}
        </div>

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
            alignItems: "center",
            flexWrap: "wrap-reverse",
          }}
        >
          <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
            <Box
              sx={{ px: 2, position: "relative", zIndex: 1 }}
              className="about-heading-animination"
            >
              <TextContainer
                fontSize={fontSizes.careerCardContentHeading.h1}
                fontWeight={"bold"}
                color={"#fff"}
                className={`about-heading-anime`}
                value={careerData?.title}
              />
              <Box
                sx={{
                  display: {
                    xl: "none",
                    lg: "none",
                    md: "none",
                    sm: "flex",
                    xs: "flex",
                  },
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={images.careerImage}
                  alt="airbuzz"
                  style={{
                    width: "100%",
                    display: "block",
                    filter: "drop-shadow(rgb(242, 242, 241) 1px 1px .5px)",
                  }}
                />
              </Box>
              <TextContainer
                fontSize={fontSizes.careerCardContentDescription.sm}
                color={skyExColors.textGrey}
                value={careerData?.para_1}
                paddingTop={"1rem"}
                textAlign={"justify"}
              />
              <TextContainer
                fontSize={fontSizes.careerCardContentDescription.sm}
                color={skyExColors.textGrey}
                value={careerData?.para_2}
                paddingTop={"1rem"}
                textAlign={"justify"}
              />
              <TextContainer
                fontSize={fontSizes.careerCardContentDescription.sm}
                color={skyExColors.textGrey}
                value={careerData?.para_3}
                paddingTop={"1rem"}
                textAlign={"justify"}
              />
              <TextContainer
                fontSize={fontSizes.careerCardContentDescription.sm}
                color={skyExColors.textGrey}
                value={careerData?.para_4}
                paddingTop={"1rem"}
                textAlign={"justify"}
              />
            </Box>
            <br />
            <br />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GlassyBackground>
                <Form style={{ padding: "1rem" }}>
                  <TextContainer
                    fontSize={fontSizes.careerCardContentHeading.h2}
                    color={"#fff"}
                    fontWeight={"bold"}
                    value={"Get in touch with us."}
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
                    if="email"
                    background={skyExColors.skyExTextBoxGrey}
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
                    maxLength={10}
                    background={skyExColors.skyExTextBoxGrey}
                    name={"phone"}
                    value={formDetails.phone}
                    handleChange={handleFormChange}
                    error={errorMessage.phone}
                    helperText={errorMessage.phone}
                  />
                  <Box mt={1} />

                  <FormInputFields
                    type={"file"}
                    id={"resume"}
                    size={"small"}
                    name={"file"}
                    focused
                    background={skyExColors.skyExTextBoxGrey}
                    handleChange={handleChange}
                    error={errorMessage.file}
                    helperText={errorMessage.file}
                    placeholder={
                      "Upload CV  *which can be either an image or a pdf."
                    }
                  />
                  <Box mt={1} />
                  <Box
                    display="flex"
                    justifyContent="center"
                    sx={{ transform: "scale(0.85)", transformOrigin: "0 0" }}
                  >
                    {isClient && (
                      <ReCAPTCHA
                        sitekey={"6Le-SDIrAAAAAOV96FmwXnpx46s9svzo4_PUk6sK"}
                        ref={recaptchaRef}
                        // size="invisible"
                        onChange={(token) => setCaptchaToken(token)}
                      />
                    )}
                  </Box>

                  <Box mt={1} />

                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: skyExColors.secondary,
                    }}
                    fullWidth
                    onClick={validation}
                    disabled={!captchaToken}
                  >
                    Submit
                  </Button>
                </Form>
              </GlassyBackground>
            </Box>
            <br />
          </Grid>
          <Grid
            item
            xl={5}
            lg={5}
            md={5}
            sm={0}
            xs={0}
            sx={{
              display: {
                xl: "flex",
                lg: "flex",
                md: "flex",
                sm: "none",
                xs: "none",
              },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={Url + careerData?.image}
                alt="airbuzz"
                style={{
                  width: "100%",
                  display: "block",
                  filter: "drop-shadow(rgb(242, 242, 241) 1px 1px .5px)",
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <br />
      </Wrapper>
      <StickyFooter />
    </>
  );
};

export default Career;
const Wrapper = styled.section`
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );

  width: 100%;
  padding: 7% 1.5% 5% 1.5%;
  background-position: center;
  background-size: cover;

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
  width: 96%;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
