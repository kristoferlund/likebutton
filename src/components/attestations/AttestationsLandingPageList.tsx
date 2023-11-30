import { AttestationCard } from "../attestation/AttestationCard";
import { getAllAttestations } from "../../eas/getAllAttestations";

export async function AttestationsLandingPageList() {
  const attestations = await getAllAttestations(3, 0);

  return (
    <ol className="w-full @container">
      {attestations.map((att) => (
        <li key={att.id} className="pb-5">
          <AttestationCard attestation={att} />
        </li>
      ))}
      <li>
        <div className="relative flex items-center justify-between w-full p-5 text-sm bg-white md:text-base gap-x-5 rounded-xl shadow-theme-shadow-1">
          <div className="absolute w-full h-10 bg-white top-6 -left-0"></div>
        </div>
      </li>
    </ol>
  );
}
