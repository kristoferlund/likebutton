import React from "react";
import { publicClient } from "./client";

export const getEnsName = React.cache(async (address: string) => {
  try {
    const ensName = publicClient.getEnsName({
      address: address as `0x${string}`,
    });
    return ensName;
  } catch (e) {
    console.error(e);
    return null;
  }
});
