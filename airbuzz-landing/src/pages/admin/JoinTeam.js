import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { FormButton, TextContainer } from "../../components/elements";
import { skyExColors } from "../../controller/constant";
import TextInputField from "../../components/elements/TextInputField";
import { Url, instance } from "../../utils/api";
import {
  errorAlert,
  successAlert,
} from "../../components/elements/ToastNotification";
import AboutModal from "../../components/elements/AboutModal";
import Crop from "../../components/elements/Crop";

function JoinTeam() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen2 = () => setIsOpen(true);
  const handleClose2 = () => setIsOpen(false);
  const [chooseUsTitle, setChooseUsTitle] = useState();
  const [chooseUsData, setChooseUsData] = useState([]);
  const [openCropModal, setOpenCropModal] = useState(false);
  const [id, setId] = useState();

  const getChooseUs = async () => {
    try {
      const response = await instance.get(`/About/Chooseus`);
      if (response?.status === 200) {
        const { title, chooseus } = response.data;
        setChooseUsTitle(title);
        setChooseUsData(chooseus);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getChooseUs();
  }, []);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setChooseUsData((prevchooseUsData) =>
      prevchooseUsData.map((data) =>
        data.id === id ? { ...data, [name]: value } : data
      )
    );
  };

  const updateChooseus = async (data) => {
    try {
      await instance.put(
        `/About/Chooseus/${data.id}`,
        {
          title: data.title,
          para: data.para,
          file: data.image,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      await getChooseUs();
      successAlert("success");
    } catch (err) {
      console.log(err);
      errorAlert("Something went wrong");
    }
  };
  const updateChooseUsTitle = async (a) => {
    a.preventDefault();
    try {
      await instance.put(`/About/UpdatechooseUsTitle/${chooseUsTitle}`);
      await getChooseUs();
      successAlert("Success");
    } catch (err) {
      console.log(err);
      errorAlert("Something went wrong");
    }
  };
  const deleteChooseUs = async (id) => {
    try {
      await instance.delete(`/About/Chooseus/${id}`);
      await getChooseUs();
      successAlert("Deleted Successfully");
      handleClose2();
    } catch (err) {
      console.log(err);
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
      {open ? (
        <AboutModal open={open} close={handleClose} getChooseUs={getChooseUs} />
      ) : null}
      <br />
      <Stack
        sx={{
          width: { md: "70%", xs: "95%" },
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
        marginLeft={"15%"}
      >
        <TextContainer
          fontSize={{ md: "40px", xs: "30px" }}
          fontWeight={700}
          lineHeight={"1.2"}
          color={"#102C38"}
          value={"Join Team AirBuzz"}
        />
        <Box>
          <FormButton
            value={"Add"}
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
      <Card
        sx={{
          padding: "3.5vh",
          width: { md: "70%", xs: "95%" },
          margin: "auto",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <form onSubmit={(a) => updateChooseUsTitle(a)}>
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
                name={"title"}
                multiline
                rows={2}
                maxLength={40}
                value={chooseUsTitle}
                onChange={(a) => setChooseUsTitle(a.target.value)}
                required
              />
            </Grid>
          </Grid>
        </form>
      </Card>
      <br />
      {chooseUsData?.map((data, index) => (
        <div key={data.id}>
          {isOpen ? (
            <Dialog
              aria-labelledby="spring-modal-title"
              aria-describedby="spring-modal-description"
              open={isOpen}
              onClose={handleClose2}
            >
              <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
              <DialogContent sx={{ width: "50vw" }}>
                <DialogContentText id="alert-dialog-description">
                  Are You Sure Want to Delete?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose2}>Cancel</Button>
                <Button onClick={() => deleteChooseUs(data.id)}>Confirm</Button>
              </DialogActions>
            </Dialog>
          ) : null}
          <Card
            sx={{
              padding: "3.5vh",
              width: { md: "70%", xs: "95%" },
              margin: "auto",
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
          >
            <Stack direction={"row"} justifyContent={"space-between"}>
              <TextContainer
                fontSize={"20px"}
                fontWeight={700}
                lineHeight={"1.2"}
                color={"#102C38"}
                value={`Card ${index + 1}`}
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
                  clickFunction={handleOpen2}
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
                  clickFunction={() => updateChooseus(data)}
                />
              </Box>
            </Stack>
            <br />
            <form>
              <Grid container spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextInputField
                    label={"Title"}
                    height={"1rem"}
                    background={skyExColors.skyExTextBoxGrey}
                    name={"title"}
                    required
                    rows={2}
                    multiline
                    maxLength={50}
                    value={data?.title}
                    focused={data?.title}
                    onChange={(e) => handleChange(e, data?.id)}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextInputField
                    label={"Paragraph"}
                    height={"1rem"}
                    background={skyExColors.skyExTextBoxGrey}
                    name={"para"}
                    rows={3}
                    maxLength={200}
                    multiline
                    required
                    value={data?.para}
                    focused={data?.para}
                    onChange={(e) => handleChange(e, data?.id)}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <label
                    onClick={() => {
                      setOpenCropModal(true);
                      setId(data.id);
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
                            typeof data?.image === "object"
                              ? URL.createObjectURL(data.image)
                              : Url + data?.image
                          }
                          alt=""
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
                    images={data.image}
                    CroppedImage={(a) => ({
                      ...chooseUsData,
                      image: handleChange(
                        {
                          target: {
                            name: "image",
                            value: a,
                          },
                        },
                        id
                      ),
                    })}
                  />
                </Grid>
              </Grid>
            </form>
          </Card>
          <br />
        </div>
      ))}
    </div>
  );
}

export default JoinTeam;
