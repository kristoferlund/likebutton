import { mainnet, useEnsName } from "wagmi";

import React from "react";
import { shortenEthAddress } from "../../util/string";

type RecipientProps = {
  recipient: string;
};

export function RecipientInner({ recipient }: RecipientProps) {
  // const { data: username } = useEnsName(recipient);
  const { data: username } = useEnsName({
    address: recipient as `0x${string}`,
    chainId: mainnet.id,
  });

  if (recipient === "0x0000000000000000000000000000000000000000") {
    return <div>No recipient</div>;
  }

  return (
    <div className="w-32 font-medium md:w-48 overflow-clip overflow-ellipsis">
      {username || shortenEthAddress(recipient)}
    </div>
  );
}

export function Recipient({ recipient }: RecipientProps) {
  return (
    <React.Suspense
      fallback={
        <div className="w-32 font-medium md:w-48 overflow-clip overflow-ellipsis">
          {shortenEthAddress(recipient)}
        </div>
      }
    >
      <RecipientInner recipient={recipient} />
    </React.Suspense>
  );
}
