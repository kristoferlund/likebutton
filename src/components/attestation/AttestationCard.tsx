import { Attestation } from "../../eas/types/gql/attestation.type";
import { From } from "../attestation-card/From";
import Image from "next/image";
import Link from "next/link";
import { Recipient } from "../attestation-card/Recipient";
import { SchemaName } from "../attestation-card/SchemaName";
import { Time } from "../attestation-card/Time";
import { Uid } from "../attestation-card/Uid";
import { UserIcon } from "../user/UserIcon";
import { getUserName } from "../../eas/getUserName";

type AttestationCardProps = {
  attestation: Attestation;
};

export async function AttestationCard({ attestation }: AttestationCardProps) {
  return (
    <Link href={`/user/${attestation.recipient}`}>
      <div className="flex items-center justify-start w-full p-5 text-sm bg-white gap-10 md:text-base gap-x-5 hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40 rounded-xl shadow-theme-shadow-1">
        <Image
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
            <From from={attestation.attester} />
          </div>
        </div>
      </div>
    </Link>
  );
}
