import { DEFAULT_REVALIDATE_TIME } from "../config";

export async function getRegenScoreData(address: string): Promise<any> {
  const URL = `https://pnedlobyacswjctggezd.supabase.co/rest/v1/scores?select=*&order=created_at.desc&address=eq.${address}&limit=1`;

  const res = await fetch(URL, {
    headers: {
      Apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZWRsb2J5YWNzd2pjdGdnZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ2NzkxNTEsImV4cCI6MjAxMDI1NTE1MX0.H9PHyEnSF6RPrBIHJyAmJOdt-pE6ACINPXuOQhtm9G8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZWRsb2J5YWNzd2pjdGdnZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ2NzkxNTEsImV4cCI6MjAxMDI1NTE1MX0.H9PHyEnSF6RPrBIHJyAmJOdt-pE6ACINPXuOQhtm9G8",
    },
    next: { revalidate: DEFAULT_REVALIDATE_TIME }, // 15 minutes
  });

  if (!res.ok) {
    throw new Error("Failed to fetch regen score data.");
  }

  const json = await res.json();
  return json[0];
}
