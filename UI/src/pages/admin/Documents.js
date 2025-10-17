import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { FormButton, TextContainer } from "../../components/elements";
import { skyExColors } from "../../controller/constant";
import { Url, instance } from "../../utils/api";
import CustomModal from "../../components/elements/CustomModal";
import TextInputField from "../../components/elements/TextInputField";
import {
  errorAlert,
  successAlert,
} from "../../components/elements/ToastNotification";
import { DocumentCard } from "../genral/support/Download";
import Crop from "../../components/elements/Crop";

function Documents() {
  const [documentData, setDocumentData] = useState({});
  const [documentFile, setDocumentFile] = useState([]);
  const [openCropModal, setOpenCropModal] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    getDocument();
    getDocumentFile();
  }, []);
  const EditDocument = (e) => {
    setDocumentData({
      ...documentData,
      [e.target.name]: e.target.value,
    });
  };
  const updateDocument = async () => {
    try {
      await instance.put(
        `/Support/Document/1`,
        {
          title: documentData.title,
          para_1: documentData.para_1,
          para_2: documentData.para_2,
          para_3: documentData.para_3,
          file: documentData.image,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await getDocument();
      successAlert("Success");
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
      <CustomModal
        open={open}
        close={handleClose}
        Documents
        getDocumentFile={getDocumentFile}
      />
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
            value={"Documents"}
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
              clickFunction={updateDocument}
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
                maxLength={20}
                multiline
                rows={2}
                value={documentData.title}
                onChange={EditDocument}
                focused={documentData.title}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 1"}
                height={"1rem"}
                background={skyExColors.skyExTextBoxGrey}
                name={"para_1"}
                rows={6}
                maxLength={350}
                multiline
                value={documentData.para_1}
                focused={documentData.para_1}
                onChange={(e) => EditDocument(e)}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 2"}
                height={"1rem"}
                background={skyExColors.skyExTextBoxGrey}
                name={"para_2"}
                rows={6}
                maxLength={600}
                multiline
                value={documentData.para_2}
                focused={documentData.para_2}
                onChange={(e) => EditDocument(e)}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Paragraph 3"}
                height={"1rem"}
                background={skyExColors.skyExTextBoxGrey}
                name={"para_3"}
                rows={4}
                maxLength={200}
                multiline
                value={documentData.para_3}
                focused={documentData.para_3}
                onChange={(e) => EditDocument(e)}
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
                        typeof documentData.image === "object"
                          ? URL.createObjectURL(documentData.image)
                          : Url + documentData.image
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
                image={documentData.image}
                CroppedImage={(image) =>
                  setDocumentData({ ...documentData, image: image })
                }
              />
            </Grid>
          </Grid>
        </form>
      </Card>

      <Card
        sx={{
          position: "relative",
          top: "20px",
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
            value={"Document Files"}
          />
          <Box>
            <FormButton
              value={"Add Docs"}
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
        <br />
        <form
          style={{
            textAlign: "-webkit-center",
          }}
        >
          <Grid container spacing={2}>
            {documentFile.map((e, i) => (
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <DocumentCard e={e} />
              </Grid>
            ))}
          </Grid>
        </form>
      </Card>
    </div>
  );
}

export default Documents;
