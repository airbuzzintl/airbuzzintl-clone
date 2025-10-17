import { ThemeProvider } from "@emotion/react";
import { createContext, useEffect, useState } from "react";
import { SkyExTheme } from "./controller/constant/muiThemes";
import SkyExRoutes from "./Routes";
import { useLocation } from "react-router";
import BackDropLoading from "./components/elements/BackDropLoading";
import "./App.css";

export const loadContext = createContext();

const App = () => {
  const { pathname } = useLocation();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <loadContext.Provider value={{ setLoading, isLoading }}>
      <ThemeProvider theme={SkyExTheme}>
        <div className="App">
          <BackDropLoading />
          <SkyExRoutes />
        </div>
      </ThemeProvider>
    </loadContext.Provider>
  );
};

export default App;
