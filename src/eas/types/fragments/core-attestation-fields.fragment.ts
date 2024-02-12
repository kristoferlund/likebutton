import { graphql } from "../../../gql";

export const AttestationWithCoreFieldsFragment = graphql(`
  fragment AttestationWithCoreFields on Attestation {
    id
    time
    attester
    recipient
    decodedDataJson
  }
`);
