import { PraiseUser } from "./types/user";

export function getPraiseUserByAddress(users: PraiseUser[], address: string) {
  return users.find((user) => user.identityEthAddress === address);
}
