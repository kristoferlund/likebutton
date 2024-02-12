import { isAddress } from "viem";
import { normalize } from "viem/ens";
import { publicClient } from "../viem/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useEnsAddress = (userId: string) => {
  return useSuspenseQuery({
    queryKey: ["ensAddress", userId],
    queryFn: async () => {
      if (isAddress(userId)) {
        return userId;
      }
      return publicClient.getEnsAddress({
        name: normalize(userId),
      });
    },
  });
};
