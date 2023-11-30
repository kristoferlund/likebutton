import { Attestation } from "../../../eas/types/gql/attestation.type";
import { DecodedData } from "../../../eas/types/decoded-data.type";
import { getDecodedValue } from "../../../eas/getDecodedValue";

type CustomDisplayProps = {
  attestation: Attestation;
};

export function PassportCustomDisplay({ attestation }: CustomDisplayProps) {
  const json: DecodedData = JSON.parse(attestation.decodedDataJson);

  const score = getDecodedValue<bigint>(json, "score");
  const divisor = BigInt(1000000000000000000);
  let formattedScore = "0";
  if (score) {
    formattedScore = `${(score / divisor).toString()}.${(
      score % divisor
    ).toString()}`;
    formattedScore = formattedScore.replace(/\.?0+$/, "");
  }

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col w-full gap-10 sm:flex-row">
        <div className="flex flex-col items-center w-48 p-4 border rounded-lg">
          <div className="text-4xl font-semibold">{formattedScore}</div>
          <div className="text-sm text-gray-500">Passport Score</div>
        </div>
      </div>
    </div>
  );
}
