import React, { ReactNode } from "react";
import {
  Tooltip,
  IconButton,
  Modal,
  Backdrop,
  Box,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";

interface ListItemsProps {
  children: ReactNode;
  onClick?: () => void;
}

const ListItems: React.FC<ListItemsProps> = ({ children, onClick }) => {
  return (
    <ListItemButton
      onClick={onClick}
      sx={[
        {
          display: "block",
          overflow: "hidden",
        },
        (theme) => ({
          "&:hover": {
            backgroundColor: "#111111",
          },
          [theme.breakpoints.down("sm")]: {
            paddingLeft: 1,
            paddingRight: "3px",
          },
        }),
      ]}
    >
      {children}
    </ListItemButton>
  );
};

export default ListItems;
