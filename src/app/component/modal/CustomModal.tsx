"use client";
import React, { Children, ReactNode, useState } from "react";
import { CgMoreVerticalO } from "react-icons/cg";
import {
  Tooltip,
  IconButton,
  Modal,
  Backdrop,
  Box,
  List,
  ListItemButton,
  Collapse,
} from "@mui/material";
import Fade from "@mui/material/Fade";

import { AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";

interface seeMoreModal {
  data: ReactNode;
  buttonElement: ReactNode;
  tooltip?: string;
  width?: number | "full" | string;
}

const CustomModal: React.FC<seeMoreModal> = ({
  data,
  buttonElement,
  tooltip,
  width = "full",
}) => {
  const [open, setOpen] = React.useState(false);
  const [Listopen, setListOpen] = React.useState(false);
  const [openNetwork, setOpenNetwork] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title={tooltip}>
        <div onClick={handleOpen} className="cursor-pointer">
          {buttonElement}
        </div>
      </Tooltip>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <div
            className={clsx(
              "absolute top-1/2 left-1/2 rounded-md shadow-md max-md:w-[90%]  bg-[#1b1b1b] -translate-x-1/2 -translate-y-1/2 ",
              `w-${width}`
            )}
          >
            <div
              onClick={handleClose}
              className="absolute -right-5 -top-5  bg-_genre_chip_bg rounded-lg px-3 py-3 z-10 cursor-pointer"
              id="modalclosebtn"
            >
              <AiOutlineClose />
            </div>
            <section>{data}</section>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default CustomModal;
