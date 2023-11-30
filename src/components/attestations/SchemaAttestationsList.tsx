import { ATTESTATIONS_PER_PAGE } from "../../config";
import { AttestationCard } from "../attestation/AttestationCard";
import { getAllAttestations } from "../../eas/getAllAttestations";
import { getAllSchemaAttestations } from "../../eas/getAllSchemaAttestations";

type AttestationListProps = {
  uid: string;
  page: number;
};
export async function SchemaAttestationList({
  uid,
  page,
}: AttestationListProps) {
  const attestations = await getAllSchemaAttestations(
    uid,
    ATTESTATIONS_PER_PAGE,
    (page - 1) * ATTESTATIONS_PER_PAGE
  );

  return (
    <ol className="w-full @container">
      {attestations.map((att) => (
        <li key={att.id} className="pb-5">
          <AttestationCard attestation={att} />
        </li>
      ))}
    </ol>
  );
}
