"use client";
import { Box, SwipeableDrawer } from "@mui/material";
import { navConfig } from "../../controller/data/navConfig";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import NavSection from "../admin/NavSection";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import { skyExColors } from "../../controller/constant";
import { images } from "../../controller/constant/images";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SideNavigationBar = ({ close, open }) => {
  const navigate = useRouter();
  const NAV_WIDTH = 280;

  const renderContent = (
    <Scrollbar
      style={{
        backgroundImage: `linear-gradient(to top, ${skyExColors.darkPrimary}, ${skyExColors.primary})`,
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
        <ImageWrapper
          onClick={() => navigate.push("/")}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={images.footerLogo}
            width={112}
            height={54}
            style={{ width: "112px" }}
            alt="Logo"
          />
        </ImageWrapper>
      </div>
      <NavSection data={navConfig} close={close} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );
  return (
    <SwipeableDrawer
      open={open}
      onClose={close}
      anchor={"right"}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: { width: NAV_WIDTH },
      }}
    >
      {renderContent}
    </SwipeableDrawer>
  );
};
export default SideNavigationBar;

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
