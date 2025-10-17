import React, { useState } from "react";
import { styled } from "@mui/system";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";

import { AccordionDetails } from "@mui/material";
import { skyExColors } from "../../../controller/constant";
import { TextContainer } from "../../elements";
import FaqModal from "../../elements/FaqModal";

const Accordion = styled((props) => (
  <MuiAccordion
    disableGutters
    elevation={2}
    sx={{ borderLeft: 5, borderColor: skyExColors.secondary }}
    square
    {...props}
  />
))(() => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  elevation: 5,
  borderRadius: 10,
}));

export const Accordions = ({ item, expanded, onChange }) => {
  const { question, answer, image, link } = item;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <FaqModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        image={image}
      />
      <div style={{ padding: "0 2rem" }}>
        <Accordion expanded={expanded} onChange={onChange}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <TextContainer
              fontSize="14px"
              value={question}
              color={expanded ? "#000" : "#404040"}
              cursor="pointer"
            />
          </AccordionSummary>
          <AccordionDetails>
            <TextContainer fontSize="14px" value={answer} />
            {link !== undefined && link !== "undefined" && link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontWeight: 500,
                  textDecoration: "none",
                  lineHeight: "2",
                  textShadow: "none",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {link}
              </a>
            )}
            {image && (
              <div
                style={{
                  justifyContent: "flex-end",
                  display: "flex",
                  marginTop: "1%",
                  fontWeight: 600,
                  color: "#0077b6",
                  cursor: "pointer",
                }}
                onClick={() => setModalOpen(true)}
              >
                Reference
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
