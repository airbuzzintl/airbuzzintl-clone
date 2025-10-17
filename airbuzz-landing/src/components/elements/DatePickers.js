import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { skyExColors } from "../../controller/constant";

const customTextFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: skyExColors.green,
    },
    "&.Mui-focused fieldset": {
      borderColor: skyExColors.green,
    },
    "& fieldset": {
      borderColor: skyExColors.green,
    },
    "& .MuiOutlinedInput-input": {
      color: skyExColors.blue,
    },
  },
  "& .MuiInputLabel-root": {
    color: "grey",
    "&.Mui-focused": {
      color: "grey",
    },
    borderColor: "grey",
  },
  "& .MuiSelect-icon": {
    color: "grey",
  },
};

const DatePickers = ({
  label,
  value,
  onChange,
  fullWidth,
  placeholder,
  name,
  sx,
  background,
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TextField
          type="date"
          size="full"
          focused
          name={name}
          label={label}
          fullWidth={fullWidth}
          placeholder={placeholder}
          value={value}
          onChange={(e) =>
            onChange({
              target: {
                name: e.target.name,
                value: e.target.value,
              },
            })
          }
          background={background}
          sx={{
            ...sx,
            ...customTextFieldStyle,
            backgroundColor: "#f3f3f3",
            marginTop: "6px",
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DatePickers;
