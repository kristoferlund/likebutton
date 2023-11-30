import { gql } from "@apollo/client";

export const CORE_ATTESTATION_FIELDS = gql`
  fragment CoreAttestationFields on Attestation {
    id
    time
    attester
    recipient
    decodedDataJson
    expirationTime
    revoked
    schemaId
  }
`;
