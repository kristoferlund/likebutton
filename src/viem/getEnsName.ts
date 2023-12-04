import React from "react";
import { publicClient } from "./client";
import { unstable_cache } from "next/cache";

export const getEnsName = unstable_cache(async (address: string) => {
  const ensName = publicClient.getEnsName({
    address: address as `0x${string}`,
  });
  return ensName;
});
