export const EAS_API_URL = "https://optimism.easscan.org/graphql";

export const ATTESTATIONS_PER_PAGE = 15;

export const UID_LIKE =
  "0x33e9094830a5cba5554d1954310e4fbed2ef5f859ec1404619adea4207f391fd";

export const WHERE_ALL_SCHEMAS = {
  schemaId: {
    equals: UID_LIKE,
  },
  recipient: {
    not: {
      equals: "0x0000000000000000000000000000000000000000",
    },
  },
};
