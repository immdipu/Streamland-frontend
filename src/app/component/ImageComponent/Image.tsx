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
  Imageheight = 210,
}) => {
  return (
    <>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt ?? "poster"}
        style={{ objectFit: "cover", height: `${Imageheight}px` }}
        placeholder="blur"
        blurDataURL={placeholderImage.src}
        className={"rounded-lg select-none " + `w-${ImageWidth}`}
      />
    </>
  );
};

export default Images;
