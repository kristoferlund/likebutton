import { EAS_API_URL, WHERE_ALL_SCHEMAS } from "../config";

import { graphql } from "../gql";
import request from "graphql-request";
import { useSuspenseQuery } from "@tanstack/react-query";

const query = graphql(`
  query AggregateAttestation($where: AttestationWhereInput) {
    aggregateAttestation(where: $where) {
      _count {
        id
      }
    }
  }
`);

export const useAllAttestationsCount = () => {
  return useSuspenseQuery({
    queryKey: ["attestationCount"],
    queryFn: async () => {
      const response = await request(EAS_API_URL, query, {
        where: WHERE_ALL_SCHEMAS,
      });
      return response.aggregateAttestation?._count?.id;
    },
  });
};
