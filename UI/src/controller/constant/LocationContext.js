import React, { createContext, useContext, useState, useEffect } from "react";
import { cookies } from "../Common";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const storedLocation =
    cookies.get("currentLocation") || "United Arab Emirates";
  const [currentLocation, setCurrentLocation] = useState(storedLocation);
  const [isVisible, setIsVisible] = useState(true);

  const toggleLocation = () => {
    setCurrentLocation((prevLocation) =>
      prevLocation === "United Arab Emirates"
        ? "BAHRAIN"
        : "United Arab Emirates"
    );
  };

  useEffect(() => {
    cookies.set("currentLocation", currentLocation, { path: "/" });
  }, [currentLocation]);

  return (
    <LocationContext.Provider
      value={{ currentLocation, toggleLocation, isVisible, setIsVisible }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useAirbuzzLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useAirbuzzLocation must be used within a LocationProvider"
    );
  }
  return context;
};
