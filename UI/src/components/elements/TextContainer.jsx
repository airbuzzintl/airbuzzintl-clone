import { Tooltip, Typography } from "@mui/material";
import { skyExColors } from "../../controller/constant";
import { useState } from "react";
const TextContainer = ({
  value,
  color,
  fontWeight,
  textAlign,
  fontSize,
  lineHeight,
  gutterBottom,
  textShadow,
  textDecoration,
  paddingRight,
  fontStyle,
  px,
  paddingTop,
  overflow,
  maxHeight,
  minHeight,
  maxWidth,
  minWidth,
  margin,
  marginTop,
  textTransform,
  variant,
  cursor,
  textOverflow,
  padding,
  className,
  zIndex,
  position,
  wordBreak,
  whiteSpace,
  WebkitLineClamp,
  mediaQuery,
  WebkitBoxOrient,
  display,
  title,
  maxChar,
}) => {
  const [showReadMore, setShowReadMore] = useState(false);

  const linesToShow = WebkitLineClamp || 4;

  const toggleReadMore = () => {
    setShowReadMore(!showReadMore);
  };

  const maxChars = maxChar;

  const truncatedText = showReadMore ? value : value?.slice(0, maxChars);
  // const truncatedText = showReadMore ? value : value?.slice(0, 150);


  return (
    <Typography
      className={className}
      variant={variant}
      sx={{
        color: color ? color : "#000",
        fontWeight: fontWeight ? fontWeight : 500,
        textAlign: textAlign ? textAlign : "left",
        fontSize: fontSize ? fontSize : "16px",
        lineHeight: lineHeight ? lineHeight : "1.5",
        textShadow: textShadow ? textShadow : "none",
        fontFamily: "'Montserrat', sans-serif",
        fontStyle: fontStyle,
        paddingRight: paddingRight ? paddingRight : "none",
        position: position,
        px: px,
        textOverflow: textOverflow,
        paddingTop: paddingTop,
        overflow: overflow,
        maxHeight: maxHeight,
        padding: padding,
        maxWidth: maxWidth,
        minHeight: minHeight,
        minWidth: minWidth,
        marginTop: marginTop,
        margin: margin,
        cursor: cursor ? cursor : "text",
        textTransform: textTransform,
        zIndex: zIndex,
        wordBreak: wordBreak,
        whiteSpace: whiteSpace,
        WebkitLineClamp: showReadMore ? "none" : linesToShow,
        WebkitBoxOrient: WebkitBoxOrient,
        display: display,
      }}
      gutterBottom={gutterBottom}
    >
      {truncatedText}
      {value?.length > maxChars && !showReadMore && (
        <Tooltip
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "#fff",
                color: `${skyExColors.primary}`,
                "& .MuiTooltip-arrow": {
                  color: "#fff",
                },
              },
            },
          }}
          title={title}
          arrow
        >
          <span
            onClick={toggleReadMore}
            style={{ fontSize: "12px", color: "gray" }}
          >
            ...read more
          </span>{" "}
        </Tooltip>
      )}
    </Typography>
  );
};

export default TextContainer;
