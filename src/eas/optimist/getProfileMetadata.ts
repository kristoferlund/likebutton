type OptimistProfileMetadata = {
  profileImageUrl: string;
  bannerImageUrl: string;
  websiteUrl: string;
  bio: string;
};

export async function getProfileMetaData(
  profileMetadataPtr?: string
): Promise<OptimistProfileMetadata | undefined> {
  if (!profileMetadataPtr) return undefined;

  const response = await fetch(profileMetadataPtr);

  if (!response.ok) {
    console.error(response.status, response.statusText);
    throw new Error("Could not fetch profile metadata");
  }

  return response.json();
}
