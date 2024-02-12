import { mainnet, useEnsName } from "wagmi";

import React from "react";
import { shortenEthAddress } from "../../util/string";

type FromProps = {
  from: string;
  className?: string;
};

export function FromInner({ from, className }: FromProps) {
  // const { data: username } = useEnsName(from);
  const { data: username } = useEnsName({
    address: from as `0x${string}`,
    chainId: mainnet.id,
  });

  return (
    <div className={`whitespace-nowrap ${className}`}>
      {username || shortenEthAddress(from)}
    </div>
  );
}

export function From({ from, className }: FromProps) {
  return (
    <React.Suspense
      fallback={
        <div className={`whitespace-nowrap ${className}`}>
          {shortenEthAddress(from)}
        </div>
      }
    >
      <FromInner from={from} className={className} />
    </React.Suspense>
  );
}
