import { PraiseUser } from "../../../praise/types/user";
import { Recipient } from "./recipient.type";

export type RecipientWithPraiseUser = Recipient & {
  praiseUser?: PraiseUser;
};
