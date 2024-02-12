"use client";

import { useState } from "react";

import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import AttestDialog from "./AttestDialog";

export default function LikeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useAccount();

  const className = isConnected
    ? "hover:opacity-70 cursor-pointer"
    : "opacity-50";

  function handleClick() {
    if (isConnected) {
      setIsOpen(true);
    } else {
      toast.error("Connect your wallet first");
    }
  }

  return (
    <>
      <div className="flex flex-col items-center gap-5 mb-10">
        <img
          src="/click-to-like.svg"
          alt="Optimism Attestations"
          width={250}
          height={40}
          className={className}
          onClick={handleClick}
        />
        <div className="flex items-center text-xs text-gray-400">
          Powered by
          <a href="https://attest.sh/" className="flex items-center">
            <img
              src="/eas.png"
              className="inline-block w-5 h-5"
              height="50"
              width="50"
              alt="EAS"
            />
            <span className="underline">EAS</span>
          </a>
        </div>
      </div>
      <AttestDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
