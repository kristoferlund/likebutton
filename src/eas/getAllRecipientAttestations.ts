import { AllAttestationsResult } from "./types/gql/all-attestations-result.type";
import { Attestation } from "./types/gql/attestation.type";
import { CORE_ATTESTATION_FIELDS } from "./types/fragments/core-attestation-fields.fragment";
import React from "react";
import { WHERE_ALL_SCHEMAS } from "../config";
import { getClient } from "../apollo/getClient";
import { gql } from "@apollo/client";

const query = gql`
  ${CORE_ATTESTATION_FIELDS}
  query Attestations($where: AttestationWhereInput) {
    attestations(orderBy: { time: desc }, where: $where) {
      ...CoreAttestationFields
    }
  }
`;

export const getAllRecipientAttestations = React.cache(
  async (address: string): Promise<Attestation[]> => {
    const where = {
      ...WHERE_ALL_SCHEMAS,
      AND: [
        {
          recipient: {
            equals: address,
          },
        },
      ],
    };

    const result = await getClient().query<AllAttestationsResult>({
      query,
      fetchPolicy: "cache-first",
      variables: { where },
    });

    if (result.error) {
      console.error(result.error);
      throw new Error("Failed to fetch recipient attestations.");
    }

    return result.data.attestations;
  }
);
