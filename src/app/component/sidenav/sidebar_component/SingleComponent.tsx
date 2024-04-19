"use client";
import { DesktopSingleComponentProps } from "@/types/types";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import Link from "next/link";

const SingleComponent: React.FC<DesktopSingleComponentProps> = ({
  href,
  active,
  icon: Icon,
  label,
}) => {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={clsx(
          " font-Inter gap-3 font-normal relative pl-3 tracking-normal flex rounded-full  text-[13px]  hover:bg-blue-300 hover:bg-opacity-10  mx-4 mr-7  py-2 items-center  text-_light_white border-transparent",
          active && "text-white"
        )}
      >
        <Icon
          className={clsx(
            "text-xl",
            active ? "text-white " : "text-_light_white "
          )}
        />
        <p>{label}</p>
        <AnimatePresence>
          {active && (
            <motion.span
              className="absolute -z-10 inset-0 bg-blue-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            ></motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

export default SingleComponent;
