"use client";
import { Box, Card, Modal } from "@mui/material";
import React, { useState } from "react";
// import { useNavigate } from "react-router";
import FormButton from "./FormButton";
import { skyExColors } from "../../controller/constant";
import TextContainer from "./TextContainer";
import TagsInput from "./TagsInput";
import { useRouter } from "next/navigation";

function TrackerModal({ open, close }) {
  const [awb, setAwb] = useState("");
  const router = useRouter();
  // const handleNavigate = () => {
  //   navigate("/Track", { state: { awb } });
  // };
  const handleNavigate = () => {
    if (awb) {
      router.push(`/Track?awb=${awb}`);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={close}
      >
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            width: "50%",
            " @media (max-width: 900px)": {
              width: "100%",
            },
          }}
        >
          <Box>
            <TextContainer
              fontSize={"30px"}
              fontWeight={700}
              lineHeight={"1.2"}
              color={"#102C38"}
              value={"Track Your Package"}
            />
            <br />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "25px",
              }}
            >
              <div style={{ width: "65%", overflow: "hidden" }}>
                <TagsInput
                  fullWidth
                  variant="outlined"
                  id="tags"
                  name="Track"
                  placeholder="Track your Package"
                  label="Track"
                  chipdata={awb}
                  selectedTags={setAwb}
                />
              </div>
              <div style={{ margin: 10 }}></div>
              <FormButton
                value="Track"
                padding={"0rem 2rem"}
                height={"40px"}
                background={skyExColors.secondary}
                shadow={"#fff"}
                fullWidth
                border
                clickFunction={handleNavigate}
              />
            </div>
          </Box>
        </Card>
      </Modal>
    </div>
  );
}

export default TrackerModal;
