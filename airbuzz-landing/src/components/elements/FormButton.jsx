import { Button, Stack } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { skyExColors } from "../../controller/constant/colors";
import { BsArrowRight } from "react-icons/bs";

const FormButton = ({
  value,
  variant,
  background,
  fullWidth,
  height,
  padding,
  size,
  icon,
  color,
  border,
  clickFunction,
  fontSize,
  fontWeight,
  disable,
  width,
  margin,
  filter,
  viewMore,
  type,
  shadow,
}) => {
  return (
    <>
      {!viewMore ? (
        <Stack sx={{ width: "fit-content" }}>
          <Button
            className="button-50"
            type={type}
            variant={variant ? variant : "contained"}
            fullWidth={fullWidth}
            size={size ? size : "medium"}
            disabled={disable}
            sx={{
              background: background ? background : skyExColors.skyExOrgange,
              textTransform: "capitalize",
              fontSize: fontSize ? fontSize : "medium",
              minHeight: height ? height : "100%",
              borderRadius: border ? border : "4px",
              padding: padding ? padding : ".1rem",
              margin: margin ? margin : "0 5px 10px 0",
              color: color ? color : "#fff",
              maxWidth: width ? width : "100%",
              fontWeight: fontWeight ? fontWeight : 500,
              backgroundImage: "none",
              border: "1px solid #519534",
              boxShadow: `-4px 4px 0 0 ${shadow}, -5px 5px 0 0 #519534`,
              boxSizing: "border-box",
              cursor: "pointer",
              display: "inline-block",
              fontFamily: "ITCAvantGardeStd-Bk, Arial, sans-serif",
              lineHeight: "10px",
              overflow: "visible",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              touchAction: "manipulation",
              userSelect: "none",
              WebkitUserSelect: "none",
              verticalAlign: "middle",
              whiteSpace: "nowrap",
              transition: ".5s all ease",
              filter: filter,

              "&:hover": {
                backgroundColor: "#519534",
                textDecoration: "none",
                border: "1px solid #519534",
                borderRadius: "4px",
                boxShadow: `-4px 4px 0 0 ${shadow}, -5px 5px 0 0 #519534`,
                boxSizing: "border-box",
                color: "#fff",
                cursor: "pointer",
              },

              "&:active": {
                boxShadow: `-3px 3px 0 0 ${shadow}, -4px 4px 0 0 #519534`,
                outline: 0,
                transform: "translate(-3px, 3px)",
              },
            }}
            onClick={clickFunction}
          >
            {value}
            {icon && (
              <>
                &nbsp;
                <EastIcon style={{ fontSize: "x-large", color: "#fff" }} />
              </>
            )}
          </Button>
        </Stack>
      ) : (
        <div>
          <Button
            variant="outlined"
            sx={{
              border: "1px solid #63B233",
              color: "white",
              fontWeight: "700",
              padding: "9px",
              width: width,
              height: height,
            }}
            endIcon={<BsArrowRight />}
            onClick={clickFunction}
          >
            {value}
          </Button>
        </div>
      )}
    </>
  );
};

export default FormButton;
