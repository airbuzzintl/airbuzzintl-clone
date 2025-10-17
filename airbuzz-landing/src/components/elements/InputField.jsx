import {
  Button,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

const FormInputFields = ({
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
  inputProps,
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
  // Create a custom theme to modify border behavior
  const SkyExAdminPanelEditFieldTheme = createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            background: background ? background : "#fff",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& fieldset": {
              border: border === "none" ? "none" : undefined, // Conditionally remove the border
            },
          },
        },
      },
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
      {label && type === "file" && (
        <>
          <Typography variant="caption" sx={{ color: "#B0B0B0" }} gutterBottom>
            {label}
          </Typography>
        </>
      )}
      <TextField
        size={size ? size : "medium"}
        id={id ? id : "outlined-basic"}
        label={label && type !== "file" ? label : ""}
        variant="outlined"
        type={type}
        rows={rows}
        multiline={multiline}
        focused={focused}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        fullWidth
        required={required}
        InputLabelProps={{
          shrink: focused || value, // Ensure the label shrinks when focused or has a value
        }}
        InputProps={{
          endAdornment: viewImage ? (
            <InputAdornment position="end">
              <Button variant="contained" onClick={handleOpen}>
                View
              </Button>
            </InputAdornment>
          ) : null,
          ...inputProps,
        }}
        name={name}
        value={value}
        inputProps={{
          maxLength: maxLength,
        }}
        onChange={(e) => {
          if (type === "file") {
            return handleChange(name, e.target.files[0]);
          }
          if (type === "tel") {
            return handleChange(
              e.target.name,
              e.target.value.replace(/[^0-9]/g, ``)
            );
          }
          if (edit) {
            return handleChange(handleChange);
          }
          return handleChange(
            e.target.name,
            e.target.value.replace(/['"`]/, `’`)
          );
        }}
        sx={{
          borderWidth: borderWidth ? borderWidth : 2,
          borderColor: borderColor ? borderColor : "rgb(74 74 74)",
          minHeight: height ? height : "100%",
          color: color ? color : "#000",
          border: border === "none" ? "none" : border,
          textAlign: textAlign,
          borderRadius: "50px",
        }}
        error={error}
        helperText={helperText}
      />
    </ThemeProvider>
  );
};

export default FormInputFields;
