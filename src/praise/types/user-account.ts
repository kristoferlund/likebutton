export type PraiseUserAccount = {
  /** @example 63b428f7d9ca4f6ff5370d05 */
  _id: string;
  /** @example 098098098098098 */
  accountId: string;
  /** @example darth#6755 */
  name: string;
  /** @example 098098098087097 */
  avatarId?: string;
  /** @example DISCORD */
  platform: string;
  /** Format: date-time */
  createdAt: string;
  /** Format: date-time */
  updatedAt: string;
};
