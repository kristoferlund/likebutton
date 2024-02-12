import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";

import ConnectWallet from "./ConnectWallet";
import { chains } from "../wagmi/wagmiConfig";
import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <div className="flex items-start w-full p-10">
      <div className="flex flex-col items-center justify-between w-full gap-5 md:gap-0 md:items-start md:flex-row">
        <div className="flex items-center gap-5">
          <div className="py-5">
            <Link to="/">
              <img
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
