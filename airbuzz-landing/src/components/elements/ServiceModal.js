import {
  Box,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FormButton from "./FormButton";
import { skyExColors } from "../../controller/constant";
import TextContainer from "./TextContainer";
import TextInputField from "./TextInputField";
import { instance } from "../../utils/api";
import { errorAlert, successAlert } from "./ToastNotification";

function ServiceModal({ open, close, serviceType, getProvideServices }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    image: null,
    path: "",
    button_name: "",
  });
  const paths = [
    { id: 1, path: "none", name: "none" },
    {
      id: 2,
      path: "/Services/International",
      name: "International Services",
    },
    { id: 3, path: "/Services/Domestic", name: "Domestic services" },
    { id: 4, path: "/Contact/Careers", name: "Career" },
    { id: 5, path: "/Contact/Franchise", name: "Franchise" },
    { id: 6, path: "/Support/FAQ", name: "Faq" },
    { id: 7, path: "/Support/Downloads", name: "Documents" },
    { id: 8, path: "/About", name: "About" },
    { id: 9, path: "#estimation", name: "Estimation" },
  ];
  const createService = async () => {
    try {
      const response = await instance.post(
        `/Service/createProvideServices`,
        {
          title: data.title,
          description: data.description,
          service_type: serviceType,
          file: data.image,
          path: data.path ? data.path : "none",
          button_name: data.button_name,
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
  const postService = async () => {
    try {
      await createService();
      await getProvideServices();
      close();
    } catch (error) {
      console.error(error);
    }
  };
  const capitalizedServiceType =
    serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
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
            value={`Add ${capitalizedServiceType}`}
          />
          <br />
          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Title"}
                name={"title"}
                multiline
                rows={2}
                maxLength={30}
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Description"}
                name={"description"}
                multiline
                rows={3}
                maxLength={300}
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextInputField
                label={"Button name"}
                height={"1rem"}
                background={skyExColors.skyExTextBoxGrey}
                name={"button_name"}
                maxLength={20}
                value={data.button_name}
                onChange={(e) =>
                  setData({ ...data, button_name: e.target.value })
                }
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <FormControl fullWidth>
                <Stack justifyContent={"space-between"}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#0d4f6c",
                      width: "50%",
                    }}
                  >
                    {"Path"} &nbsp;&nbsp;{data.path}
                  </Typography>
                </Stack>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data.path}
                  name="path"
                  onChange={(e) => setData({ ...data, path: e.target.value })}
                  sx={{
                    background: "#f3f3f3",
                    borderColor: skyExColors.green,
                  }}
                >
                  {paths.map((e, i) => (
                    <MenuItem value={e.path} key={i}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  clickFunction={postService}
                />
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </div>
  );
}

export default ServiceModal;
