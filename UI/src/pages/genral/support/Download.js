import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HiDocumentText } from "react-icons/hi";
import {
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";
import {
  breadcrumbs,
  countryCodes,
} from "../../../controller/Common";
import { fontSizes, skyExColors } from "../../../controller/constant";
import { FormInputFields, TextContainer } from "../../../components/elements";
import SearchIcon from "@mui/icons-material/Search";
import { Form } from "react-bootstrap";
import {
  errorAlert,
  successAlert,
} from "../../../components/elements/ToastNotification";
import SelectWithTextField from "../../../components/elements/SelectWithTextField";
import { Url, downloadUrl, instance } from "../../../utils/api";
import StickyFooter from "../landing/StickyFooter"; 

export const DocumentCard = ({ e }) => {
  const [hover, setHover] = useState(false);

  return (
    <a
      title={e.description}
      style={{
        border: "none",
        textDecoration: "none",
      }}
      href={`${downloadUrl}${e.docfile}`}
    >
      <Card
        sx={{
          height: "15rem",
          width: "15rem",
          zIndex: 99,
          border: "1px solid black",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: skyExColors.secondary,
            boxShadow: "none",
            border: 1,
            color: "white",
          },
          "&:before": {
            content: '""',
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            transition: "all 1s fade-in",
          },
          "&:hover::before": {
            content: '""',
            backgroundImage: `url(https://cdn.icon-icons.com/icons2/2963/PNG/512/macos_big_sur_download_folder_icon_186042.png)`,
            backgroundPosition: "center",
            backgroundSize: "45px 45px",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: "12rem",
          },
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          style={{
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <TextContainer
            fontSize={fontSizes.careerCardContentDescription.sm}
            fontWeight={"bold"}
            color={hover ? "white" : skyExColors.blue}
            value={e.name}
            gutterBottom
          />
          <TextContainer
            fontSize={fontSizes.careerCardContentDescription.xs}
            fontWeight={"bold"}
            color={hover ? "white" : skyExColors.skyExDarkGrey}
            value={e.description}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              height: "100%",
            }}
          >
            <HiDocumentText
              color={hover ? "white" : skyExColors.blue}
              size={40}
            />
          </div>
        </div>
      </Card>
    </a>
  );
};

const Download = () => {
  const [searchText, setSearchText] = useState("");
  const [formDetails, setFormDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [document, setDocumentFile] = useState([]);
  const [filteredData, setFilteredData] = useState(document);

  const handleChange = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
    filterData(searchText);
  };
  const handleFormDetails = (name, value) => {
    setErrorMessage({});
    setFormDetails({ ...formDetails, [name]: value });
  };

  const filterData = (searchText) => {
    const filteredData = document.filter((item) => {
      const itemText = item.name
        .replace(/\s/g, "")
        .replace(/[!@#$%^&*(),.?'":{}|<>]/, "")
        .toLowerCase();
      const searchQuery = searchText
        .replace(/\s/g, "")
        .replace(/[!@#$%^&*(),.?'":{}|<>]/, "")
        .toLowerCase();
      return itemText.includes(searchQuery);
    });
    setFilteredData(filteredData);
  };
  const validation = () => {
    const errorMessage = {};

    if (!formDetails?.accountForm) {
      errorMessage.accountForm = "*Required";
    }
    if (!formDetails?.companyLicense) {
      errorMessage.companyLicense = "*Required";
    }
    if (!formDetails?.idProof) {
      errorMessage.idProof = "*Required";
    }
    if (!formDetails.countryCode) {
      errorMessage.countryCode = "*Required";
    }
    if (!formDetails.ContactName) {
      errorMessage.ContactName = "*Required";
    }
    if (!formDetails?.ContactNumber) {
      errorMessage.ContactNumber = "*Required";
    } else if (
      formDetails?.accountForm &&
      formDetails?.companyLicense &&
      formDetails?.idProof &&
      formDetails?.ContactName.length > 1 &&
      formDetails?.ContactNumber &&
      formDetails?.countryCode
    ) {
      handleSubmit();
    }
    setErrorMessage(errorMessage);
    return errorMessage;
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("Account Opening form", formDetails.accountForm);
    formData.append("company License", formDetails.companyLicense);
    formData.append("Emirates ID or Passport Copy", formDetails.idProof);
    formData.append("Contact Name", formDetails.ContactName);
    formData.append(
      "Contact Number",
      `${formDetails.countryCode} ${formDetails.ContactNumber}`
    );

    fetch("https://formspree.io/f/xpzevebr", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setFormDetails({});
          successAlert("Your request submitted successfully");
        }
      })
      .catch(() => {
        errorAlert("Error occured while submitting the form");
      });
  };

  const [documentData, setDocumentData] = useState({});

  const getDocument = async () => {
    try {
      const response = await instance.get(`/Support/Document`);
      if (response?.status === 200) {
        setDocumentData(response?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getDocumentFile = async () => {
    try {
      const response = await instance.get(`/Support/Document/Files`);
      if (response?.status === 200) {
        setDocumentFile(response?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDocumentFile();
  }, []);

  useEffect(() => {
    getDocument();
  }, []);
  return (
    <>
      <Wrapper>
        <div
          style={{
            paddingTop: "6rem",
            paddingLeft: "6rem",
          }}
        >
          {breadcrumbs("Support / Documents")}
        </div>
        <Grid container spacing={2}>
          <Grid
            item
            xl={6}
            lg={6}
            md={0}
            sm={0}
            xs={0}
            sx={{
              display: {
                xl: "flex",
                lg: "flex",
                md: "none",
                sm: "none",
                xs: "none",
              },
              flexDirection: "column",
            }}
          >
            <Box sx={{ px: 2 }}>
              <TextContainer
                fontSize={fontSizes.headings}
                fontWeight={"bold"}
                color={"#fff"}
                value={documentData.title}
              />
            </Box>
            <Box sx={{ px: 2, position: "relative", paddingTop: "4%" }}>
              <Img
                src={`${Url}${documentData.image}`}
                alt="landingImage"
                style={{ height: "auto" }}
              />
            </Box>
            <Box sx={{ px: 2, position: "relative" }}>
              <TextContainer
                fontSize={fontSizes.careerCardContentDescription.sm}
                color={skyExColors.textGrey}
                value={documentData.para_1}
                paddingTop={"1rem"}
                textAlign={"justify"}
              />
              <TextContainer
                fontSize={fontSizes.careerCardContentDescription.sm}
                color={skyExColors.textGrey}
                value={documentData.para_2}
                paddingTop={"1rem"}
                textAlign={"justify"}
              />
              <TextContainer
                fontSize={fontSizes.careerCardContentDescription.sm}
                color={skyExColors.textGrey}
                value={documentData.para_3}
                paddingTop={"1rem"}
                textAlign={"justify"}
              />
            </Box>
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
            sx={{
              width: "100%",
              px: "2%",
            }}
          >
            <br />
            <div>
              <OutlinedInput
                id="outlined-adornment-weight"
                sx={{ background: "#fff" }}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                placeholder={"Search..."}
                value={searchText}
                handleChange={handleChange}
              />
            </div>
            <br />
            <Grid
              container
              spacing={0.5}
              sx={{
                height: {
                  xl: "40vh",
                  lg: "40vh",
                  md: "auto",
                  sm: "auto",
                  xs: "auto",
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {document.map((e, i) => (
                <Grid
                  item
                  xl={6}
                  lg={6}
                  md={6}
                  sm={6}
                  xs={12}
                  key={i}
                  sx={{
                    mt: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <DocumentCard e={e} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <GlassyBackground>
                <Form style={{ padding: "1rem" }}>
                  <TextContainer
                    fontSize={fontSizes.careerCardContentHeading.h2}
                    color={"#fff"}
                    fontWeight={"bold"}
                    value={"Get your AirBuzz Biz Account Today."}
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

                  <FormInputFields
                    label={"Upload Account Opening Form (pdf)*"}
                    size={"small"}
                    background={skyExColors.skyExTextBoxGrey}
                    type={"file"}
                    name={"accountForm"}
                    handleChange={handleFormDetails}
                    error={errorMessage.accountForm}
                    helperText={errorMessage.accountForm}
                  />
                  <Box mt={1} />
                  <FormInputFields
                    label={"Upload Company License (pdf/ Image)*"}
                    size={"small"}
                    if="email"
                    background={skyExColors.skyExTextBoxGrey}
                    name={"companyLicense"}
                    handleChange={handleFormDetails}
                    type={"file"}
                    error={errorMessage.companyLicense}
                    helperText={errorMessage.companyLicense}
                  />
                  <Box mt={1} />
                  <FormInputFields
                    label={"Upload Emirates ID or Passport Copy (PDF/ image)*"}
                    size={"small"}
                    maxLength={10}
                    background={skyExColors.skyExTextBoxGrey}
                    name={"idProof"}
                    handleChange={handleFormDetails}
                    type={"file"}
                    error={errorMessage.idProof}
                    helperText={errorMessage.idProof}
                  />

                  <Box
                    mt={1}
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "2%",
                    }}
                  >
                    <Box sx={{ flexGrow: "1" }} mt={1}>
                      <FormInputFields
                        type={"text"}
                        placeholder={"Contact Name"}
                        id={"ContactName"}
                        size={"small"}
                        name={"ContactName"}
                        value={formDetails.ContactName}
                        handleChange={handleFormDetails}
                        background={skyExColors.skyExTextBoxGrey}
                        error={errorMessage.ContactName}
                        helperText={errorMessage.ContactName}
                      />
                    </Box>

                    <Box sx={{ flexGrow: "1" }} mt={1}>
                      <SelectWithTextField
                        list={countryCodes}
                        displayValue={"name"}
                        selectedValue={"code"}
                        placeholder={"Contact Number"}
                        type={"tel"}
                        handleselectChange={handleFormDetails}
                        selectName={"countryCode"}
                        selectValue={formDetails.countryCode}
                        textname={"ContactNumber"}
                        textValue={formDetails.ContactNumber}
                        handleTextChange={handleFormDetails}
                        selectError={errorMessage.countryCode}
                        textError={errorMessage.ContactNumber}
                        textErrorText={errorMessage.ContactNumber}
                      />
                    </Box>
                  </Box>
                  <Box mt={1} />
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: skyExColors.secondary,
                    }}
                    onClick={validation}
                    fullWidth
                  >
                    Submit
                  </Button>
                </Form>
              </GlassyBackground>
            </Box>
          </Grid>
        </Grid>

        <br />
        <StickyFooter />
      </Wrapper>
    </>
  );
};

export default Download;

const Wrapper = styled.section`
  background: linear-gradient(180deg, #102c38 0%, #0d1f26 100%);
  width: 100%;
  background-position: fixed;
  background-size: cover;
  overflow-x: hidden;
  position: relative;
  min-height: 10vh;
  padding: 1% 1.5%;
`;
const Img = styled.img`
  width: 40vw;
  height: auto;
  max-height: 90%;
  filter: drop-shadow(white 2px 1px 0px) brightness(1) saturate(1.5);
  @media (max-width: 800px) {
    background-size: cover;
  }
`;

const GlassyBackground = styled.div`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  // border-radius: 10px;
  min-height: 50vh;
  width: 95%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin-top: 4%;
`;
