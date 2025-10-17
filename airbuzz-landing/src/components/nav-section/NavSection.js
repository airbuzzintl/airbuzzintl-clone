import PropTypes from "prop-types";
import { Box, Collapse, List, ListItemText } from "@mui/material";
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List
        disablePadding
        sx={{ p: 1, height: "78vh", overflowY: "scroll" }}
        className="scroll4"
      >
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, children } = item;
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };
  const [active, setActive] = useState();
  return (
    <>
      {!children ? (
        <StyledNavItem
          to={path}
          sx={{
            "&.active": {
              color: "text.primary",
              bgcolor: "action.selected",
              fontWeight: "fontWeightBold",
            },
          }}
        >
          <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
          <ListItemText
            disableTypography
            primary={title}
            style={{ color: "#fff" }}
          />
        </StyledNavItem>
      ) : (
        <>
          <StyledNavItem
            onClick={handleExpand}
            sx={{
              "&.active": {
                color: "text.primary",
                fontWeight: "fontWeightBold",
              },
            }}
          >
            <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
            <ListItemText
              disableTypography
              primary={title}
              sx={{ color: "white", fontWeight: "bold" }}
            />
            {expand ? (
              <MdOutlineKeyboardArrowUp
                color="white"
                size={20}
                style={{ marginRight: 5 }}
              />
            ) : (
              <MdOutlineKeyboardArrowDown
                color="white"
                size={20}
                style={{ marginRight: 5 }}
              />
            )}
          </StyledNavItem>
          <Collapse in={expand} timeout="auto" unmountOnExit>
            {children?.map((e, i) => (
              <List
                disablePadding
                sx={{
                  height: 40,
                }}
              >
                <StyledNavItem
                  to={e.path}
                  sx={{
                    ml: 4,
                    ":hover": {
                      background: "transparent",
                      color: "white",
                    },
                  }}
                  onClick={() => setActive(i)}
                >
                  <Box
                    component="span"
                    sx={{
                      width: i === active ? 7 : 3,
                      height: i === active ? 7 : 3,
                      display: "flex",
                      borderRadius: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "white",
                      marginX: 2,
                      transition: (theme) =>
                        theme.transitions.create("transform"),
                    }}
                  />
                  <ListItemText
                    disableTypography
                    primary={e.title}
                    sx={{ color: "white" }}
                  />
                </StyledNavItem>
              </List>
            ))}
          </Collapse>
        </>
      )}
    </>
  );
}
