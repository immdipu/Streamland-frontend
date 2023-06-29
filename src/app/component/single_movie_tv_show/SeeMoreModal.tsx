"use client";
import React, { useState } from "react";
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
import ListItems from "../MuiComponent/ListItem";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import Images from "../ImageComponent/Image";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1b1b1b",
  boxShadow: 24,
  borderRadius: 2,
};

interface seeMoreModal {
  original_name?: string;
  created_by?: tvshowCreatorProps[];
  in_production?: boolean;
  networks?: TVshowNetworkProps[];
  spoken_languages?: TVshowSpokenLanguage[];
  status: string;
  tagline?: string;
  homepage: string;
  last_air_date?: string;
}

const SeeMoreModal: React.FC<seeMoreModal> = ({
  original_name,
  created_by,
  in_production,
  networks,
  spoken_languages,
  status,
  tagline,
  homepage,
  last_air_date,
}) => {
  const [open, setOpen] = React.useState(false);
  const [Listopen, setListOpen] = React.useState(false);
  const [openNetwork, setOpenNetwork] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    setListOpen(!Listopen);
  };
  const handleOpenNetwork = () => {
    setOpenNetwork(!openNetwork);
  };

  return (
    <>
      <Tooltip title="See More">
        <IconButton onClick={handleOpen}>
          <CgMoreVerticalO className="text-_welcometext_lightblue text-lg opacity-70 hover:opacity-100 duration-200 transition-opacity ease-linear" />
        </IconButton>
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
          <Box sx={style}>
            <div
              onClick={handleClose}
              className="absolute -right-5 -top-5 bg-_genre_chip_bg rounded-lg px-3 py-3 z-10 cursor-pointer"
            >
              <AiOutlineClose />
            </div>
            {original_name && (
              <>
                <ListItems>
                  <div className="flex gap-2 py-2 items-center px-2">
                    <h3 className=" text-_sidenav_bg">Original Title:</h3>
                    <p className="text-sm text-_light_white">{original_name}</p>
                  </div>
                </ListItems>
                <div className="w-full h-[0.2px] opacity-20 bg-_light_white" />
              </>
            )}

            {created_by && created_by.length > 0 && (
              <>
                <ListItems onClick={handleClick}>
                  <div className="flex px-2 py-1 justify-between items-center">
                    <h3 className=" text-_sidenav_bg">Creators</h3>
                    {Listopen ? (
                      <BiChevronUp className="text-_light_white text-2xl" />
                    ) : (
                      <BiChevronDown className="text-_light_white text-2xl" />
                    )}
                  </div>
                </ListItems>

                <Collapse in={Listopen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {created_by?.map((item) => {
                      return (
                        <>
                          <ListItems>
                            <div className="flex gap-3 items-center">
                              <div className="w-12">
                                <Images
                                  rounded="full"
                                  alt={item.name}
                                  width={100}
                                  objectFit="contain"
                                  height={100}
                                  Imageheight={50}
                                  ImageWidth={"full"}
                                  src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                                />
                              </div>

                              <p className="text-base text-_light_white">
                                {item.name}
                              </p>
                            </div>
                          </ListItems>
                        </>
                      );
                    })}
                  </List>
                </Collapse>
                <div className="w-full h-[0.2px] opacity-20 bg-_light_white" />
              </>
            )}
            {networks && networks.length > 0 && (
              <>
                <ListItems onClick={handleOpenNetwork}>
                  <div className="flex px-2 py-1 justify-between items-center">
                    <h3 className=" text-_sidenav_bg">Networks</h3>
                    {openNetwork ? (
                      <BiChevronUp className="text-_light_white text-2xl" />
                    ) : (
                      <BiChevronDown className="text-_light_white text-2xl" />
                    )}
                  </div>
                </ListItems>

                <Collapse in={openNetwork} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {networks?.map((item) => {
                      return (
                        <>
                          <ListItems>
                            <div className="flex gap-3 items-center">
                              <div className="w-12">
                                <Images
                                  rounded="full"
                                  objectFit="contain"
                                  alt={item.name}
                                  width={100}
                                  height={100}
                                  Imageheight={50}
                                  ImageWidth={"full"}
                                  src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                                />
                              </div>

                              <p className="text-base text-_white">
                                {item.name}
                              </p>
                            </div>
                          </ListItems>
                        </>
                      );
                    })}
                  </List>
                </Collapse>
                <div className="w-full h-[0.2px] opacity-20 bg-_light_white" />
              </>
            )}
            <>
              {spoken_languages && spoken_languages.length > 0 && (
                <>
                  <ListItems>
                    <h3 className=" px-2 text-_sidenav_bg">
                      Spoken Languages :
                    </h3>
                    <div className="flex  px-2 gap-2 mt-1 items-center flex-wrap">
                      {spoken_languages.map((item) => {
                        return (
                          <>
                            <p className="text-xs text-_light_white">
                              {item.name}
                            </p>
                          </>
                        );
                      })}
                    </div>
                  </ListItems>
                  <div className="w-full h-[0.2px] opacity-20 bg-_light_white" />
                </>
              )}

              <ListItems>
                <div className="block py-1 items-center px-2">
                  <h3 className=" text-_sidenav_bg">In Production:</h3>
                  <p className="text-xs mt-1 text-_light_white">
                    {in_production ? "Yes" : "No"}
                  </p>
                </div>
              </ListItems>
              <div className="w-full h-[0.2px] opacity-20 bg-_light_white" />
              <ListItems>
                <div className=" py-1 items-center px-2">
                  <h3 className=" text-_sidenav_bg">Status:</h3>
                  <p className="text-xs mt-1 text-_light_white">{status}</p>
                </div>
              </ListItems>
              <div className="w-full h-[0.2px] opacity-20 bg-_light_white" />
            </>
            {tagline && tagline !== "" && (
              <>
                <ListItems>
                  <div className="block py-1 gap-2 items-center px-2">
                    <h3 className=" text-_sidenav_bg">Tagline:</h3>
                    <p className=" mt-1 text-xs text-_light_white">{tagline}</p>
                  </div>
                </ListItems>
                <div className="w-full h-[0.2px] opacity-20 bg-_light_white" />
              </>
            )}
            {last_air_date && (
              <>
                <ListItems>
                  <div className="block py-1 gap-2 items-center px-2">
                    <h3 className=" text-_sidenav_bg">Last air date:</h3>
                    <p className=" mt-1 text-xs text-_light_white">
                      {last_air_date}
                    </p>
                  </div>
                </ListItems>
                <div className="w-full h-[0.2px] opacity-20 bg-_light_white" />
              </>
            )}

            {homepage && homepage !== "" && (
              <>
                <ListItems>
                  <div className="block py-1 px-2 gap-2 items-center">
                    <h3 className=" text-_sidenav_bg">Homepage:</h3>
                    <Link
                      className="text-sm text-_blue"
                      href={homepage}
                      target="_blank"
                    >
                      {homepage}
                    </Link>
                  </div>
                </ListItems>
                <div className="w-full h-[0.2px] opacity-20 bg-_light_white" />
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default SeeMoreModal;
