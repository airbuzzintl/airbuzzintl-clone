"use client";
import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import styled from "styled-components";
import {
  Box,
  Container,
  createTheme,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Navbar } from "../../controller/constant/NavbarAddress";
import { skyExColors } from "../../controller/constant";
import SideNavigationBar from "./SideNavigationBar";
import { images } from "../../controller/constant/images";
import Countries from "../../components/elements/Countries";
import { instance } from "../../utils/api";
import { LocationContext } from "@/controller/constant/LocationContext";
import { useRouter } from "next/navigation";

const TopNavigationBar = ({ children }) => {
  const router = useRouter();
  const [sideBar, setSideBar] = useState(false);
  const [y, setY] = useState(0); // Initialize to 0
  const [pageTitle, setPageTitle] = useState([]);

  //Meta-Title
  const fetchPageDetails = async () => {
    try {
      const response = await instance.get(`/Service/getmetaTitle`);

      if (response.status === 200) {
        setPageTitle(response.data);
      }
    } catch (error) {
      console.error("Error fetching page details:", error);
    }
  };

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      setY(window.scrollY);
    };

    // Add the event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  useEffect(() => {
    fetchPageDetails();
  }, []);

  const TopNavBarStyle = createTheme({
    components: {
      MuiListItem: {
        styleOverrides: {
          root: {
            filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.5))",
            fontSize: "18px",
            fontWeight: 700,
            margin: "5px 4px ",
            cursor: "pointer",
            transition: "all 0.5s ease-out",
            ":hover": {
              color: skyExColors.secondary,
              filter: "drop-shadow(0px 1px 1px rgba(0,0,0, 0.6))",
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {},
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: skyExColors.skyExDarkGrey,
            fontSize: "larger",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            background: "#fff",
          },
        },
      },
    },
  });
  const MenuBar = ({ opened, menu, handleClosed, menuItem }) => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={menu}
        open={opened}
        onClose={handleClosed}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiPopover-paper": {
            borderBottom: `5px solid ${skyExColors.secondary}`,
            borderRadius: 0,
          },
        }}
      >
        {menuItem?.map((e, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              handleClosed();
              router.push(e.path);
            }}
          >
            {e.name}
          </MenuItem>
        ))}
      </Menu>
    );
  };

  const TopNavbar = () => {
    const { currentLocation } = useContext(LocationContext) || {};

    const [menu, setMenu] = useState(null);
    const opened = Boolean(menu);
    const [state, setstate] = useState(0);
    const handleClosed = () => {
      setMenu(null);
    };

    return (
      <>
        {Navbar.map((e, i) => (
          <div
            key={i}
            onClick={(event) => {
              if (e?.path && e.title === "Login") {
                const url =
                  currentLocation === "United Arab Emirates"
                    ? "https://airbuzz.feroai.com/#/login"
                    : "https://airbuzzbahrain.feroai.com/#/login";
                window.open(url, "_blank");
              } else {
                e?.menu && setMenu(event.currentTarget);
                setstate(i);
                e?.path && router.push(e.path);
              }
            }}
            style={{
              height: "100%",
            }}
          >
            <ListItem
              id="basic-button"
              key={i}
              aria-controls={opened ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={opened ? "true" : undefined}
            >
              {e.title}
            </ListItem>
          </div>
        ))}
        <MenuBar
          opened={opened}
          menu={menu}
          menuItem={Navbar[state]?.menu}
          handleClosed={handleClosed}
        />
      </>
    );
  };

  return (
    <>
      {sideBar && (
        <>
          <SideNavigationBar close={() => setSideBar(false)} open={sideBar} />
        </>
      )}

      <ThemeProvider theme={TopNavBarStyle}>
        <AppBar
          position="fixed"
          sx={{
            height: "70px",
            background: skyExColors.darkPrimary,
            boxShadow: "none",
          }}
        >
          {/* <TopBar /> */}
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ImageWrapper
                onClick={() => router.push("/")}
                style={{ cursor: "pointer", marginRight: "100px" }}
              >
                <Img
                  src={images.airbuzzLogo.src}
                  alt="Logo"
                  draggable={false}
                />
              </ImageWrapper>
              <IconButton
                sx={{
                  display: {
                    xl: "none",
                    lg: "none",
                    md: "none",
                    sm: "flex",
                    xs: "flex",
                  },
                  "@media (max-width: 1019px)": {
                    display: "flex",
                  },
                  background: skyExColors.green,
                }}
                onClick={() => setSideBar(!sideBar)}
              >
                <MenuIcon style={{ color: "#fff" }} />
              </IconButton>

              <List
                sx={{
                  marginRight: "90px",
                  display: {
                    xl: "flex",
                    lg: "flex",
                    md: "flex",
                    sm: "none",
                    xs: "none",
                  },
                  "@media (max-width: 1019px)": {
                    display: "none",
                  },
                }}
              >
                <TopNavbar />
              </List>
              <Box
                sx={{
                  marginLeft: "100px",
                  display: {
                    xl: "flex",
                    lg: "flex",
                    md: "flex",
                    sm: "none",
                    xs: "none",
                  },
                  "@media (max-width: 1019px)": {
                    display: "none",
                  },
                }}
              >
                <Countries />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Box sx={{ mt: { xs: 1, sm: 5 } }}>{children}</Box>
      </ThemeProvider>
      {/* <Footer /> */}
    </>
  );
};

export default TopNavigationBar;

const ImageWrapper = styled.div`
  width: 13rem;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 5rem;
`;
const Img = styled.img`
  width: 100%;
  display: block;
  filter: drop-shadow(${skyExColors.primary} 1px 1px 0px);
`;
