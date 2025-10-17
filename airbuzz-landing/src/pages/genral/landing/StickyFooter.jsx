"use client";
import styled from "styled-components";
import { skyExColors } from "../../../controller/constant/colors";
import { HiCurrencyDollar } from "react-icons/hi";
import { BsFacebook, BsYoutube, BsLinkedin } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { createTheme, List, ListItem, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { FormButton } from "../../../components/elements";
import TagsInput from "../../../components/elements/TagsInput";
import { useRouter } from "next/navigation";

const StickyFooter = () => {
  const [awb, setAwb] = useState("");
  const router = useRouter();
  const handleNavigate = () => {
    if (awb) {
      router.push(`/Track?awb=${awb}`);
    }
  };

  const StickyFooterLHSStyle = createTheme({
    components: {
      MuiListItem: {
        styleOverrides: {
          root: {
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            minWidth: "max-content",
            ":hover": {
              fontWeight: 600,
              filter: "drop-shadow(0px 4px 4px rgba(0,0,0,.8))",
            },
          },
        },
      },
    },
  });
  const StickyFooterRHSStyle = createTheme({
    components: {
      MuiListItem: {
        styleOverrides: {
          root: {
            color: "#fff",
            fontSize: "larger",
            fontWeight: 600,
            cursor: "pointer",
            minWidth: "max-content",
            ":hover": {
              fontWeight: 600,
              filter: "drop-shadow(0px 4px 4px rgba(0,0,0,.8))",
            },
          },
        },
      },
    },
  });
  return (
    <React.Fragment>
      <Wrapper bg={skyExColors.skyExDarkGrey} className="scroll4">
        <FooterWrap>
          <LeftSide>
            <ThemeProvider theme={StickyFooterLHSStyle}>
              <List
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <a href="#estimation" className="link-component">
                  <ListItem>
                    <HiCurrencyDollar
                      style={{
                        fontSize: "x-large",
                        color: skyExColors.secondary,
                      }}
                    />
                    &nbsp; Get Quote
                  </ListItem>
                </a>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ overflow: "hidden", width: "60vh" }}>
                    <TagsInput
                      fullWidth
                      variant="outlined"
                      id="tags"
                      name="Track"
                      placeholder="Track your Package"
                      label="Track"
                      chipdata={awb}
                      selectedTags={setAwb}
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
                    clickFunction={handleNavigate}
                  />
                </div>
              </List>
            </ThemeProvider>
          </LeftSide>
          <RightSide>
            <ThemeProvider theme={StickyFooterRHSStyle}>
              <List
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <a
                  href="https://www.linkedin.com/company/airbuzz-ae/"
                  className="link-component"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <ListItem>
                    <BsLinkedin />
                  </ListItem>
                </a>
                <a
                  href="https://www.facebook.com/airbuzz.ae"
                  className="link-component"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <ListItem>
                    <BsFacebook />
                  </ListItem>
                </a>
                <a
                  href="https://www.instagram.com/airbuzz.ae/"
                  className="link-component"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <ListItem>
                    <AiFillInstagram />
                  </ListItem>
                </a>

                <a
                  href="https://youtube.com/@airbuzzintl?si=EYcD8TNH20J_oEWF "
                  className="link-component"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <ListItem>
                    <BsYoutube />
                  </ListItem>
                </a>
              </List>
            </ThemeProvider>
          </RightSide>
        </FooterWrap>
      </Wrapper>
    </React.Fragment>
  );
};
export default StickyFooter;
const Wrapper = styled.section`
  width: 100%;
  background: ${skyExColors.darkPrimary};
  position: sticky;
  z-index: 200;
  bottom: 0;
  /* overflow-x: scroll; */
  @media (max-width: 1000px) {
    display: none;
  }
`;
const FooterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LeftSide = styled.div``;
const RightSide = styled.div`
  transform: translateX(-50%);
`;
