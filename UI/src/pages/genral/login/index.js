import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import loginImages from "../../../assets/newImages/Login.png";
import { Helmet } from "react-helmet";
import { instance } from "../../../utils/api";

function Login() {
  const content = {
    title: "Weather Data",
    description: "Current weather in your area.",
  };
  const [pageTitle, setPageTitle] = useState([]);
  const fetchPageDetails = async () => {
    try {
      const response = await instance.get(`/Service/getmetaTitle`);

      if (response.status === 200) {
        setPageTitle(response.data);
      }
    } catch (error) {
      console.error("Error fetching page details:", error);
    }
  };

  useEffect(() => {
    fetchPageDetails();
  }, []);

  return (
    <Wrapper>
      <Helmet>
        <title>
          {pageTitle.length > 0 ? pageTitle[0].title : "Airbuzz"}
        </title>
        {/* Optionally, you can also set other meta tags dynamically */}
        {/* <meta name="description" content={pageTitle[0]?.description} /> */}
      </Helmet>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xl={6}
          lg={6}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoginForm />
        </Grid>

        <Grid
          item
          xl={6}
          lg={6}
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "none",
              lg: "flex",
              xl: "flex",
            },

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "42vw", height: "100%", maxHeight: "100%" }}>
            <img src={loginImages} style={{ width: "100%" }} alt={"loginImg"} />
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #102c38;
  justify-content: center;

  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;
