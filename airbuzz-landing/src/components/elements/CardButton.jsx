import { Button } from "@mui/material";
import { skyExColors } from "../../controller/constant/colors";

const CardButton = ({
  color,
  fontWeight,
  textTransform,
  fontSize,
  name,
  icon,
  textDecoration,
  padding,
  onClick,
  backgroundColor,
}) => {
  return (
    <Button
      sx={{
        color: color ? color : skyExColors.skyExButtonBlack,
        fontWeight: fontWeight ? fontWeight : 700,
        textTransform: textTransform ? textTransform : "capitalize",
        fontSize: fontSize ? fontSize : "18px",
        textDecoration: textDecoration ? textDecoration : "none",
        padding: padding ? padding : "0px 7px",
        backgroundColor: backgroundColor,
      }}
      onClick={onClick}
    >
      {name}&nbsp;{icon}
    </Button>
  );
};
export default CardButton;
