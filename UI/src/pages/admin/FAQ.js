import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { FormButton, TextContainer } from "../../components/elements";
import CustomModal from "../../components/elements/CustomModal";
import { skyExColors } from "../../controller/constant";
import TextInputField from "../../components/elements/TextInputField";
import { Url, instance } from "../../utils/api";
import {
  errorAlert,
  successAlert,
} from "../../components/elements/ToastNotification";
import Crop from "../../components/elements/Crop";

function FAQ() {
  const [faqTitle, setFaqTitle] = useState();
  const [faqData, setFaqData] = useState([]);
  const getFaqDatas = async () => {
    try {
      const response = await instance.get(`/Support/Faq`);
      if (response.status === 200) {
        const { faq_title, faq } = response.data;
        setFaqTitle(faq_title);
        setFaqData(faq);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getFaqDatas();
  }, []);

  const editFaq = async (e, id) => {
    const { name, value } = e.target;
    setFaqData((prev) =>
      prev.map((data) => (data.id === id ? { ...data, [name]: value } : data))
    );
  };

  const updateFaqTitle = async (a) => {
    a.preventDefault();
    try {
      await instance.get(`/Support/updateFaqTitle/${faqTitle}`);
      await getFaqDatas();
      successAlert("Success");
    } catch (err) {
      console.log(err);
      errorAlert("Something went wrong");
    }
  };

  const updateFaq = async (e) => {
    try {
      await instance.put(
        `/Support/Faq`,
        {
          id: e.id,
          question: e.question,
          answer: e.answer,
          link: e.link,
          file: e.image ? e.image : null,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      await getFaqDatas();
      successAlert("success");
    } catch (err) {
      console.log(err);
      errorAlert("Something went wrong");
    }
  };
  const deleteFaq = async (e) => {
    try {
      await instance.delete(`/Support/Faq?id=${e.id}`);
      await getFaqDatas();
      successAlert("success");
    } catch (err) {
      console.log(err);
      errorAlert("Something went wrong");
    }
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openCropModal, setOpenCropModal] = useState(false);
  const [id, setId] = useState();

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#f3f3f3",
      }}
    >
      <CustomModal open={open} close={handleClose} getFaqDatas={getFaqDatas} />
      <Stack
        sx={{
          width: { md: "70%", xs: "95%" },
          margin: "auto",
          flexDirection: {
            xl: "row",
            lg: "row",
            md: "row",
            sm: "row",
            xs: "row",
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
          value={"FAQ"}
        />
        <Box>
          <FormButton
            value={"Add Faq"}
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
      <form onSubmit={(a) => updateFaqTitle(a)}>
        <Card
          sx={{
            padding: "3.5vh",
            width: { md: "70%", xs: "95%" },
            margin: "auto",
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          }}
        >
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
                name={"faq_title"}
                multiline
                rows={2}
                maxLength={40}
                value={faqTitle}
                onChange={(a) => setFaqTitle(a.target.value)}
                required
              />
            </Grid>
          </Grid>
        </Card>
      </form>
      <br />
      <form>
        <Grid container spacing={2}>
          {faqData?.map((faqItem, i) => (
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} key={faqItem.id}>
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
                    width: "100%",
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
                    fontSize={"20px"}
                    fontWeight={700}
                    lineHeight={"1.2"}
                    color={"#102C38"}
                    value={`Faq ${i + 1}`}
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
                      clickFunction={() => deleteFaq(faqItem)}
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
                      clickFunction={() => updateFaq(faqItem)}
                    />
                  </Box>
                </Stack>
                <Box>
                  <TextInputField
                    label={"Question"}
                    name={"question"}
                    multiline
                    rows={2}
                    maxLength={70}
                    value={faqItem.question}
                    onChange={(a) => editFaq(a, faqItem.id)}
                    focused={faqItem.question}
                  />
                </Box>
                <TextInputField
                  label={"Answer"}
                  name={"answer"}
                  multiline
                  rows={3}
                  maxLength={250}
                  value={faqItem.answer}
                  onChange={(a) => editFaq(a, faqItem.id)}
                  focused={faqItem.answer}
                />

                {faqItem?.link && faqItem?.link !== "undefined" ? (
                  <TextInputField
                    label={"Link"}
                    name={"link"}
                    multiline
                    rows={2}
                    maxLength={250}
                    value={faqItem.link}
                    onChange={(a) => editFaq(a, faqItem.id)}
                    focused={faqItem.link}
                  />
                ) : null}

                {faqItem?.image ? (
                  <Box sx={{ marginTop: "20px" }}>
                    <label
                      onClick={() => {
                        setOpenCropModal(true);
                        setId(faqItem.id);
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
                              typeof faqItem?.image === "object"
                                ? URL.createObjectURL(faqItem.image)
                                : Url + faqItem.image
                            }
                            alt="images"
                            style={{
                              width: "150px",
                              height: "120px",
                              borderRadius: "10px",
                            }}
                          />
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
                    </label>
                    <Crop
                      open={openCropModal}
                      handleClose={() => setOpenCropModal(false)}
                      ratio={16 / 9}
                      images={faqItem.image}
                      CroppedImage={(croppedImage) => {
                        editFaq(
                          {
                            target: {
                              name: "image",
                              value: croppedImage,
                            },
                          },
                          id
                        );
                      }}
                    />
                  </Box>
                ) : null}
              </Card>
            </Grid>
          ))}
        </Grid>
      </form>
    </div>
  );
}

export default FAQ;
