import { ATTESTATIONS_PER_PAGE } from "../../config";
import { AttestationCard } from "../attestation/AttestationCard";
import { useAllAttestations } from "../../eas/useAllAttestations";

type AttestationListProps = {
  page: number;
};
export function AttestationList({ page }: AttestationListProps) {
  const { data } = useAllAttestations(
    ATTESTATIONS_PER_PAGE,
    (page - 1) * ATTESTATIONS_PER_PAGE
  );

  if (!data) return null;

  data.attestations;
  return (
    <ol className="w-full @container">
      {data.attestations.map((att) => (
        <li key={(att as any).id} className="pb-5">
          <AttestationCard attestation={att as any} />
        </li>
      ))}
    </ol>
  );
}
