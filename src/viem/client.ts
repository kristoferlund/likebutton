import { createPublicClient, http } from "viem";

import { mainnet } from "viem/chains";

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(
    `https://eth-mainnet.g.alchemy.com/v2/${
      import.meta.env.VITE_ALCHEMY_API_KEY
    }`
  ),
});
