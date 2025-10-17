"use client";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { skyExColors } from "../../../controller/constant";
import { TextContainer } from "../../../components/elements";
import { images } from "../../../controller/constant/images";
import { Url, instance } from "../../../utils/api";
import StickyFooter from "../landing/StickyFooter";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

function Articles() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]); // ✅ Use state for fetched data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.airbuzzintl.com/airbuzz/Landing/getArticleDetails`
        );

        if (response.status === 200) {
          let formattedData = response.data.map((e) => ({
            ...e,
            date: e.date.split("-"),
          }));

          // ✅ Sorting by date (newest first)
          formattedData.sort((a, b) => {
            const dateA = new Date(a.date[0], a.date[1] - 1, a.date[2]);
            const dateB = new Date(b.date[0], b.date[1] - 1, b.date[2]);
            return dateB - dateA;
          });

          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, []);
  const filterData = useMemo(() => {
    return data?.filter(
      (item) =>
        item.date.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        item.description
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );
  }, [searchText, data]);

  const router = useRouter();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <Wrapper>
        <BackgroundImage style={{ position: "fixed" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              justifyContent: "space-between",
              alignItems: { md: "flex-end" },
              height: "100%",
            }}
          >
            <Box>
              <TextContainer
                value={"BLOGS"}
                fontSize={{ md: "7vw", xs: "10vw" }}
                fontWeight={"bold"}
                lineHeight={0}
                color={"white"}
                textShadow={{
                  md: "0 1px 0 #CCCCCC, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3);",
                  xs: "0 1px 0 #CCCCCC, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15), 2px 2px 2px rgba(206,89,55,0);",
                }}
              />
            </Box>
            <Box
              sx={{
                width: { md: "30%", xs: "100%" },

                px: { md: "1vw", xs: "2vw" },
              }}
            >
              <OutlinedInput
                id="outlined-adornment-weight"
                fullWidth
                type="search"
                sx={{
                  background: "#fff",
                  width: "100%",
                  marginBottom: 2,
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
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
            </Box>
          </Box>
        </BackgroundImage>
        <br />
        <Grid
          container
          spacing={2}
          p={"45px"}
          sx={{
            marginTop: {
              sm: "200px",
              xs: "100px",
            },
          }}
        >
          {filterData?.map((data, index) => (
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} key={data.id}>
              <Box
                onClick={() => router.push(`/ArticlesDetails/${data.slug}`)}
                sx={{
                  cursor: "pointer",
                  display: {
                    xl: "flex",
                    lg: "flex",
                    md: "flex",
                    sm: "block",
                    xs: "block",
                  },
                  "@media (max-width: 900px)": {
                    py: 4,
                  },
                }}
              >
                <Box
                  sx={{
                    "@media (max-width: 900px)": {
                      width: "100%",
                      textAlign: "center",
                    },
                  }}
                >
                  {/* <img
                    src={Url + data.image_1}
                    alt="imag"
                    style={{
                      width: "150px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  /> */}
                  <Image
                    src={Url + data.img}
                    alt="imag"
                    style={{
                      width: "150px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                    width={150}
                    height={120}
                  />
                </Box>
                &nbsp;&nbsp;&nbsp;
                <Box
                  sx={{
                    "@media (max-width: 900px)": {
                      width: "100%",
                    },
                  }}
                >
                  <TextContainer
                    fontSize={"16px"}
                    fontWeight={"bold"}
                    lineHeight={"1.2"}
                    color={"#fff"}
                    value={data.title}
                    maxChar={250}
                    title={data.description}
                    cursor
                  />
                  <TextContainer
                    fontSize={"16px"}
                    fontWeight={400}
                    lineHeight={"1.2"}
                    color={"#fff"}
                    value={data.description.replace(/<[^>]+>/g, "")}
                    maxChar={150}
                    overflow={"hidden"}
                    cursor
                  />

                  <TextContainer
                    fontSize={"16px"}
                    fontWeight={600}
                    lineHeight={"1.2"}
                    color={"grey"}
                    value={`${data.date[2]}th ${months[data.date[1] - 1]} ${
                      data.date[0]
                    }`}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Wrapper>
      <StickyFooter />
    </>
  );
}

export default Articles;
const BackgroundImage = styled.section`
  background: linear-gradient(rgba(25, 26, 25, 0.1), rgba(25, 26, 25, 0.1)),
    url("${images.Blogsbg?.src}");
  background-color: #0a1e26;
  width: 100%;
  height: 30vh;
  background-position: top;
  background-size: cover;
  @media (max-width: 600px) {
    height: 18vh;
  }
`;

const Wrapper = styled.section`
  margin-top: 65px;
  min-height: 100vh;
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
`;
