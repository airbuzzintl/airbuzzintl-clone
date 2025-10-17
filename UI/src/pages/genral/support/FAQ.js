import React, { useContext, useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { fontSizes, skyExColors } from "../../../controller/constant";
import { TextContainer } from "../../../components/elements";
import { Grid, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { breadcrumbs } from "../../../controller/Common";
import { Accordions } from "../../../components/sectionElements/Faq/Accordion";
import SearchIcon from "@mui/icons-material/Search";
import { instance } from "../../../utils/api";
import { loadContext } from "../../../App";
import StickyFooter from "../landing/StickyFooter"; 

const Faq = () => {
  const [expanded, setExpanded] = useState();
  const { setLoading } = useContext(loadContext);
  const [faqData, setFaqData] = useState({
    faq_title: "",
    faq: [],
  });

  const getFaqDatas = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`/Support/Faq`);
      if (response.status === 200) {
        setFaqData(response.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFaqDatas();
  }, []);
  const [searchText, setSearchText] = useState("");

  const filterData = useMemo(() => {
    return faqData?.faq?.filter(
      (item) =>
        item.question
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.answer.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, faqData]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : -1);
  };

  return (
    <Wrapper class="bg-animation">
      <div id="stars"></div>
      <div id="stars3"></div>
      <div id="stars2"></div>
      <div id="stars4"></div>

      <div
        style={{
          paddingTop: "6rem",
          paddingLeft: "6rem",
        }}
      >
        {breadcrumbs("Support / FAQ")}
      </div>
      <TextContainer
        fontSize={fontSizes.careerCardContentHeading.h1}
        fontWeight={"bold"}
        color={"#fff"}
        value={faqData.faq_title}
        textAlign={"center"}
        className={"faqAmination"}
        position={"relative"}
        zIndex={1}
      />

      <div style={{ padding: "1% 3%" }}>
        <OutlinedInput
          id="outlined-adornment-weight"
          fullWidth
          sx={{ background: "#fff" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" edge="end">
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
          onChange={(a) => setSearchText(a.target.value)}
        />
      </div>
      <Grid container sx={{ display: "flex", flexDirection: "row" }}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          {filterData
            .slice(0, Math.round(filterData.length / 2))
            .map((e, i) => (
              <>
                <Grid
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  key={i}
                  sx={{ mt: "1rem" }}
                >
                  <Accordions
                    item={e}
                    expanded={expanded === i}
                    onChange={handleChange(i)}
                  />
                </Grid>
              </>
            ))}
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          {filterData
            .slice(Math.round(filterData.length / 2), filterData.length)
            .map((e, i) => (
              <>
                <Grid
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  key={i}
                  sx={{ mt: "1rem" }}
                >
                  <Accordions
                    item={e}
                    expanded={
                      expanded === i + Math.round(filterData.length / 2)
                    }
                    onChange={handleChange(
                      i + Math.round(filterData.length / 2)
                    )}
                  />
                </Grid>
              </>
            ))}
        </Grid>
      </Grid>
      <br />
      <StickyFooter />
    </Wrapper>
    
  );
};

export default Faq;

const Wrapper = styled.section`
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
  width: 100%;
  min-height: 100vh;
  // background-size: cover;
  overflow-y: hidden;
  background-attachment: fixed;
`;
