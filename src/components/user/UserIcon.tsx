import { DecodedData } from "../../eas/types/decoded-data.type";
import { ImageIcon } from "./user-icon/ImageIcon";
import { PraiseUserAccount } from "../../praise/types/user-account";
import React from "react";
import { SvgIcon } from "./user-icon/SvgIcon";
import { getAllPraiseUsers } from "../../praise/getAllPraiseUsers";
import { getAllRecipientAttestations } from "../../eas/getAllRecipientAttestations";
import { getDecodedValue } from "../../eas/getDecodedValue";
import { getEnsAvatar } from "../../viem/getEnsAvatar";
import { getOptimistAttestation } from "../../eas/optimist/getOptimistAttestation";
import { getPraiseUserByAddress } from "../../praise/getPraiseUserByAddress";
import { getProfileMetaData } from "../../eas/optimist/getProfileMetadata";

type UserIconProps = {
  address?: string;
  variant?: "round" | "square";
  size?: "tiny" | "small" | "large";
  className?: string;
  plusOne?: boolean;
};

const discordAvatarUrl = (account: PraiseUserAccount): string => {
  return `https://cdn.discordapp.com/avatars/${account.accountId}/${account.avatarId}.webp?size=128`;
};

export async function UserIconInner({
  address,
  variant = "round",
  size = "small",
  className = "",
  plusOne = false,
}: UserIconProps) {
  if (!address) {
    return <SvgIcon size={size} />;
  }

  let url;

  // Get profile image from ENS
  url = await getEnsAvatar(address);

  // Get profile image from Optimist attestation
  if (!url) {
    const attestations = await getAllRecipientAttestations(address);
    const optimistAttestation = getOptimistAttestation(attestations);
    if (optimistAttestation) {
      const json: DecodedData = JSON.parse(optimistAttestation.decodedDataJson);
      const profileMetadataPtr = getDecodedValue<string>(
        json,
        "profileMetadataPtr"
      );
      const metadata = await getProfileMetaData(profileMetadataPtr);
      url = metadata?.profileImageUrl;
    }
  }

  // Get profile image from Praise
  if (!url) {
    const praiseUsers = await getAllPraiseUsers();
    const praiseUser = getPraiseUserByAddress(praiseUsers, address);
    if (praiseUser) {
      if (
        Array.isArray(praiseUser.accounts) &&
        praiseUser.accounts.length > 0
      ) {
        for (const account of praiseUser.accounts) {
          // Prefer DISCORD over others
          if (account.avatarId && account.platform === "DISCORD") {
            url = discordAvatarUrl(account);
            break;
          }
        }
      }
    }
  }

  return url ? (
    <ImageIcon
      url={url}
      variant={variant}
      size={size}
      className={className}
      plusOne={plusOne}
    />
  ) : (
    <SvgIcon size={size} className={className} />
  );
}

export async function UserIcon({
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
