"use server";

import { revalidateTag } from "next/cache";

export async function revalidateCache() {
  revalidateTag("getAllAttestations");
  revalidateTag("getAllAttestationsCount");
  revalidateTag("getAllRecipientAttestations");
}
