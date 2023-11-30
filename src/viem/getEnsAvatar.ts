import React from "react";
import { normalize } from "viem/ens";
import { publicClient } from "./client";

export const getEnsAvatar = React.cache(async (address: string) => {
  try {
    const ensName = await publicClient.getEnsName({
      address: address as `0x${string}`,
    });
    if (ensName) {
       const ensAvatar = await publicClient.getEnsAvatar({
        name: normalize(ensName),
      });
      return ensAvatar;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
});
