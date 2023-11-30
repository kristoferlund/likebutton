"use client";

import { useEffect, useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAccount } from "wagmi";

type LocalState = {
  isConnected: boolean;
  address: `0x${string}` | undefined;
};

export default function ConnectWallet() {
  const { isConnected, address } = useAccount();
  const [localState, setLocalState] = useState<LocalState>({
    isConnected: false,
    address: undefined,
  });

  useEffect(() => {
    setLocalState({
      isConnected,
      address,
    });
  }, [isConnected, address]);

  return (
    <div className="flex gap-[12px]">
      {localState.isConnected && (
        <Link
          href={`/user/${localState.address}`}
          className={`px-3 py-2 transition-all bg-white rounded-xl shadow-theme-shadow-1 hover:scale-105 text-theme-1`}
        >
          <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
        </Link>
      )}
      <ConnectButton
        showBalance={false}
        chainStatus={{ smallScreen: "icon", largeScreen: "icon" }}
      />
    </div>
  );
}
