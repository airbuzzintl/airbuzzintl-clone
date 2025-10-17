import { Box, Card, Grid, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import FormButton from "./FormButton";
import { skyExColors } from "../../controller/constant";
import TextContainer from "./TextContainer";
import TextInputField from "./TextInputField";
import {  instance } from "../../utils/api";
import { errorAlert, successAlert } from "./ToastNotification";

function AboutModal({ open, close, getChooseUs }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const createAbout = async () => {
    try {
      const response = await instance.post(
        `/About/Chooseus`,
        {
          title: data.title,
          para: data.description,
          file: data.image,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) {
        successAlert("success");
      }
    } catch (e) {
      console.log(e);
      errorAlert("Something went wrong");
    }
  };
  const postAbout = async () => {
    try {
      await createAbout();
      await getChooseUs();
      close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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
            value={`Add`}
          />
          <br />
          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Title"}
                name={"title"}
                multiline
                rows={2}
                maxLength={50}
                required
                value={data.title1}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Description"}
                name={"description"}
                multiline
                rows={2}
                maxLength={200}
                required
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <label htmlFor="serviceImage">
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
                    {data.image ? (
                      <img
                        src={
                          data?.image?.name && typeof data?.image === "object"
                            ? URL.createObjectURL(data?.image)
                            : ""
                        }
                        alt="imag"
                        style={{
                          width: "150px",
                          borderRadius: "10px",
                        }}
                      />
                    ) : (
                      ""
                    )}
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
              <input
                accept=".png, .jpg, .jpeg"
                type="file"
                id="serviceImage"
                style={{ display: "none" }}
                onChange={(e) => setData({ ...data, image: e.target.files[0] })}
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
                  clickFunction={postAbout}
                />
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </div>
  );
}

export default AboutModal;
