import { EAS_API_URL, WHERE_ALL_SCHEMAS } from "../config";

import { graphql } from "../gql";
import request from "graphql-request";
import { useSuspenseQuery } from "@tanstack/react-query";

const query = graphql(`
  query RecipientAttestations($where: AttestationWhereInput) {
    attestations(orderBy: { time: desc }, where: $where) {
      ...AttestationWithCoreFields
    }
  }
`);

export const useAllRecipientAttestations = (address: string | null) => {
  return useSuspenseQuery({
    queryKey: ["recipientAttestations", address],
    queryFn: async () => {
      if (!address) {
        return [];
      }
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

      const result = await request(EAS_API_URL, query, { where });
      return result.attestations;
    },
  });
};
