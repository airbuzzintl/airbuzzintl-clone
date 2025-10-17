import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown({
  placeholder,
  value,
  handleChange,
  displayValue,
  list,
  index,
  name,
  selectedValue,
  error,
}) {
  return (
    <>
      <FormControl fullWidth>
        <Select
          id="demo-simple-select"
          displayEmpty
          value={value}
          name={name}
          onChange={(e) => handleChange(e.target.name, e.target.value, index)}
          sx={{ color:"gray", bgcolor: "white", height: "100%" }}
          error={error}
          renderValue={(selected) => {
            if (!selected) {
              return <em>{placeholder}</em>;
            }
            return selected;
          }}
        >
          {list ? (
            !displayValue ? (
              list.map((response) => (
                <MenuItem value={response}>{response}</MenuItem>
              ))
            ) : (
              list.map((response) => (
                <MenuItem value={response[selectedValue]}>
                  {response[displayValue]}
                </MenuItem>
              ))
            )
          ) : (
            <MenuItem value={"dd"}>{"ddd"}</MenuItem>
          )}
        </Select>
      </FormControl>
    </>
  );
}
