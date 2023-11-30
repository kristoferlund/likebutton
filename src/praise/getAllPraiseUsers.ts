import { DEFAULT_REVALIDATE_TIME, PRAISE_API_URL } from "../config";

import { PraiseUser } from "./types/user";

export async function getAllPraiseUsers(): Promise<PraiseUser[]> {
  const res = await fetch(PRAISE_API_URL, {
    next: { revalidate: DEFAULT_REVALIDATE_TIME },
  }); // 15 minutes

  if (!res.ok) {
    throw new Error("Failed to fetch praise users.");
  }

  return res.json();
}
