import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormButton, TextContainer } from "../../../components/elements";
import logo from "../../../assets/logo/skyexlogo2.png";
import locationImg from "../../../assets/newImages/Location.png";
import TagsInput from "../../../components/elements/TagsInput";
import { fontSizes, skyExColors } from "../../../controller/constant";
import moment from "moment/moment";
import { instance } from "../../../utils/api";
import info from "../../../assets/newImages/info.png";
import { useLocation } from "react-router";
import { useAirbuzzLocation } from "../../../controller/constant/LocationContext";

const Track = () => {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [awbNumber, setAwbNumber] = useState("");
  const [error, setError] = useState([]);
  const location = useLocation();
  const [awb, setAwb] = useState(location.state ? location.state.awb : null);

  const { currentLocation } = useAirbuzzLocation();

  const fetchData = async (a) => {
    try {
      const response = await instance.post(`/Ferro/awb_track`, {
        awb_numbers: a.toString(),
        state: currentLocation,
      });

      if (response?.status === 200) {
        setData(response?.data?.detail);
        setError([]);
        setAwb("");
      }
    } catch (err) {
      console.log(err);
      setError(err?.response?.data.errors);
      setData([]);
    }
    setClicked(true);
  };

  useEffect(() => {
    if (awb) {
      fetchData(awb);
      if (location.state && location.state.awb !== "") {
        const updatedState = { ...location.state, awb: "" };
        window.history.replaceState(updatedState, "", window.location.pathname);
        setAwb("");
      }
    }
  }, [awb]);
  const WrongAWB = () => (
    <Grid
      item
      xl={12}
      lg={12}
      md={12}
      sm={12}
      xs={12}
      style={{
        border: "1px solid grey",
        display: "flex",
        minHeight: "7rem",
      }}
    >
      <div style={{ flexGrow: 0.5, display: "grid", placeItems: "center" }}>
        <img src={info} alt="imag" style={{ height: "3rem", width: "3rem" }} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        {error && error[1] && error[1].error_message ? (
          <div>
            <TextContainer
              value={error[1].error_message}
              fontSize={fontSizes.careerCardContentDescription.sm}
              color={skyExColors.textGrey}
              fontWeight={"bold"}
            />
          </div>
        ) : null}
        <div>
          <TextContainer
            value="Sorry, your tracking attempt was not successful. Please check your
          tracking number."
            fontSize={fontSizes.careerCardContentDescription.sm}
            color={skyExColors.textGrey}
          />
        </div>
      </div>
    </Grid>
  );

  const Flow = ({ a, i, e }) => {
    return (
      <Grid
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          borderBottom:
            e.awb_logs.length - 1 === i
              ? null
              : `1px solid ${skyExColors.skyExLightGrey}`,
          padding: 2,
          position: "relative",
        }}
      >
        <Grid container style={{ display: "flex", alignItems: "center" }}>
          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
            <div>
              <TextContainer
                value={moment(a.created).format("Do MMMM YYYY")}
                fontSize={fontSizes.careerCardContentDescription.xs}
                color={skyExColors.skyExDarkGrey}
              />
            </div>
            <div>
              <TextContainer
                value={`Local Time ${moment(a.created).format("h:mm a")}`}
                fontSize={fontSizes.careerCardContentDescription.xs}
                color={skyExColors.skyExDarkGrey}
              />
            </div>
          </Grid>
          <Grid
            item
            xl={2}
            lg={2}
            md={2}
            sm={2}
            xs={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center", 
            }}
          >
            <Box
              style={{
                display: "flex",
                position: "absolute",
                zIndex: 1,
                width: 2,
                marginTop: i === 0 ? "150px" : "0%",
                height: i === 0 ? "100%" : "100%",
                background: skyExColors.skyExLightGrey,
              }}
            ></Box>
            <div style={{ zIndex: 1 }}>
              {i === 0 ? (
                <img
                  src={locationImg}
                  alt="imag"
                  style={{
                    height: 70,
                    width: 50,
                    filter: "drop-shadow(0px 0px 10px #fff)",
                  }}
                />
              ) : (
                <div>
                  <Box
                    sx={{
                      height: "1rem",
                      width: "1rem",
                      background: skyExColors.skyExOrgange,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        height: "0.5rem",
                        width: "0.5rem",
                        background: "white",
                        borderRadius: "50%",
                      }}
                    ></Box>
                  </Box>
                </div>
              )}
            </div>
          </Grid>

          <Grid
            item
            xl={5}
            lg={5}
            md={5}
            sm={5}
            xs={5}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <div style={{ display: "flex" }}>
              <TextContainer
                value="Status:"
                color={skyExColors.skyExDarkGrey}
                fontSize={fontSizes.careerCardContentDescription.xs}
              />
              &nbsp;
              <TextContainer
                value={` ${a.status}`}
                color={"black"}
                fontWeight={"bold"}
                fontSize={fontSizes.careerCardContentDescription.xs}
              />
            </div>
            <div>
              <TextContainer
                value={a.message}
                color={skyExColors.skyExDarkGrey}
                fontSize={fontSizes.careerCardContentDescription.xs}
              />
            </div>
            <div>
              <TextContainer
                value={`${a.current_branch} - ${a.country}`}
                color={"black"}
                fontWeight={"bold"}
                fontSize={fontSizes.careerCardContentDescription.xs}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const ExpandableCard = () => (
    <div>
      {data.map((e, index) => {
        const filteredLogs = e.awb_logs.filter(
          (log) =>
            log.status !== "Invoice Generated" && log.status !== "Out Scanned"
        );
        return (
          <Accordion key={index} style={{ position: "relative" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <TextContainer
                value="Tracking Code"
                fontSize={fontSizes.careerCardContentDescription.sm}
                color={skyExColors.skyExDarkGrey}
              />
              &nbsp;
              <TextContainer
                value={` : ${e.awb_number}`}
                fontSize={fontSizes.careerCardContentDescription.sm}
                fontWeight={"bold"}
              />
            </AccordionSummary>
            <AccordionDetails>
              <>
                <TextContainer
                  value="This Shipment is handled by AirBuzz"
                  fontSize={fontSizes.careerCardContentDescription.xs}
                  color={skyExColors.skyExDarkGrey}
                />
                <TextContainer
                  value="All Shipment Updates"
                  fontSize={fontSizes.careerCardContentDescription.sm}
                  color={"black"}
                  fontWeight={"bold"}
                />
                <Grid container>
                  {filteredLogs.map((a, i) => (
                    <Flow key={i} a={a} i={i} e={e} />
                  ))}
                </Grid>
              </>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );

  return (
    <>
      <div
        style={{
          paddingTop: "6rem",
          paddingLeft: "6rem",
        }}
      ></div>
      <Wrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            position: "absolute",
          }}
        >
          <img
            src={logo}
            height={"70%"}
            style={{ opacity: 0.2, overflow: "hidden" }}
            alt="Logo"
          />
        </div>

        <Box
          sx={{
            paddingLeft: "6rem",
            paddingTop: "25px",
            "@media (max-width:600px)": {
              paddingLeft: "1rem",
            },
          }}
        >
          <TextContainer
            fontSize={"30px"}
            fontWeight={700}
            lineHeight={"1.2"}
            color={skyExColors.textGrey}
            value={"Track your Package"}
          />
        </Box>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "25px",
          }}
        >
          <div
            style={{
              width: "65%",
              overflow: "hidden",
            }}
          >
            <TagsInput
              fullWidth
              variant="outlined"
              id="tags"
              name="Track"
              placeholder="Track your Package"
              label="Track"
              chipdata={awbNumber}
              selectedTags={setAwbNumber}
            />
          </div>
          <div style={{ margin: 10 }}></div>
          <FormButton
            value="Track"
            padding={"0rem 2rem"}
            height={"40px"}
            background={skyExColors.secondary}
            shadow={"#102C38"}
            fullWidth
            border
            disabled={clicked}
            clickFunction={() => fetchData(awbNumber)}
          />
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Container>
              {data.length ? <ExpandableCard /> : null}
              {clicked && !data.length ? <WrongAWB /> : null}
            </Container>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Track;
const Container = styled.div`
  width: 85%;
  @media (max-width: 900px) {
    width: 95%;
  }
`;
const Wrapper = styled.div`
  margin-top: -30px;
  min-height: 100vh;
  width: 100%;
  background-color: ${skyExColors.primary};
  overflow: hidden;
`;
