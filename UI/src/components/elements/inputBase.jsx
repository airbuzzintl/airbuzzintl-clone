import React from "react";
import {
  Button,
  InputAdornment,
  InputBase,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
const SkyExAdminPanelEditBaseTheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: "#f0f0f0", // Your default background color
          border: "2px solid #4a4a4a", // Default border color
          borderRadius: "10px",
          padding: "0.5rem 1rem",
          color: "#000", // Text color
          "&.Mui-focused": {
            borderColor: "#1976d2", // Focused border color
          },
        },
      },
    },
  },
});

const FormInputBase = ({
  label,
  type,
  disabled,
  readOnly,
  background,
  borderColor,
  placeholder,
  height,
  size,
  color,
  focused,
  multiline,
  name,
  handleChange,
  value,
  border,
  textAlign,
  borderWidth,
  id,
  maxLength,
  rows,
  error,
  helperText,
  viewImage,
  handleOpen,
  edit,
  required,
}) => {
  const handleInputChange = (e) => {
    // For file inputs, we don't try to set the 'value' programmatically
    if (type === "file") {
      // Get the selected file and pass it to the handler
      handleChange(name, e.target.files[0]);
    } else {
      // Handle other input types (text, email, etc.)
      handleChange(e);
    }
  };

  return (
    <ThemeProvider theme={SkyExAdminPanelEditBaseTheme}>
      {label && type !== "file" && (
        <Typography variant="caption" sx={{ color: "#000", fontWeight: 600 }}>
          {label}
        </Typography>
      )}
      <InputBase
        id={id || "input-base"}
        type={type} // type="file"
        rows={rows}
        multiline={multiline}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        fullWidth
        // Remove 'value' for file input
        inputProps={{
          maxLength: maxLength,
        }}
        onChange={handleInputChange} // Handle file change here
        endAdornment={
          <InputAdornment
            position="end"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {error && helperText && (
              <Typography
                variant="caption"
                color="red"
                sx={{
                  fontSize: "12px",
                  marginTop: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                {helperText}
              </Typography>
            )}
          </InputAdornment>
        }
        sx={{
          width: "100%",
          border: border === "none" ? "none" : undefined,
          "&:focus-within": {
            borderColor: error ? "red" : borderColor || "#1976d2",
          },
        }}
      />
    </ThemeProvider>
  );
};

export default FormInputBase;
