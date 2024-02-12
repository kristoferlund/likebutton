"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { configureChains, createConfig, mainnet } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { optimism } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [optimism, mainnet],
  [
    alchemyProvider({ apiKey: "9gxw46BCBj2lWs5hT3Z0mvgm-333uhVy" }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "OP Attestation Explorer",
  projectId: "af268529c3a115de846e562f99c88cb4",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { wagmiConfig, chains };
