import { Box, Card, Grid, Modal, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DescriptionIcon from "@mui/icons-material/Description";
import React, { useState } from "react";
import FormButton from "./FormButton";
import { skyExColors } from "../../controller/constant";
import TextContainer from "./TextContainer";
import TextInputField from "./TextInputField";
import {  instance } from "../../utils/api";
import { errorAlert, successAlert } from "./ToastNotification";
import Crop from "./Crop";

function CustomModal({ open, close, getFaqDatas, Documents, getDocumentFile }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [link, setLink] = useState("");
  const [faqImage, setFaqImage] = useState({ image: null });
  const [openCropModal, setOpenCropModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const createFaqDatas = async () => {
    try {
      const response = await instance.post(
        `/Support/Faq`,
        {
          question: question,
          answer: answer,
          link: link ? link : null,
          file: faqImage.image ? faqImage.image : null,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) {
        await getFaqDatas();
        setAnswer("");
        setQuestion("");
        setLink("");
        setFaqImage({ image: null });
        successAlert("success");
      }
    } catch (e) {
      console.log(e);
      errorAlert("Something went wrong");
    }
  };
  const createDocs = async () => {
    try {
      const response = await instance.post(
        `/Support/Document/Files`,
        {
          name: name,
          description: description,
          file: selectedFile,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) {
        setName("");
        setDescription("");
        successAlert("success");
      }
    } catch (e) {
      console.log(e);
      errorAlert("Something went wrong");
    }
  };
  const postFaq = () => {
    createFaqDatas();
    close();
  };
  const postDocs = () => {
    createDocs();
    close();
    getDocumentFile();
  };
  const handleFile = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
    if (file.name.endsWith(".pdf")) {
      setFileType("pdf");
    } else if (file.name.endsWith(".doc") || file.name.endsWith(".docx")) {
      setFileType("word");
    } else {
      setFileType("file");
    }
  };
  return (
    <div>
      {Documents ? (
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          onClose={close}
        >
          <Card
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "20px",
            }}
          >
            <TextContainer
              fontSize={"30px"}
              fontWeight={700}
              lineHeight={"1.2"}
              color={"#102C38"}
              value={`Add Documents`}
            />
            <br />
            <Grid container spacing={2}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextInputField
                  label={"Doc Title"}
                  name={"name"}
                  multiline
                  rows={2}
                  maxLength={20}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  focused={name}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextInputField
                  label={"Description"}
                  name={"description"}
                  multiline
                  rows={2}
                  maxLength={60}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  focused={description}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <label htmlFor="docsFile">
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
                      {fileType === "pdf" ? (
                        <PictureAsPdfIcon
                          fontSize="large"
                          color="primary"
                          style={{
                            width: "100px",
                            height: "100px",
                          }}
                        />
                      ) : fileType === "word" ? (
                        <DescriptionIcon
                          fontSize="large"
                          color="primary"
                          style={{
                            width: "100px",
                            height: "100px",
                          }}
                        />
                      ) : (
                        <InsertDriveFileIcon
                          fontSize="large"
                          color="primary"
                          style={{
                            width: "100px",
                            height: "100px",
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      {fileName.length > 0 ? (
                        <Typography sx={{ color: "#333" }}>
                          Selected File: {fileName}
                        </Typography>
                      ) : (
                        <>
                          <Typography sx={{ color: "#3498db" }}>
                            Choose your Document here
                          </Typography>

                          <Typography sx={{ color: "#ccc" }}>
                            Supports .pdf, .docx, .docx to any size
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                </label>
                <input
                  accept=".pdf, .doc, .docx"
                  type="file"
                  id="docsFile"
                  style={{ display: "none" }}
                  onChange={(e) => handleFile(e)}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box sx={{ float: "right" }}>
                  <FormButton
                    value={"Submit"}
                    padding={"0rem 2rem"}
                    height={"40px"}
                    background={skyExColors.secondary}
                    shadow={"#fff"}
                    fullWidth
                    border
                    clickFunction={postDocs}
                  />
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Modal>
      ) : (
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          onClose={close}
        >
          <Card
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "20px",
            }}
          >
            <TextContainer
              fontSize={"30px"}
              fontWeight={700}
              lineHeight={"1.2"}
              color={"#102C38"}
              value={`Create FAQ`}
            />
            <br />
            <Grid container spacing={2}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextInputField
                  label={"Question"}
                  name={"question"}
                  multiline
                  rows={2}
                  maxLength={70}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  focused={question}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextInputField
                  label={"Answer"}
                  name={"answer"}
                  multiline
                  rows={2}
                  maxLength={250}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  focused={answer}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <TextInputField
                  label={"Link"}
                  name={"link"}
                  multiline
                  rows={2}
                  maxLength={250}
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  focused={link}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <label htmlFor="image_1" onClick={() => setOpenCropModal(true)}>
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
                      {faqImage.image && typeof faqImage.image === "object" ? (
                        <img
                          src={URL.createObjectURL(faqImage.image)}
                          alt="imag"
                          style={{
                            width: "150px",
                            borderRadius: "10px",
                          }}
                        />
                      ) : (
                        <div>No image selected</div>
                      )}
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography sx={{ color: "#3498db" }}>
                        Choose your Image here
                      </Typography>
                      <Typography sx={{ color: "#ccc" }}>
                        Supports PNG, JPG & WEBP up to any size
                      </Typography>
                    </Box>
                  </Box>
                  <input
                    accept=".png, .jpg, .jpeg"
                    type="file"
                    id="image_1"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setFaqImage({ ...faqImage, image: e.target.files[0] })
                    }
                  />
                </label>
                <Crop
                  open={openCropModal}
                  handleClose={() => setOpenCropModal(false)}
                  ratio={16 / 9}
                  CroppedImage={(a) => setFaqImage({ ...faqImage, image: a })}
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box sx={{ float: "right" }}>
                  <FormButton
                    value={"Submit"}
                    padding={"0rem 2rem"}
                    height={"40px"}
                    background={skyExColors.secondary}
                    shadow={"#fff"}
                    fullWidth
                    border
                    clickFunction={postFaq}
                  />
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Modal>
      )}
    </div>
  );
}

export default CustomModal;
