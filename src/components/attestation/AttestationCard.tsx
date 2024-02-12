import { Link } from "@tanstack/react-router";
import { AttestationWithCoreFieldsFragment } from "../../gql/graphql";
import { From } from "../attestation-card/From";
import { Recipient } from "../attestation-card/Recipient";
import { Time } from "../attestation-card/Time";
import { UserIcon } from "../user/UserIcon";

type AttestationCardProps = {
  attestation: AttestationWithCoreFieldsFragment;
};

export function AttestationCard({ attestation }: AttestationCardProps) {
  return (
    <Link to={"/user/$userId"} params={{ userId: attestation.recipient }}>
      <div className="flex items-center justify-start w-full gap-10 p-5 text-sm text-black bg-white md:text-base gap-x-5 hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40 rounded-xl shadow-theme-shadow-1">
        <img
          src="/like-thumb.svg"
          alt="like"
          className="w-10 h-10"
          width="50"
          height="50"
        />
        <UserIcon address={attestation.recipient} plusOne />
        <div className="flex flex-col">
          <Recipient recipient={attestation.recipient} />
          <div className="block md:hidden">
            <Time time={attestation.time.toString()} />
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="hidden md:block">
          <Time time={attestation.time.toString()} />
        </div>
        <div className="flex-grow"></div>
        <div className="@3xl:grid @3xl:grid-cols-3 @3xl:w-56 text-left hidden">
          <div className="flex items-center w-12 text-xs text-gray-500">
            From
          </div>
          <div className="flex items-center col-span-2 gap-1">
            <UserIcon
              address={attestation.attester}
              size="tiny"
              className="inline-block"
            />
            <From
              from={attestation.attester}
              className="w-32 whitespace-nowrap overflow-ellipsis overflow-clip"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
