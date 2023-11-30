import { DecodedData } from "./types/decoded-data.type";
import { getAllPraiseUsers } from "../praise/getAllPraiseUsers";
import { getAllRecipientAttestations } from "./getAllRecipientAttestations";
import { getDecodedValue } from "./getDecodedValue";
import { getEnsName } from "../viem/getEnsName";
import { getOptimistAttestation } from "./optimist/getOptimistAttestation";
import { getPraiseUserByAddress } from "../praise/getPraiseUserByAddress";

export async function getUserName(address: string) {
  let username;

  username = await getEnsName(address);

  // Get username from Optimist attestation
  if (!username) {
    const attestations = await getAllRecipientAttestations(address);
    const optimistAttestation = getOptimistAttestation(attestations);
    if (optimistAttestation) {
      const json: DecodedData = JSON.parse(optimistAttestation.decodedDataJson);
      username = getDecodedValue<string>(json, "name");
    }
  }

  // Get username from Praise
  if (!username) {
    const praiseUsers = await getAllPraiseUsers();
    const praiseUser = getPraiseUserByAddress(praiseUsers, address);
    username = praiseUser?.username;
  }

  return username;
}
