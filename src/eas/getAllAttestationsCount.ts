import React from "react";
import { WHERE_ALL_SCHEMAS } from "../config";
import { getClient } from "../apollo/getClient";
import { gql } from "@apollo/client";

const query = gql`
  query AggregateAttestation($where: AttestationWhereInput) {
    aggregateAttestation(where: $where) {
      _count {
        id
      }
    }
  }
`;

export const getAllAttestationsCount = React.cache(
  async (): Promise<number> => {
    const result = await getClient().query<AllAttestationsCountResult>({
      query,
      fetchPolicy: "cache-first",
      variables: { where: WHERE_ALL_SCHEMAS },
    });

    if (result.error) {
      console.error(result.error);
      throw new Error("Failed to fetch attestations count.");
    }

    return result.data.aggregateAttestation._count.id;
  }
);
