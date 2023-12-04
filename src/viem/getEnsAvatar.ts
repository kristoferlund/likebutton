import { normalize } from "viem/ens";
import { publicClient } from "./client";
import { unstable_cache } from "next/cache";

export const getEnsAvatar = unstable_cache(async (address: string) => {
  const ensName = await publicClient.getEnsName({
    address: address as `0x${string}`,
  });
  if (ensName) {
    const ensAvatar = await publicClient.getEnsAvatar({
      name: normalize(ensName),
    });
    return ensAvatar;
  }
});
