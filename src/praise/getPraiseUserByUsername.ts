import { PraiseUser } from "./types/user";

export function getPraiseUserByUsername(users: PraiseUser[], username: string) {
  return users.find((user) => user.username === username);
}
