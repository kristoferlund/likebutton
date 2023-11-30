import { Attestation } from "../../eas/types/gql/attestation.type";
import { getSchemaData } from "../../eas/getSchemaData";

type CustomDisplayProps = {
  attestation: Attestation;
};

export function CustomDisplay({ attestation }: CustomDisplayProps) {
  const schemaData = getSchemaData(attestation.schemaId);

  if (schemaData?.displayComponent) {
    return (
      <>
        <div className="w-full border-b-4 border-theme-gray-1">
          <div className="text-2xl font-semibold">Attestation Details</div>
        </div>
        {schemaData.displayComponent({ attestation })}
      </>
    );
  }

  return null;
}
