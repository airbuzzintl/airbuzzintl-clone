import { Button, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FormInputFields } from "../../../components/elements";
import { instance } from "../../../utils/api";
import {
  errorAlert,
  successAlert,
} from "../../../components/elements/ToastNotification";
import { cookies } from "../../../controller/Common";

function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      location.pathname === "/AdminLogin" ||
      location.pathname === "/adminlogin"
    ) {
      try {
        const response = await instance.post("/login", credentials);
        cookies.set("user", JSON.stringify(response.data));
        successAlert("Success");
        handleNavigate();
      } catch (error) {
        errorAlert(error.response.data.message);
      }
    }
  };
  const handleNavigate = () => {
    navigate("/AdminDashboard/Introduction");
  };

  return (
    <LoginWrapper>
      <Card
        sx={{
          height: "100%",
          padding: "2vh 3vh",
          backgroundColor: "white",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          width: { lg: "90%", sm: "50vw" },
          margin: "auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            margin: "2rem .5rem",
            color: "black",
          }}
        >
          {`Airbuzz Login`}
        </Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormInputFields
            label={"Email"}
            type={"text"}
            background={"#ECEBEB"}
            borderColor={"#rgb(137 136 134)"}
            height={"3rem"}
            name={"email"}
            value={credentials.email}
            handleChange={(name, value) =>
              setCredentials({ ...credentials, [name]: value })
            }
            required 
          />
          <br />
          <br />
          <FormInputFields
            label={"Password"}
            type={"password"}
            background={"#ECEBEB"}
            borderColor={"#rgb(137 136 134)"}
            height={"3rem"}
            name={"password"}
            value={credentials.password}
            handleChange={(name, value) =>
              setCredentials({ ...credentials, [name]: value })
            }
            required
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              background: "#519534",
              borderRadius: 2,
              height: "2.5rem",
              marginTop: "4.5vh",
              marginBottom: "2.5vh",
            }}
            type="submit"
          >
            {"Login"}
          </Button>
        </form>
      </Card>
    </LoginWrapper>
  );
}

export default LoginForm;

const LoginWrapper = styled.section`
  width: 75%;
  heigth: 100%;
  @media (max-width: 600px) {
    width: 100%;
    padding: 0.5rem;
  }
`;
