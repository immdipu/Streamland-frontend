"use client";
import React, { useState } from "react";
import Image from "next/image";
import fallbackSrc from "@/assets/logo.png";
import { StaticImageData } from "next/image";

interface ImagesProps {
  src: string;
  width: number;
  height: number;
  alt: string | undefined;
  ImageWidth?: number | "full";
  Imageheight?: number | "full";
  rounded?: string;
  objectFit?: "cover" | "contain";
}

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
const Images: React.FC<ImagesProps> = ({
  src,
  width,
  height,
  alt,
  ImageWidth = 36,
  Imageheight = 210,
  rounded = "lg",
  objectFit = "cover",
}) => {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src);
  return (
    <>
      <Image
        src={imgSrc}
        width={width}
        height={height}
        alt={alt ?? "poster"}
        onLoadingComplete={(result) => {
          if (result.naturalWidth === 0) {
            // Broken image
            setImgSrc(fallbackSrc);
          }
        }}
        onError={() => {
          console.log("error occured");
          setImgSrc(fallbackSrc);
        }}
        style={{ objectFit: `${objectFit}`, height: `${Imageheight}px` }}
        className={"select-none  " + `w-${ImageWidth} rounded-${rounded} `}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(fallbackSrc.src)}`}
      />
    </>
  );
};

export default Images;
