"use client";
import { Backdrop, Modal, Tooltip } from "@mui/material";
import Fade from "@mui/material/Fade";
import clsx from "clsx";
import React, { ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";

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
              <AiOutlineClose className="text-neutral-300" />
            </div>
            <section>{data}</section>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default CustomModal;
