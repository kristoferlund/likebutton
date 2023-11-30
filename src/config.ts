import { LikeCustomDisplay } from "./components/attestation/custom-displays/LikeCustomDisplay";
import Praise from "./components/images/praise.svg";
import { SchemaListItem } from "./eas/types/schema-list-item.type";

export const EAS_API_URL = "https://optimism.easscan.org/graphql";

export const PRAISE_API_URL = "https://gnosisdao.givepraise.xyz/api/users";

export const USERS_PER_PAGE = 15;
export const ATTESTATIONS_PER_PAGE = 15;

export const DEFAULT_REVALIDATE_TIME = 60 * 15; // 15 minutes

// The schema IDs for the EAS schemas
export const UID_OPTIMIST =
  "0xac4c92fc5c7babed88f78a917cdbcdc1c496a8f4ab2d5b2ec29402736b2cf929";
export const UID_LIKE =
  "0x33e9094830a5cba5554d1954310e4fbed2ef5f859ec1404619adea4207f391fd";
export const UID_PASSPORT_SCORE =
  "0x6ab5d34260fca0cfcf0e76e96d439cace6aa7c3c019d7c4580ed52c6845e9c89";

// The Safe address that is used to attest to Praise attestations
export const OP_PRAISE_SAFE_ADDRESS =
  "0x6435dCABb62Cb46c9fB94De763CD19a40Ff6Ce23";

export const EAS_SCHEMAS: SchemaListItem[] = [
  {
    name: "Like",
    description: "Like description.",
    projectUrl: "https://givepraise.xyz/",
    uid: UID_LIKE,
    displayComponent: LikeCustomDisplay,
    logo: Praise,
    gqlWhere: {
      schemaId: {
        equals: UID_LIKE,
      },
      recipient: {
        not: {
          equals: "0x0000000000000000000000000000000000000000",
        },
      },
    },
  },
];

export const WHERE_ALL_SCHEMAS = {
  OR: EAS_SCHEMAS.map((schema) => schema.gqlWhere),
};
