"use client";
/* eslint-disable react/no-unescaped-entities */
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { BiChevronDown } from "react-icons/bi";

const Accordion = styled((props: any) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${"#373737"}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: any) => (
  <MuiAccordionSummary
    expandIcon={<BiChevronDown className="text-[#d9d9d9]" />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#262626",
  color: "#d9d9d9",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
    color: "#d9d9d9",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  backgroundColor: "#262626",
  color: "#d9d9d9",
  padding: theme.spacing(2),
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel: any) => (event: any, newExpanded: any) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="max-w-2xl mt-32 w-full mx-auto  rounded-2xl">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>What is streamland?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Just like every other website, this website is also a streaming site
            that helps to easily access all the TV shows and movies we wanted,
            without spending hours searching for them.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>So what do we actually do?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Well, let me tell you what we don’t do: we definitely don’t
            illegally host our files. We do not store any copyright-protected
            content on our website. Any linked content is stored only in
            third-party websites. This is a promotional website only. All files
            placed here are for introducing purpose. We highly ENCOURAGE users
            to BUY the CDs or DVDs of the movie or the music they like.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>I cannot watch video because of ads</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We are very sorry that we can't help you with that. We have no
            control in the ads being served. Don't download anything in the
            popups. If you don't want to be annoyed. We highly recommend
            subscribing to a legal streaming service that you can afford.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel4d-header">
          <Typography>
            Streaming speed is slow or all videos do not play
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            When you go on the page with the episode, in 99% of the cases there
            is a video player. What you have to do is click the Play button, of
            course. If it does not work (Don’t be judgmental! Everybody makes
            mistakes!), just click on the Servers you see on the top left of
            your device. You will get a list of servers [Vidcloud, Hydrax etc.]
            Try choosing different server, it will definitely solve the problem.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel5d-header">
          <Typography>I want to download video</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Since we don't store any files, so we don't have any download
            feature here. All files found on this site have been collected from
            various sources across the web and are believed to be in the public
            domain.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel6d-header">
          <Typography>Is it safe to stream in this website?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This website is undoubtedly safer to stream, however downloading,
            uploading is illegal. You will not get into any trouble while using
            our website. It's highly not recommended to download the files and
            share them to the public, It might get you in trouble.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
