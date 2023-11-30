import React from "react";
import { WHERE_ALL_SCHEMAS } from "../config";
import { getClient } from "../apollo/getClient";
import { getSchemaData } from "./getSchemaData";
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

export const getAllSchemaAttestationsCount = React.cache(
  async (uid: string): Promise<number> => {
    const schema = getSchemaData(uid);

    const result = await getClient().query<AllAttestationsCountResult>({
      query,
      fetchPolicy: "cache-first",
      variables: { where: schema?.gqlWhere },
    });

    if (result.error) {
      console.error(result.error);
      throw new Error("Failed to fetch schema attestations count.");
    }

    return result.data.aggregateAttestation._count.id;
  }
);
