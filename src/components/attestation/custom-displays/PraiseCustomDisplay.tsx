import { faAward, faCheckToSlot } from "@fortawesome/free-solid-svg-icons";

import { Attestation } from "../../../eas/types/gql/attestation.type";
import { DecodedData } from "../../../eas/types/decoded-data.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDecodedValue } from "../../../eas/getDecodedValue";

type CustomDisplayProps = {
  attestation: Attestation;
};

export function PraiseCustomDisplay({ attestation }: CustomDisplayProps) {
  const json: DecodedData = JSON.parse(attestation.decodedDataJson);

  const receivedScore = getDecodedValue<number>(json, "received_score");
  const givenScore = getDecodedValue<number>(json, "given_score");
  const top10Receiver = getDecodedValue<boolean>(json, "top_10_receiver");
  const top50Receiver = getDecodedValue<boolean>(json, "top_50_receiver");
  const top100Receiver = getDecodedValue<boolean>(json, "top_100_receiver");
  const top10Giver = getDecodedValue<boolean>(json, "top_10_giver");
  const top50Giver = getDecodedValue<boolean>(json, "top_50_giver");
  const top100Giver = getDecodedValue<boolean>(json, "top_100_giver");
  const period = getDecodedValue<string>(json, "period");
  const quantifier = getDecodedValue<string>(json, "quantifier");

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="sm:flex w-full gap-10 sm:flex-row grid grid-cols-2">
        <div className="flex flex-col items-center sm:w-48 p-4 border rounded-lg">
          <div className="text-4xl font-semibold">{receivedScore}</div>
          <div className="text-sm text-gray-500">Received Score</div>
        </div>

        <div className="flex flex-col items-center sm:w-48 p-4 border rounded-lg">
          <div className="text-4xl font-semibold">{givenScore}</div>
          <div className="text-sm text-gray-500">Given Score</div>
        </div>

        {/* Top 10 receiver */}
        {typeof quantifier === "boolean" && quantifier && (
          <div className="flex flex-col p-2 border rounded-lg gap-2 items-center justify-center">
            <div>Quantifier</div>
            <FontAwesomeIcon icon={faCheckToSlot} className="w-7 h-7" />
          </div>
        )}
      </div>

      <div className="sm:flex w-full gap-10 sm:flex-row grid grid-cols-2 sm:flex-wrap">
        {/* Top 10 receiver */}
        {typeof top10Receiver === "boolean" && top10Receiver && (
          <div className="flex p-2 border rounded-lg gap-2 items-center">
            <div className="whitespace-nowrap">
              Top <strong>10</strong>
              <br />
              receiver
            </div>
            <FontAwesomeIcon icon={faAward} className="w-7 h-7" />
          </div>
        )}
        {/* Top 50 receiver */}
        {typeof top50Receiver === "boolean" && top50Receiver && (
          <div className="flex p-2 border rounded-lg gap-2 items-center">
            <div className="whitespace-nowrap">
              Top <strong>50</strong>
              <br />
              receiver
            </div>
            <FontAwesomeIcon icon={faAward} className="w-7 h-7" />
          </div>
        )}

        {/* Top 100 receiver */}
        {typeof top100Receiver === "boolean" && top100Receiver && (
          <div className="flex p-2 border rounded-lg gap-2 items-center">
            <div className="whitespace-nowrap">
              Top <strong>100</strong>
              <br />
              receiver
            </div>
            <FontAwesomeIcon icon={faAward} className="w-7 h-7" />
          </div>
        )}

        {/* Top 10 giver */}
        {typeof top10Giver === "boolean" && top10Giver && (
          <div className="flex p-2 border rounded-lg gap-2 items-center">
            <div className="whitespace-nowrap">
              Top <strong>10</strong>
              <br />
              giver
            </div>
            <FontAwesomeIcon icon={faAward} className="w-7 h-7" />
          </div>
        )}

        {/* Top 50 giver */}
        {typeof top50Giver === "boolean" && top50Giver && (
          <div className="flex p-2 border rounded-lg gap-2 items-center">
            <div className="whitespace-nowrap">
              Top <strong>50</strong>
              <br />
              giver
            </div>
            <FontAwesomeIcon icon={faAward} className="w-7 h-7" />
          </div>
        )}

        {/* Top 100 giver */}
        {typeof top100Giver === "boolean" && top100Giver && (
          <div className="flex p-2 border rounded-lg gap-2 items-center">
            <div className="whitespace-nowrap">
              Top <strong>100</strong>
              <br />
              giver
            </div>
            <FontAwesomeIcon icon={faAward} className="w-7 h-7" />
          </div>
        )}
      </div>
      {/* Period */}
      {typeof period === "string" && (
        <div>
          Praise period:{" "}
          <a
            href={`https://optimism.givepraise.xyz/periods/${period}`}
            target="_blank"
            className="underline"
          >
            {period}
          </a>
        </div>
      )}
    </div>
  );
}
