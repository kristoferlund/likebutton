import { PraiseUserAccount } from "./user-account";

export type PraiseUser = {
  /** @example 5f9f1b9b9b9b9b9b9b9b9b9b */
  _id: string;
  /** @example 0xAAB27b150451726EC7738aa1d0A94505c8729bd1 */
  identityEthAddress: string;
  /** @example 0xAAB27b150451726EC7738aa1d0A94505c8729bd1 */
  rewardsEthAddress: string;
  /** @example darth */
  username: string;
  roles: (
    | "USER"
    | "QUANTIFIER"
    | "FORWARDER"
    | "ADMIN"
    | "ROOT"
    | "API_KEY_READWRITE"
    | "API_KEY_READ"
    | "API_KEY_DISCORD_BOT"
    | "API_KEY_SETUP_WEB"
  )[];
  accounts: PraiseUserAccount[];
  /** Format: date-time */
  createdAt: string;
  /** Format: date-time */
  updatedAt: string;
};
