"use client";

import Image from "next/image";
import { SvgIcon } from "./SvgIcon";
import { useState } from "react";

type ImageIconProps = {
  url: string;
  variant?: "round" | "square";
  size?: "tiny" | "small" | "large";
  className?: string;
  plusOne?: boolean;
};

function sizeClass(size: ImageIconProps["size"]) {
  if (size === "tiny") {
    return "h-4 w-4";
  }
  if (size === "large") {
    return "h-20 w-20";
  }
  return "h-10 w-10";
}

export function ImageIcon({
  url,
  variant = "round",
  size = "small",
  className = "",
  plusOne = false,
}: ImageIconProps) {
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);

  const roundedClass = variant === "round" ? "rounded-full" : "rounded-3xl";

  if (imageLoadError) {
    return <SvgIcon />;
  }

  return (
    <div
      className={`flex items-center justify-center relative ${sizeClass(
        size
      )} ${className}`}
    >
      <Image
        src={url}
        onError={(): void => setImageLoadError(true)}
        alt="avatar"
        width={60}
        height={60}
        className={`object-cover max-w-none ${roundedClass} ${sizeClass(size)}`}
      />
      {plusOne && (
        <Image
          src="/plus-one.svg"
          alt="like"
          className="w-5 h-5 absolute top-6 left-6"
          width="20"
          height="20"
        />
      )}
    </div>
  );
}
