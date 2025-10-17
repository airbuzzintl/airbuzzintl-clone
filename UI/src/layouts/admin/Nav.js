import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Box, Drawer } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import NavSection from "./NavSection";
import { adminNavConfig } from "./AdminNavConfig";
import { skyExColors } from "../../controller/constant";
import { images } from "../../controller/constant/images";

const NAV_WIDTH = 250;
Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      style={{
        backgroundImage: `linear-gradient(to top, ${skyExColors.darkPrimary}, #0a1e26)`,
      }}
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1.5rem",
        }}
      >
        <ImageWrapper style={{ cursor: "pointer" }}>
          <Img src={images.footerLogo} alt="Logo" />
        </ImageWrapper>
      </div>

      <NavSection data={adminNavConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

const ImageWrapper = styled.div`
  width: 7rem;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 6rem;
`;
const Img = styled.img`
  width: 100%;
  display: block;
`;
