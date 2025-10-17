import { Box, Card, IconButton, Modal } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import React from "react";
import { Url, downloadUrl } from "../../utils/api";
import { skyExColors } from "../../controller/constant";

const FaqModal = ({ open, handleClose, image }) => {
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
      >
        <>
          <Box sx={{ position: "absolute", right: "50px", top: "50px" }}>
            <a href={`${downloadUrl}${image}`}>
              <IconButton aria-label="Example" sx={{ float: "right" }}>
                <FileDownloadIcon
                  sx={{
                    color: skyExColors.primary,
                    fontSize: 40,
                  }}
                />
              </IconButton>
            </a>
          </Box>
          <Card
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "20px",
            }}
          >
            <img
              src={`${Url}${image}`}
              alt="imag"
              style={{ width: "100%", height: "600px" }}
            />
          </Card>
        </>
      </Modal>
    </div>
  );
};

export default FaqModal;
