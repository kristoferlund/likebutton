import { EAS_API_URL, WHERE_ALL_SCHEMAS } from "../config";

import { graphql } from "../gql/gql";
import request from "graphql-request";
import { useSuspenseQuery } from "@tanstack/react-query";

const query = graphql(`
  query Attestations($where: AttestationWhereInput, $take: Int, $skip: Int) {
    attestations(
      orderBy: { time: desc }
      where: $where
      take: $take
      skip: $skip
    ) {
      ...AttestationWithCoreFields
    }
  }
`);

export const useAllAttestations = (take: number, skip: number) => {
  return useSuspenseQuery({
    queryKey: ["attestation", take, skip],
    queryFn: async () =>
      request(EAS_API_URL, query, { where: WHERE_ALL_SCHEMAS, take, skip }),
  });
};
