"use client";
import { Box, Grid, Stack } from "@mui/material";
import { useState } from "react";

import styled from "styled-components";
import {
  CustomizedSteppers,
  FormButton,
  TextContainer,
} from "../../../components/elements";
import { EstimationForm } from "../../../components/sectionElements/estimation";
import { skyExColors } from "../../../controller/constant";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { errorAlert } from "../../../components/elements/ToastNotification";
import { emailFormat } from "../../../controller/Common";
import { Url } from "../../../utils/api";

const Buttons = ({
  step,
  setStep,
  estimation,
  setEstimation,
  setErrorMessage,
}) => {
  const changeStep = () => {
    if (step < 2) {
      setStep((step) => step + 1);
    }
  };

  const handleSubmit = () => {
    if (step === 0) {
      setErrorMessage({});
      validationOne();
    }

    if (step === 1) {
      validationTwo();
    }
  };
  const sucess = () => {
    changeStep();
    setEstimation("");
  };

  const validationOne = () => {
    const errorMessage = {};

    if (!estimation.serviceType) {
      errorMessage.serviceType = "ServiceType is required";
    }
    if (!estimation.productList) {
      errorMessage.productList = "ProductList is required";
    }
    if (!estimation.email) {
      errorMessage.email = "Email is required";
    }
    if (estimation.email && !emailFormat.test(estimation.email)) {
      errorMessage.email = "Invalid";
    }

    if (!estimation.weight) {
      errorMessage.weight = "Weight is required";
    }
    if (!estimation.type) {
      errorMessage.type = "Type is required";
    } else if (
      estimation.serviceType &&
      estimation.productList &&
      estimation.email &&
      emailFormat.test(estimation.email) &&
      estimation.weight &&
      estimation.type
    ) {
      changeStep();
    }
    setErrorMessage(errorMessage);
    return errorMessage;
  };
  const validationTwo = () => {
    const errorMessage = {};
    if (!estimation.originCountry) {
      errorMessage.originCountry = "Origin Country is required";
    }
    if (!estimation.originCity) {
      errorMessage.originCity = "Origin City is required";
    }

    if (!estimation.destinationCountry) {
      errorMessage.destinationCountry = "Destination Country is required";
    }
    if (!estimation.destinationCity) {
      errorMessage.destinationCity = "Destination City is required";
    } else if (
      estimation.originCountry &&
      estimation.originCity &&
      estimation.destinationCountry &&
      estimation.destinationCity
    ) {
      redirectMe();
    }
    setErrorMessage(errorMessage);
    return errorMessage;
  };

  const redirectMe = () => {
    const formData = new FormData();
    formData.append("Email address", estimation.email);
    formData.append("Service type", estimation.serviceType);
    formData.append("Product list", estimation.productList);
    formData.append("Weight", estimation.weight + "kg");
    formData.append("Type", estimation.type);
    formData.append("Origin Country", estimation.originCountry);
    formData.append("Origin City", estimation.originCity);
    formData.append("Destination Country", estimation.destinationCountry);
    formData.append("Destination City", estimation.destinationCity);

    fetch("https://formspree.io/f/xpzevebr", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          sucess();
        }
      })
      .catch(() => {
        errorAlert("Error occured while submitting the form");
      });
  };
  return (
    <Stack
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: step == 0 ? "flex-end" : "space-between",
      }}
    >
      {step > 0 && (
        <Box
          value={"Next"}
          sx={{
            padding: ".5rem ",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            step > 0 && setStep(step - 1);
          }}
        >
          <MdOutlineArrowBackIosNew color="#fff" />
          <TextContainer
            value={"Back"}
            fontWeight={500}
            cursor={"pointer"}
            color={skyExColors.skyExTextBoxGrey}
          />
        </Box>
      )}

      <FormButton
        value={step === 0 ? "Next" : "Submit Form"}
        padding={".5rem 2rem"}
        background={skyExColors.secondary}
        border
        clickFunction={handleSubmit}
      />
    </Stack>
  );
};

const Estimation = ({ estimationData }) => {
  const [step, setStep] = useState(0);
  const [estimation, setEstimation] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  return (
    <Wrapper>
      <Grid container>
        <Grid
          item
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImgWrapper>
            <Img
              draggable={false}
              src={`${Url}${estimationData?.image}`}
              alt="skyEx"
            />
          </ImgWrapper>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <br />
          <TextContainer
            textAlign={"center"}
            fontSize={"44px"}
            color={skyExColors.skyExTextBoxGrey}
            value={estimationData?.title}
            fontWeight={"700"}
          />
          <br />
          <br />
          <CustomizedSteppers verificationStage={step} />
          <FormWrapper id="Estimation1">
            <br />
            <EstimationForm
              step={step}
              estimation={estimation}
              setEstimation={setEstimation}
              setStep={setStep}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
            {step < 2 && (
              <Buttons
                step={step}
                setStep={setStep}
                estimation={estimation}
                setEstimation={setEstimation}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            )}
          </FormWrapper>
        </Grid>
      </Grid>
      <br />
      <br />
    </Wrapper>
  );
};

export default Estimation;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-tems: center;
`;
const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Img = styled.img`
  width: 100%;
  display: block;
  margin: 0 auto;
  height: auto;
`;
const FormWrapper = styled.div`
  padding: 2% 8%;
  @media (max-width: 600px) {
    padding: 2% 4%;
  }
`;
