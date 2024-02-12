import { From } from "../attestation-card/From";
import { Time } from "../attestation-card/Time";
import { UserIcon } from "../user/UserIcon";
import { Uid } from "../attestation-card/Uid";
import { AttestationWithCoreFieldsFragment } from "../../gql/graphql";

type AttestationCardAltProps = {
  attestation: AttestationWithCoreFieldsFragment;
};

export function AttestationCardAlt({ attestation }: AttestationCardAltProps) {
  return (
    <div className="flex items-center justify-between w-full p-5 bg-white gap-x-5 rounded-xl shadow-theme-shadow-1">
      <div className="flex items-center justify-start gap-5">
        <img
          src="/like-thumb.svg"
          alt="like"
          className="w-10 h-10"
          width="50"
          height="50"
        />

        <div className="grid w-32 grid-cols-3">
          <div className="flex items-center w-12 text-xs text-gray-500">
            From
          </div>
          <div className="flex items-center col-span-2 gap-1">
            <UserIcon
              address={attestation.attester}
              size="tiny"
              className="inline-block"
            />
            <From from={attestation.attester} />
          </div>
          <div className="flex items-center w-12 text-xs text-gray-500">
            Uid
          </div>
          <Uid uid={attestation.id} className="col-span-2" />
          <Time
            time={attestation.time.toString()}
            className="block mt-1 text-xs text-gray-500 sm:hidden"
          />
        </div>
      </div>
      <Time time={attestation.time.toString()} className="hidden sm:block" />
    </div>
  );
}
