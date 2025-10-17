"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { LocationContext } from "../../controller/constant/LocationContext";
import { skyExColors } from "../../controller/constant";
import { Avatar, Box } from "@mui/material";
import dubaiflag from "@/assets/newImages/download.png";
import bahrainflag from "@/assets/newImages/bahrain.png";

const Countries = () => {
  const [isHovered, setHovered] = useState(false);
  const { currentLocation, toggleLocation } = useContext(LocationContext) || {};

  const flagMap = {
    "United Arab Emirates": dubaiflag,
    BAHRAIN: bahrainflag,
  };

  const handleLocationChange = (e) => {
    toggleLocation();
  };
  const currentFlag = flagMap[currentLocation] || dubaiflag; // fallback

  console.log("Current Location:", currentLocation);
  console.log("Flag src:", currentFlag);

  return (
    <div
      style={{ display: "flex", alignItems: "center", marginRight: "40px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box style={{ marginRight: "10px" }}>
        <Avatar>
          <Image
            // src={flagMap[currentLocation]}
            src={currentFlag}
            alt="Country Flag"
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
            priority
          />
        </Avatar>
      </Box>

      <div style={{ position: "relative", display: "inline-block" }}>
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
