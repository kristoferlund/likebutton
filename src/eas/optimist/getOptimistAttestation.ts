import { Attestation } from "../types/gql/attestation.type";
import { UID_OPTIMIST } from "../../config";

export function getOptimistAttestation(attestations?: Attestation[]) {
  if (!attestations) return undefined;

  const attestation = attestations.find((att) => att.schemaId === UID_OPTIMIST);
  if (!attestation) {
    return undefined;
  }
  return attestation;
}
