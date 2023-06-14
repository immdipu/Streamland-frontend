"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

interface ImagesProps {
  src: string;
  width: number;
  height: number;
  alt: string | undefined;
  placeholderImage: StaticImageData;
  ImageWidth?: number;
  Imageheight?: number;
}

const Images: React.FC<ImagesProps> = ({
  src,
  width,
  height,
  alt,
  placeholderImage,
  ImageWidth = 36,
  Imageheight = 52,
}) => {
  return (
    <>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt ?? "poster"}
        style={{ objectFit: "cover" }}
        placeholder="blur"
        blurDataURL={placeholderImage.src}
        className={
          "rounded-lg select-none " + `w-${ImageWidth} h-${Imageheight}`
        }
      />
    </>
  );
};

export default Images;
