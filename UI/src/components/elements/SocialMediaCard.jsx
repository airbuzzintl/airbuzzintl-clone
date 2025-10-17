import { Box, Card, IconButton, Typography } from "@mui/material";
import { BsFillPatchCheckFill } from "react-icons/bs";
import AirbuszzLogo from "../../assets/AirbuzzLogo.png";
import { Url } from "../../utils/api";
import Modal from "@mui/material/Modal";
import youtube from "../../assets/newImages/youtube.png";
import { useState } from "react";
import moment from "moment";

const SocialMediaCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const handleModal = () => {
    if (data.url_type === "Youtube" && !open) {
      handleOpen();
    } else if (data.url_type === "Youtube" && open) {
      handleClose();
    } else {
      window.open(data.url, "_blank");
    }
  };
  return (
    <div>
      <Card
        sx={{
          background: "#0A1E26",
          width: "100%",
          height: "528px ",
          borderRadius: "20px",
          boxShadow: "  -1px 1px 31px -2px rgba(171,168,168,0.32);",
          "@media (max-width: 600px)": {
            height: "75vh",
          },
        }}
      >
        <Box
          sx={{ display: "flex", paddingLeft: "18px ", paddingTop: "18px " }}
        >
          <Box>
            <img src={AirbuszzLogo} alt="logo" style={{ width: "35px" }} />
          </Box>

          <Box sx={{ paddingLeft: "5px" }}>
            <Typography sx={{ color: "white", fontSize: "16px" }}>
              Airbuzz <BsFillPatchCheckFill size={12} color="#4285f4" />
            </Typography>
            <Typography sx={{ fontSize: "10px", color: "white" }}>
              {moment(data.date).format("MMM DD YYYY")}
            </Typography>
          </Box>
        </Box>
        {/* image */}
        <Box sx={{ padding: "8px" }}>
          <Box
            sx={{
              width: "100%",
              height: "38vh",
              backgroundImage: `url(${Url}${data.image})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "10px",
              position: "relative",
              cursor: data.url ? "pointer" : "text",
            }}
            onClick={data.url ? handleModal : null}
          >
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <iframe
                  width="560"
                  height="315"
                  src={data.url}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen="true"
                ></iframe>
              </Box>
            </Modal>
            {data.url_type === "Youtube" && (
              <IconButton sx={{ ...style, background: "none" }}>
                <img src={youtube} alt="" width={"50px"} />
              </IconButton>
            )}
            <Card
              sx={{
                background: "#0A1E26AA",
                width: "max-content",
                borderRadius: "20px",
                position: "absolute",
                bottom: "10px",
                right: "15px",
                color: "white",
                fontSize: "15px",
                textAlign: "center",
                padding: "1%",
                fontWeight: "600",
              }}
            >
              <Typography sx={{ margin: "2px 5px" }}>
                {data.url_type === "Youtube" ? "Click to play" : "Visit us"}
              </Typography>
            </Card>
          </Box>
        </Box>
        <Box sx={{ padding: "12px", paddingTop: "10px" }}>
          <Typography sx={{ color: "white", fontSize: "16px" }}>
            {data?.content}
          </Typography>
        </Box>
      </Card>
      <br />
    </div>
  );
};

export default SocialMediaCard;
