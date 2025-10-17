import React, { useState } from "react";
// import LanguageIcon from "@mui/icons-material/Language";
import dubaiflag from "../../assets/newImages/download.png";
import bahrainflag from "../../assets/newImages/bahrain.png";
import { useAirbuzzLocation } from "../../controller/constant/LocationContext";
import { skyExColors } from "../../controller/constant";
import { Avatar, Box,} from "@mui/material";

const Countries = () => {
  const [isHovered, setHovered] = useState(false);
  const { currentLocation, toggleLocation } = useAirbuzzLocation();

  const flagMap = {
    "United Arab Emirates": dubaiflag,
    BAHRAIN: bahrainflag,
  };

  const handleLocationChange = (e) => {
    toggleLocation();
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", marginRight: "40px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box style={{marginRight: "10px"}}>
        <Avatar src={flagMap[currentLocation]} alt="Avatar" />
      </Box>

      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <select
          value={currentLocation}
          onChange={handleLocationChange}
          style={{
            padding: "5px",
            borderRadius: "5px",
            background: skyExColors.darkPrimary,
            borderColor: "white",
            color: "white",
            fontWeight: "bold",
            width: "100px",
            cursor: "pointer",
          }}
        >
          <option value="United Arab Emirates" style={{ fontWeight: "bold" }}>
            UAE
          </option>
          <option value="BAHRAIN" style={{ fontWeight: "bold" }}>
            BAHRAIN
          </option>
        </select>
      </div>
    </div>
  );
};

export default Countries;
