import React from "react";
import { shortenEthAddress } from "../../util/string";

type UidProps = {
  uid: string;
  className?: string;
};

export const Uid = React.memo(function Uid({ uid, className }: UidProps) {
  return (
    <a href={`https://optimism.easscan.org/attestation/view/${uid}`}>
      <div className={className}>{shortenEthAddress(uid)}</div>
    </a>
  );
});
