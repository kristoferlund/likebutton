import { DecodedData } from "./types/decoded-data.type";

type BigNumber = {
  type: "BigNumber";
  hex: string;
};

function isBigNumber(obj: any): obj is BigNumber {
  return obj && obj.type === "BigNumber" && typeof obj.hex === "string";
}

export function getDecodedValue<T extends string | number | bigint | boolean>(
  data?: DecodedData,
  valueName?: string
): T | undefined {
  if (!data || !valueName) return undefined;
  const decodedData = data.find((item) => item.name === valueName);
  if (decodedData) {
    const value = decodedData.value.value;
    if (isBigNumber(value)) {
      return BigInt(value.hex) as unknown as T;
    }
    return value as T;
  }
  return undefined;
}
