"use client";

import { useEffect, useState } from "react";

import AttestDialog from "./AttestDialog";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

export default function LikeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useAccount();

  const [className, setClassName] = useState("opacity-50");

  useEffect(() => {
    // Weird workaround, see this issue: https://github.com/vercel/next.js/issues/52534
    if (isConnected) {
      setClassName("hover:opacity-70");
    } else {
      setClassName("opacity-50");
    }
  }, [isConnected]);

  function handleClick() {
    if (isConnected) {
      setIsOpen(true);
    } else {
      toast.error("Connect your wallet first");
    }
  }

  return (
    <div className="mb-10 flex flex-col items-center gap-5">
      <Image
        src="/click-to-like.svg"
        alt="Optimism Attestations"
        width={250}
        height={40}
        className={className}
        onClick={handleClick}
      />
      <div className="text-xs flex items-center text-gray-400">
        Powered by
        <a href="https://attest.sh/" className="flex items-center">
          <Image
            src="/eas.png"
            className="w-5 h-5 inline-block"
            height="50"
            width="50"
            alt="EAS"
          />
          <span className="underline">EAS</span>
        </a>
      </div>
      <AttestDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
