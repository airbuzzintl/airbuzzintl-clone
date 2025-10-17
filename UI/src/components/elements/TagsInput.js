import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Downshift from "downshift";
import { skyExColors } from "../../controller/constant";

export default function TagsInput({ selectedTags, chipdata }) {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(chipdata);

  const handleKeyDown = (event) => {
    if (event?.key === "Enter" || event?.key === "," || event?.key === " ") {
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim()
      );

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!event.target.value.replace(/\s/g, "").length) return;

      newSelectedItem.push(event.target.value.trim());
      setSelectedItem(newSelectedItem);
      setInputValue("");
    }
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  };

  const handleChange = (item) => {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setSelectedItem(newSelectedItem);
    selectedTags(newSelectedItem);
  };

  const handleDelete = (item) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
    selectedTags(newSelectedItem);
  };
  const memoizedSelectedItem = useMemo(() => selectedItem, [selectedItem]);
  const handleInputChange = (event) => {
    if (event.nativeEvent.inputType.toString() === "insertFromPaste") {
      const tags = event.target.value
        .split(/[, ]+/)
        .filter((tag) => tag.trim() !== "");
      setSelectedItem((prevSelected) => [...prevSelected, ...tags]);
    } else {
      setInputValue(event.target.value.replace(",", ""));
      handleKeyDown(event);
    }
  };
  useEffect(() => {
    setSelectedItem(chipdata);
  }, [chipdata]);
  useEffect(() => {
    selectedTags(memoizedSelectedItem);
  }, [memoizedSelectedItem, selectedTags]);

  return (
    <Downshift
      id="downshift-multiple"
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItem}
    >
      {({ getInputProps }) => {
        const { onBlur, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
        });
        return (
          <div>
            <TextField
              size="small"
              fullWidth
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
                backgroundColor: skyExColors.skyExTextBoxGrey,
                overflow: "hidden",
                width: "100%",
              }}
              InputProps={{
                startAdornment: Array.isArray(selectedItem)
                  ? selectedItem.map((item) => (
                      <Chip
                        key={item}
                        tabIndex={-1}
                        label={item.split(",")}
                        onDelete={handleDelete(item)}
                      />
                    ))
                  : null,
                onBlur,
                onChange: (event) => {
                  handleInputChange(event);
                },
              }}
              placeholder={
                "Enter multiple AWB numbers separated by a comma or a blank space."
              }
              {...inputProps}
            />
          </div>
        );
      }}
    </Downshift>
  );
}

TagsInput.propTypes = {
  selectedTags: PropTypes.func.isRequired,
  chipdata: PropTypes.arrayOf(PropTypes.string),
};
