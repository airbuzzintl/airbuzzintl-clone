import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { fontSizes, skyExColors } from "../../../controller/constant";
import { FormButton, TextContainer } from "../../../components/elements";
import { Grid } from "@mui/material";
import { breadcrumbs } from "../../../controller/Common";
import { images } from "../../../controller/constant/images";
import { useNavigate } from "react-router";
import { Url, instance } from "../../../utils/api";
import { loadContext } from "../../../App";
import StickyFooter from "../landing/StickyFooter";

const International = () => {
  const { setLoading } = useContext(loadContext);
  const [select, setSelect] = useState(null);
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [isMobileTouch, setIsMobileTouch] = useState(false);
  const [isMobileTouch1, setIsMobileTouch1] = useState(false);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchInternationalData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(
          `/Service/getProvideServices/international`
        );
        if (response.status === 200) {
          setResponse(response.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
  
    fetchInternationalData();
  }, [setLoading]);
  
  const ServiceCard = ({ e, i, setMouseHover }) => {
    const handleCardClick = () => {
      setSelect(i);
      setIsMobileTouch(true);
    };
    return (
      <Service
        bg={i}
        onClick={handleCardClick}
        onTouchStart={() => {
          setMouseHover(true);
        }}
        onTouchCancel={() => {
          setMouseHover(false);
        }}
        onMouseEnter={() => {
          setMouseHover(true);
        }}
        onMouseLeave={() => {
          setMouseHover(false);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "1rem",
          }}
        >
          <img
            src={Url + `${e.image}`}
            height={40}
            draggable={false}
            alt="skyEx"
          />
        </div>
        <div
          style={{
            padding: "0.5rem",
          }}
        >
          <TextContainer
            value={e.title}
            fontSize={fontSizes.careerCardContentDescription.xs}
            color={i % 2 === 0 ? `#fff` : "#4D4D4D"}
          />
        </div>
      </Service>
    );
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  
    setTimeout(() => {
      window.location.hash = "estimation"; 
    }, 1000);
  };
  return (
    <>
      <BackgroundImage>
        <div
          style={{
            position: "absolute",
            top: "6rem",
            left: "6rem",
            zIndex: 99,
          }}
        >
          {breadcrumbs("Home / International Services")}
        </div>
        <div style={{ marginLeft: "2rem", paddingTop: "9rem" }}>
          <TextContainer
            value={"INTERNATIONAL"}
            fontSize={"8vw"}
            fontWeight={"bold"}
            color={"white"}
            textShadow={
              "0 1px 0 #CCCCCC, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15), 2px 2px 2px rgba(206,89,55,0);"
            }
          />
        </div>
      </BackgroundImage>

      <Wrapper class="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>

        <Grid container style={{ marginTop: "1rem" }}>
          <Grid
            item
            xl={2}
            lg={2.5}
            md={3}
            sm={12}
            xs={12}
            sx={{ marginBottom: "40px" }}
          >
            <LeftContainer>
              <LeftWrapper>
                <Marquee>
                  <MarqueeGroup hover={hover} isMobileTouch={isMobileTouch}>
                    {response?.service?.map((e, i) => (
                      <ServiceCard
                        e={e}
                        i={i}
                        setMouseHover={setHover}
                        hover={hover}
                        setIsMobileTouch={setIsMobileTouch}
                      />
                    ))}
                  </MarqueeGroup>
                  <MarqueeGroup aria-hidden="true" hover={hover}>
                    {response?.service?.map((e, i) => (
                      <ServiceCard
                        e={e}
                        i={i}
                        setMouseHover={setHover}
                        setIsMobileTouch={setIsMobileTouch}
                        hover={hover}
                      />
                    ))}
                  </MarqueeGroup>
                </Marquee>
              </LeftWrapper>
            </LeftContainer>
          </Grid>

          <Grid
            item
            xl={2}
            lg={2.5}
            md={3}
            sm={12}
            xs={12}
            sx={{ marginBottom: "40px" }}
          >
            <LeftContainer>
              <RightWrapper>
                <Marquee>
                  <MarqueeGroup1 hover={hover1} isMobileTouch={isMobileTouch1}>
                    {response?.service?.map((e, i) => (
                      <ServiceCard
                        e={e}
                        i={i}
                        setIsMobileTouch={setIsMobileTouch1}
                        setMouseHover={setHover1}
                        hover={hover1}
                      />
                    ))}
                  </MarqueeGroup1>
                  <MarqueeGroup1
                    aria-hidden="true"
                    hover={hover1}
                    isMobileTouch={isMobileTouch1}
                  >
                    {response?.service?.map((e, i) => (
                      <ServiceCard
                        e={e}
                        i={i}
                        setIsMobileTouch={setIsMobileTouch1}
                        setMouseHover={setHover1}
                        hover={hover1}
                      />
                    ))}
                  </MarqueeGroup1>
                </Marquee>
              </RightWrapper>
            </LeftContainer>
          </Grid>

          <Grid
            item
            xl={7}
            lg={6.5}
            md={5.5}
            sm={12}
            xs={12}
            style={{
              display: "flex",
            }}
          >
            <div id="stars"></div>
            <div id="stars3"></div>

            <div style={{ padding: "5%" }}>
              <TextContainer
                value={
                  select === null
                    ? response?.international_service_title
                    : response?.service[select]?.title
                }
                fontSize={fontSizes.subHeading}
                color={skyExColors.secondary}
                fontWeight={"bold"}
                textAlign={"left"}
                textTransform={"Capitalize"}
              />
              <br />
              {select === null ? (
                <>
                  <TextContainer
                    value={response?.international_service_Para_1}
                    fontSize={fontSizes.subcontent}
                    color={skyExColors.textGrey}
                    textAlign={"justify"}
                    gutterBottom
                  />

                  <TextContainer
                    value={response?.international_service_Para_2}
                    fontSize={fontSizes.subcontent}
                    color={skyExColors.textGrey}
                    textAlign={"justify"}
                    gutterBottom
                  />
                </>
              ) : typeof response?.service[select].description === "string" ? (
                response?.service[select].description
                  .split("\n")
                  .map((e, i) => (
                    <div key={i}>
                      <TextContainer
                        value={e}
                        fontSize={fontSizes.subcontent}
                        color={skyExColors.textGrey}
                        textAlign={"justify"}
                      />
                    </div>
                  ))
              ) : (
                response[select].description.map((e, i) => (
                  <div key={i}>
                    <TextContainer
                      value={e}
                      fontSize={fontSizes.subcontent}
                      color={skyExColors.textGrey}
                      textAlign={"justify"}
                    />
                  </div>
                ))
              )}
              {select !== null &&
                response?.service[select]?.path.trim() !== "" &&
                response?.service[select]?.path.trim() !== "none" && (
                  <div style={{ paddingTop: "1rem" }}>
                    {response?.service[select]?.path === "#estimation" ? (
                      <FormButton
                        value={response?.service[select]?.button_name}
                        background={skyExColors.secondary}
                        padding={".50rem 1rem"}
                        fontWeight={"500"}
                        clickFunction={() => {
                          handleClick();
                        }}
                      />
                    ) : (
                      <FormButton
                        value={response?.service[select]?.button_name}
                        background={skyExColors.secondary}
                        padding={".50rem 1rem"}
                        fontWeight={"500"}
                        clickFunction={() => {
                          navigate(response?.service[select]?.path);
                        }}
                      />
                    )}
                  </div>
                )}
            </div>
          </Grid>
        </Grid>
      </Wrapper>
      <StickyFooter />
    </>
  );
};

export default International;

const BackgroundImage = styled.section`
  background: linear-gradient(rgba(25, 26, 25, 0.55), rgba(25, 26, 25, 0.55)),
    url("${images.InternationalBg}");
  min-height: 35vh;
  width: 100%;
  background-position: center;
  background-size: cover;
  @media (max-width: 600px) {
    min-height: 14vh;
  }
`;

const Wrapper = styled.div`
  min-height: 20vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: ${skyExColors.pageBackground};
`;

const Service = styled.div`
  height: 10rem;
  width: 12rem;
  border-radius: 0;
  background-color: ${(props) =>
    props.bg % 2 == 0 ? `${skyExColors.secondary}` : "#fff"};
    color: ${(props) => (props.bg % 2 == 0 ? `#fff` : "#4D4D4D")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  margin: 0.3rem;
  :hover {
    opacity: 0.8;
  }
}
`;

const LeftWrapper = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 99;
`;

const LeftContainer = styled.div`
  max-height: 85vh;
  @media (max-width: 900px) {
    max-height: 40vh;
  }
  @media (max-width: 600px) {
    max-height: 22vh;
  }
`;

const RightWrapper = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 99;
`;

const Marquee = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
  @media (max-width: 900px) {
    flex-direction: row;
  }
`;

const scrollY = keyframes`
   0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(calc(-100% ));
  }
`;

const scrollX = keyframes`
   0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-100% ));
  }
`;

const MarqueeGroup = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${scrollY} 30s linear infinite;
  @media (max-width: 900px) {
    flex-direction: row;
    animation: ${scrollX} 30s linear infinite;
  }
  animation-play-state: ${(props) => (props.hover ? "paused" : "")};
`;

const MarqueeGroup1 = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  // align-items: center;
  animation: ${scrollY} 30s linear infinite;
  animation-direction: reverse;
  @media (max-width: 900px) {
    flex-direction: row;
    animation: ${scrollX} 30s linear infinite;
    animation-direction: reverse;
  }
  animation-play-state: ${(props) =>
    props.hover || props.isMobileTouch ? "paused" : ""};
`;
