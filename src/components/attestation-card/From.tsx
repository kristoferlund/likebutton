import React from "react";
import { getUserName } from "../../eas/getUserName";
import { shortenEthAddress } from "../../util/string";

type FromProps = {
  from: string;
  className?: string;
};

export async function FromInner({ from, className }: FromProps) {
  const username = await getUserName(from);

  return (
    <div className={`whitespace-nowrap ${className}`}>
      {username || shortenEthAddress(from)}
    </div>
  );
}

export async function From({ from, className }: FromProps) {
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
