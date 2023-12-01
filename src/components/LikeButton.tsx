"use client";

import AttestDialog from "./AttestDialog";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { useState } from "react";

export default function LikeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useAccount();

  function handleClick() {
    if (isConnected) {
      setIsOpen(true);
    } else {
      toast.error("Connect your wallet first");
    }
  }

  const className = isConnected ? "hover:opacity-70 mb-10" : "opacity-50 mb-10";
  return (
    <>
      <Image
        src="/click-to-like.svg"
        alt="Optimism Attestations"
        width={250}
        height={40}
        className={className}
        onClick={handleClick}
      />
      <AttestDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
