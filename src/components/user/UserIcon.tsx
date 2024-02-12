import { mainnet, useEnsAvatar, useEnsName } from "wagmi";

import { ImageIcon } from "./user-icon/ImageIcon";
import React from "react";
import { SvgIcon } from "./user-icon/SvgIcon";

type UserIconProps = {
  address?: string;
  variant?: "round" | "square";
  size?: "tiny" | "small" | "large";
  className?: string;
  plusOne?: boolean;
};

export function UserIconInner({
  address,
  variant = "round",
  size = "small",
  className = "",
  plusOne = false,
}: UserIconProps) {
  const { data: username } = useEnsName({
    address: address as `0x${string}`,
    chainId: mainnet.id,
  });
  const { data: avatarUrl } = useEnsAvatar({
    name: username,
    chainId: mainnet.id,
  });

  if (!address || !avatarUrl) {
    return <SvgIcon size={size} className={className} plusOne={plusOne} />;
  }

  return (
    <ImageIcon
      url={avatarUrl}
      variant={variant}
      size={size}
      className={className}
      plusOne={plusOne}
    />
  );
}

export function UserIcon({
  address,
  variant = "round",
  size = "small",
  className = "",
  plusOne = false,
}: UserIconProps) {
  return (
    <React.Suspense fallback={<SvgIcon size={size} className={className} />}>
      <UserIconInner
        address={address}
        variant={variant}
        size={size}
        className={className}
        plusOne={plusOne}
      />
    </React.Suspense>
  );
}
