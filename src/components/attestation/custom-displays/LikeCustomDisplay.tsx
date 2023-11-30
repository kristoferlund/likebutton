import { Attestation } from "../../../eas/types/gql/attestation.type";
import Image from "next/image";

type CustomDisplayProps = {
  attestation: Attestation;
};

export function LikeCustomDisplay({ attestation }: CustomDisplayProps) {
  return (
    <div className="flex w-full justify-center items-center">
      <Image
        src="/like-thumb.svg"
        alt="like"
        className="w-20 h-20"
        width="100"
        height="100"
      />
    </div>
  );
}
