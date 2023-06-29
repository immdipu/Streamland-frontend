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
import { useSpring, animated } from "@react-spring/web";
import {
  tvshowCreatorProps,
  TVshowNetworkProps,
  TVshowSpokenLanguage,
} from "@/types/types";

import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import { AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

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
        <IconButton onClick={handleOpen}>{buttonElement}</IconButton>
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
              className="absolute -right-5 -top-5 bg-_genre_chip_bg rounded-lg px-3 py-3 z-10 cursor-pointer"
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
