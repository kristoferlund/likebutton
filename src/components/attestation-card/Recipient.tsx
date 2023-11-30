import React from "react";
import { getEnsName } from "../../viem/getEnsName";
import { getUserName } from "../../eas/getUserName";
import { shortenEthAddress } from "../../util/string";

type RecipientProps = {
  recipient: string;
};

export async function RecipientInner({ recipient }: RecipientProps) {
  const username = await getUserName(recipient);

  if (recipient === "0x0000000000000000000000000000000000000000") {
    return <div>No recipient</div>;
  }

  return (
    <div className="w-32 font-medium md:w-48 overflow-clip overflow-ellipsis">
      {username || shortenEthAddress(recipient)}
    </div>
  );
}

export async function Recipient({ recipient }: RecipientProps) {
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
