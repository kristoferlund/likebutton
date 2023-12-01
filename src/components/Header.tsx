"use client";

import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { chains, wagmiConfig } from "../wagmi/wagmiConfig";

import ConnectWallet from "./ConnectWallet";
import Image from "next/image";
import Link from "next/link";
import { WagmiConfig } from "wagmi";

export function Header() {
  return (
    <div className="flex items-start w-full h-72 md:h-40 pt-3 px-7">
      <div className="flex flex-col items-center justify-between w-full md:flex-row px-7">
        <div className="flex items-center gap-5">
          <div className="py-5">
            <Link href="/1">
              <Image
                src="/like-thumb.svg"
                alt="Optimism Attestations"
                width={150}
                height={150}
              />
            </Link>
          </div>
        </div>

        <RainbowKitProvider
          modalSize="compact"
          theme={lightTheme({
            accentColor: "#7082AC",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
          chains={chains}
        >
          <ConnectWallet />
        </RainbowKitProvider>
      </div>
    </div>
  );
}
