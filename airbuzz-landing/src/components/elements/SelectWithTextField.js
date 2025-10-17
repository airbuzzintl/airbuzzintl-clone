import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";
import { skyExColors } from "../../controller/constant";

const SelectWithTextField = ({
  selectValue,
  textValue,
  type,
  selectName,
  textname,
  handleselectChange,
  handleTextChange,
  list,
  displayValue,
  selectedValue,
  placeholder,
  selectError,
  textError,
  textErrorText,
  required,
}) => {
  const SkyExAdminPanelEditFieldTheme = createTheme({
    components: {
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            width: "fit-content",
            padding: ".25% 1%",
            position: "absolute",
            top: 0,
            right: "0",
            fontWeight: 600,
            background: "rgba(255,255,255,.35)",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={SkyExAdminPanelEditFieldTheme}>
      <Box
        variant="contained"
        aria-label="outlined primary button group"
        sx={{
          borderRadius: "4px",
          border: `1px solid ${skyExColors.green}`,
          width: "100%",
          display: "flex",
        }}
      >
        <FormControl
          fullWidth
          size="small"
          sx={{
            flexBasis: 0,
            flexGrow: { xl: 2, lg: 2, md: 2, sm: 2, xs: 4 },
            border: selectError
              ? `1px solid #d32f2f`
              : `1px solid ${skyExColors.green}`,
            background: skyExColors.green,
          }}
        >
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={selectValue}
            required={required}
            name={selectName}
            onChange={(e) => handleselectChange(e.target.name, e.target.value)}
            sx={{
              color: "white",
              fieldset: { border: "none" },
              borderRadius: 0,
              fontSize: ".8rem",
            }}
          >
            {!displayValue
              ? list.map((response) => (
                  <MenuItem value={response} sx={{ fontSize: ".8rem" }}>
                    {response}
                  </MenuItem>
                ))
              : list.map((response) => (
                  <MenuItem
                    value={response[selectedValue]}
                    sx={{ fontSize: ".8rem" }}
                  >
                    {`${response[selectedValue]} (${response[displayValue]})`}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
        <TextField
          required={required}
          sx={{
            fieldset: { border: !textError && "none" },
            border: "none",
            background: "#F4F4F4",

            flexBasis: 0,
            flexGrow: { xl: 6, lg: 5, md: 5, sm: 5, xs: 10 },
            "::placeholder": {
              color: "rgba(0, 0, 0, 0.87)",
            },
          }}
          fullWidth
          name={textname}
          onChange={(e) => {
            if (type === "file") {
              return handleTextChange(e.target.name, e.target.files[0]);
            }
            if (type === "tel") {
              return handleTextChange(
                e.target.name,
                e.target.value.replace(/[^0-9]/g, ``)
              );
            }
            return handleTextChange(
              e.target.name,
              e.target.value.replace(/['"`]/, `’`)
            );
          }}
          size="small"
          placeholder={placeholder}
          value={textValue}
          error={textError}
          helperText={textErrorText}
        />
      </Box>
    </ThemeProvider>
  );
};

export default SelectWithTextField;
