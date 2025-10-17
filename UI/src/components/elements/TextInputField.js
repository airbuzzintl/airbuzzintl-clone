import { IconButton, InputAdornment, Tooltip, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
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

const TextInputField = ({
  label,
  name,
  value,
  type,
  sx,
  size,
  info,
  onChange,
  disabled,
  focused,
  multiline,
  rows,
  required,
  maxLength,
  text,
  
}) => {
  return (
    <>
    
      <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#0d4f6c" }}>
        {label}
      </Typography>

      <TextField 
        fullWidth
        variant="outlined"
        type={type}
        disabled={disabled}
        value={value}
        name={name}
        required={required}
        inputProps={{ maxLength: maxLength, minLength: 5 }}
        onChange={(e) => {
          let newValue = e.target.value;
          if (text) {
            newValue = newValue.replace(/[^a-zA-Z\s]/g, '');
          } 
          onChange({
            target: {
              name: e.target.name,
              value: newValue.replace(/'/g, "’").replace(/"/g, "“"),
            },
          });
        }}
        focused={focused}
        multiline={multiline}
        rows={rows}
        sx={{
          ...sx,
          ...customTextFieldStyle,
          backgroundColor: "#f3f3f3",
          marginTop: "6px",
          position: "relative",
        }}
        size={size ? size : "small"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {maxLength && (
                <span
                  style={{
                    fontSize: "9px",
                    position: "absolute",
                    top: 0,
                    right: "1%",
                    bottom:10
                  }}
                >
                  <span style={{ fontWeight: "bold", }}>Char left:</span>
                  {maxLength - value?.length}
                </span>
              )}
              {info !== false && (
                <Tooltip title={value} arrow>
                  <IconButton>
                    <AiOutlineInfoCircle
                      style={{ cursor: "pointer", color: "grey",top:5 }}
                      size={18}
                    /> 
                  </IconButton>
                </Tooltip>
              )}
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};


export default TextInputField;
