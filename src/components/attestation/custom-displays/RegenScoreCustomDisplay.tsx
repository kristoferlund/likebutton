import { Attestation } from "../../../eas/types/gql/attestation.type";
import { DecodedData } from "../../../eas/types/decoded-data.type";
import { MetaItem } from "../../../regenscore/types/meta-item";
import { getDecodedValue } from "../../../eas/getDecodedValue";
import { getRegenScoreData } from "../../../regenscore/getRegenScoreData";

type CustomDisplayProps = {
  attestation: Attestation;
};

export async function RegenScoreCustomDisplay({
  attestation,
}: CustomDisplayProps) {
  const json: DecodedData = JSON.parse(attestation.decodedDataJson);
  const score = getDecodedValue<bigint>(json, "score");
  let regenScoreData = await getRegenScoreData(attestation.recipient);
  const meta = Object.entries(regenScoreData.meta).map(
    ([key, item]) => item
  ) as MetaItem[];

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-col w-full gap-10 sm:flex-row">
        <div className="flex flex-col items-center w-48 p-4 border rounded-lg">
          <div className="text-4xl font-semibold">
            {typeof score === "bigint" && score.toString()}
          </div>
          <div className="text-sm text-gray-500">Score</div>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-5 p-4 border rounded-lg text-xs md:text-base">
        <div className="text-xl font-semibold col-span-2 hidden md:block">
          Behaviour
        </div>
        <div className="text-xl font-semibold hidden md:block">Source</div>
        <div className="text-xl font-semibold hidden md:block">Value</div>
        <div className="text-xl font-semibold hidden md:block">Score Added</div>
        <div className="text-xl font-semibold hidden md:block">Category</div>
        {meta.map((item, index) => {
          if (!item.scoreAdded || item.scoreAdded === 0) return null;
          return (
            <>
              <div className="block md:hidden">Behaviour</div>
              <div className="col-span-2">{item.behavior}</div>
              <div className="block md:hidden">Source</div>
              <div className="col-span-2 md:col-span-1">{item.source}</div>
              <div className="block md:hidden">Value</div>
              <div className="col-span-2 md:col-span-1">
                {" "}
                {item.value && item.value.toString()}
              </div>
              <div className="block md:hidden">Score added</div>
              <div className="col-span-2 md:col-span-1"> {item.scoreAdded}</div>
              <div className="block md:hidden">Category</div>
              <div className="pb-5 md:pb-0 col-span-2 md:col-span-1">
                {" "}
                {item.category}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
