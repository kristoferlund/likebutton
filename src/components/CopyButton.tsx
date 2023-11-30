"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

interface CopyButtonProps {
  textToCopy: string;
}

export function CopyButton({ textToCopy }: CopyButtonProps): JSX.Element {
  return (
    <div
      className="flex p-2 rounded-full cursor-pointer hover:bg-theme-3 hover:bg-opacity-20 text-theme-3"
      onClick={(): void => {
        void navigator.clipboard.writeText(textToCopy);
        toast.success("Copied to clipboard");
      }}
    >
      <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
    </div>
  );
}
