import { Form } from "react-bootstrap";
import styled from "styled-components";
import { skyExColors } from "../../../controller/constant/colors";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FormInputFields from "../../elements/InputField";
import Dropdown from "../../elements/Dropdown";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { countryCodes } from "../../../controller/Common";
import { Box, Button, Container, Typography } from "@mui/material";

const EstimationForm = ({
  step,
  estimation,
  setEstimation,
  setStep,
  errorMessage,
  setErrorMessage,
}) => {
  const handleChange = (name, value) => {
    setErrorMessage({});
    setEstimation({ ...estimation, [name]: value });
  };

  return (
    <FormWrapper>
      <Form>
        {step === 0 && (
          <>
            <FormInputFields
              placeholder="Email address" // Placeholder text
              height="1rem"
              background={skyExColors.skyExTextBoxGrey}
              name="email"
              value={estimation.email}
              handleChange={handleChange}
              error={errorMessage.email}
              helperText={errorMessage.email}
            />
            <br />
            <br />
            <Dropdown
              placeholder="Service Type"
              background={skyExColors.skyExTextBoxGrey}
              list={["Air Freight", "Express courier"]}
              name={"serviceType"}
              value={estimation.serviceType}
              handleChange={handleChange}
              error={errorMessage.serviceType}
              helperText={errorMessage.serviceType}
            />
            <br />
            <br />
            <Dropdown
              placeholder={"Product List"}
              background={skyExColors.skyExTextBoxGrey}
              list={
                estimation.serviceType === "Express courier"
                  ? ["Document", "Shipment"]
                  : [
                      "General Cargo",
                      "Perishable Cargo",
                      "Pharma",
                      "Dangerous Goods",
                    ]
              }
              productList
              name={"productList"}
              value={estimation.productList}
              handleChange={handleChange}
              error={errorMessage.productList}
              helperText={errorMessage.productList}
            />
            <br />
            <br />
            <FormInputFields
              placeholder={"Weight(kg)"}
              height={"1rem"}
              background={skyExColors.skyExTextBoxGrey}
              name={"weight"}
              value={estimation.weight}
              handleChange={handleChange}
              error={errorMessage.weight}
              helperText={errorMessage.weight}
            />
            <br />
            <br />
            <FormControl error={errorMessage.type}>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{ color: "#fff" }}
              >
                Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                sx={{
                  color: errorMessage.type ? "#d32f2f" : "#fff",
                  accentColor: "#fff",
                }}
                name={"type"}
                value={estimation.type}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                {estimation.serviceType === "Express courier" ? (
                  <>
                    <FormControlLabel
                      value="Not Applicable"
                      control={<Radio color="success" />}
                      label="Not Applicable"
                    />
                  </>
                ) : (
                  <>
                    <FormControlLabel
                      value="Pallets"
                      control={<Radio color="success" />}
                      label="Pallets"
                    />
                    <FormControlLabel
                      value="Cartons"
                      control={<Radio color="success" />}
                      label="Cartons"
                    />
                    <FormControlLabel
                      value="Not Applicable"
                      control={<Radio color="success" />}
                      label="Not Applicable"
                    />
                  </>
                )}
              </RadioGroup>
            </FormControl>
            <br />
            <br />
          </>
        )}

        {step === 1 && (
          <>
            <Dropdown
              placeholder={"Origin (COUNTRY) "}
              background={skyExColors.skyExTextBoxGrey}
              list={countryCodes}
              displayValue={"name"}
              selectedValue={"name"}
              name={"originCountry"}
              value={estimation.originCountry}
              handleChange={handleChange}
              error={errorMessage.originCountry}
              helperText={errorMessage.originCountry}
            />
            <br />
            <br />

            <FormInputFields
              placeholder={"Origin (CITY) "}
              height={"1rem"}
              background={skyExColors.skyExTextBoxGrey}
              name={"originCity"}
              value={estimation.originCity}
              handleChange={handleChange}
              error={errorMessage.originCity}
              helperText={errorMessage.originCity}
            />

            <br />
            <br />

            <Dropdown
              placeholder={"Destination (COUNTRY) "}
              background={skyExColors.skyExTextBoxGrey}
              list={countryCodes}
              displayValue={"name"}
              selectedValue={"name"}
              name={"destinationCountry"}
              value={estimation.destinationCountry}
              handleChange={handleChange}
              error={errorMessage.destinationCountry}
              helperText={errorMessage.destinationCountry}
            />
            <br />
            <br />

            <FormInputFields
              placeholder={"Destination (CITY) "}
              height={"1rem"}
              background={skyExColors.skyExTextBoxGrey}
              name={"destinationCity"}
              value={estimation.destinationCity}
              handleChange={handleChange}
              error={errorMessage.destinationCity}
              helperText={errorMessage.destinationCity}
            />
            <br />
            <br />
          </>
        )}
        {step === 2 && (
          <Container maxWidth={"xl"}>
            <Box
              sx={{
                color: skyExColors.darkPrimary,
                fontSize: "xxx-Large",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CheckCircleOutlineIcon
                sx={{
                  color: skyExColors.green,
                  display: "block",
                  textAlign: "center",
                }}
              />
            </Box>
            <Typography
              sx={{
                color: "#fff ",
                textAlign: "center",
                fontWeight: 700,
                fontSize: "30px",
                marginTop: "3%",
              }}
            >
              Request Submitted Successfully
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "3%",
              }}
            >
              <Button
                sx={{
                  color: "#fff",
                  textTransform: "capitalize",
                  textDecoration: "underline",
                }}
                onClick={() => setStep(0)}
              >
                Submit another request
              </Button>
            </Box>
          </Container>
        )}
      </Form>
    </FormWrapper>
  );
};
const FormWrapper = styled.div`
  min-height: 30vh;
`;

export default EstimationForm;
