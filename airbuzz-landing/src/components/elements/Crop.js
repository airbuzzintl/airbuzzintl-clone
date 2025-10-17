import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Card, Modal } from "@mui/material";
import { skyExColors } from "../../controller/constant";
import FormButton from "./FormButton";

const Crop = ({ open, handleClose, CroppedImage, ratio }) => {
  const [image, setImage] = useState("");
  const cropperRef = useRef(null);
  const onChange = (e) => {
    e.preventDefault();
    const inputElement = e.dataTransfer || e.target;
    const files = inputElement.files;

    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };
  const getCropData = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();

      if (croppedCanvas) {
        croppedCanvas.toBlob((blob) => {
          if (blob) {
            const croppedFile = new File([blob], "cropped_image.png", {
              type: "image/png",
            });
            CroppedImage(croppedFile);
          }
        }, "image/png");
      } else {
        console.log("Error: Cropped canvas is not available.");
      }
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
        }}
      >
        {image ? (
          <div style={{ width: "100%" }}>
            <br />
            <br />

            <Cropper
              ref={cropperRef}
              style={{ height: 400, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={ratio}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
            />
          </div>
        ) : (
          <></>
        )}
        <br />
        <input type="file" onChange={onChange} />
        {image && (
          <div
            className="box"
            style={{
              width: "100%",
              height: "100px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormButton
              value={"Crop"}
              padding={"0rem 2rem"}
              height={"40px"}
              background={skyExColors.secondary}
              shadow={"#fff"}
              fullWidth
              border
              clickFunction={getCropData}
            />
          </div>
        )}
      </Card>
    </Modal>
  );
};

export default Crop;
