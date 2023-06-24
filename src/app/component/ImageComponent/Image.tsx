"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ImagesProps {
  src: string;
  width: number;
  height: number;
  alt: string | undefined;
  ImageWidth?: number;
  Imageheight?: number;
}

const Images: React.FC<ImagesProps> = ({
  src,
  width,
  height,
  alt,
  ImageWidth = 36,
  Imageheight = 210,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  return (
    <>
      {isImageLoading ? (
        <Image
          src={"/cinemaalogo.png"}
          width={width}
          height={height}
          alt={alt ?? "poster"}
          style={{ objectFit: "cover", height: `${Imageheight}px` }}
          className={"rounded-lg select-none " + `w-${ImageWidth}`}
        />
      ) : (
        <Image
          placeholder="blur"
          blurDataURL="/cinemaalogo.png"
          src={src}
          width={width}
          height={height}
          alt={alt ?? "poster"}
          style={{ objectFit: "cover", height: `${Imageheight}px` }}
          className={"rounded-lg select-none " + `w-${ImageWidth}`}
        />
      )}
    </>
  );
};

export default Images;
