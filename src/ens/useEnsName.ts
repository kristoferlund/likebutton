import { isAddress } from "viem";
import { publicClient } from "../viem/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useEnsName = (userId: string) => {
  return useSuspenseQuery({
    queryKey: ["ensName", userId],
    queryFn: async () => {
      if (!isAddress(userId)) {
        return userId;
      }
      return publicClient.getEnsName({
        address: userId,
      });
    },
  });
};
