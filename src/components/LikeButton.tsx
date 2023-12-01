"use client";

import AttestDialog from "./AttestDialog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LikeButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Image
        src="/click-to-like.svg"
        alt="Optimism Attestations"
        width={250}
        height={40}
        className="hover:opacity-70 mb-10"
        onClick={() => setIsOpen(true)}
      />
      <AttestDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
