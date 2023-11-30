import { AttestationLoadingCard } from "../attestation/AttestationLoadingCard";

export function AttestationsLoadingList() {
  return (
    <div className="flex flex-col w-full gap-5">
      <AttestationLoadingCard />
      <AttestationLoadingCard />
      <AttestationLoadingCard />
      <AttestationLoadingCard />
      <AttestationLoadingCard />
      <AttestationLoadingCard />
    </div>
  );
}
