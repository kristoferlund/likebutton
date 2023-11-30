import { ATTESTATIONS_PER_PAGE } from "../../config";
import { AttestationCard } from "../attestation/AttestationCard";
import { getAllAttestations } from "../../eas/getAllAttestations";

type AttestationListProps = {
  page: number;
};
export async function AttestationList({ page }: AttestationListProps) {
  const attestations = await getAllAttestations(
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
