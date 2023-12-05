import { AttestationCardAlt } from "../../../components/attestation/AttestationCardAlt";
import { CopyButton } from "../../../components/CopyButton";
import { DEFAULT_REVALIDATE_TIME } from "../../../config";
import { DecodedData } from "../../../eas/types/decoded-data.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import LikeButton from "../../../components/LikeButton";
import Link from "next/link";
import { SearchAndSort } from "../../../components/attestations/SearchAndSort";
import { UserIcon } from "../../../components/user/UserIcon";
import { faFaceSadCry } from "@fortawesome/free-solid-svg-icons";
import { getAddressFromEnsName } from "../../../viem/getAddressFromEnsName";
import { getAllPraiseUsers } from "../../../praise/getAllPraiseUsers";
import { getAllRecipientAttestations } from "../../../eas/getAllRecipientAttestations";
import { getDecodedValue } from "../../../eas/getDecodedValue";
import { getOptimistAttestation } from "../../../eas/optimist/getOptimistAttestation";
import { getPraiseUserByAddress } from "../../../praise/getPraiseUserByAddress";
import { getUserName } from "../../../eas/getUserName";
import { shortenEthAddress } from "../../../util/string";

export default async function UserPage({
  params,
}: {
  params: { ref: string };
}) {
  // Ref is user address or ens name
  const { ref } = params;

  let address: string | null = ref;

  try {
    if (ref.length < 42) {
      address = await getAddressFromEnsName(ref);
    }
  } catch (e) {
    address = null;
  }

  if (!address) {
    return (
      <div className="absolute top-0 flex flex-col justify-center h-screen">
        <div className="flex flex-col items-center gap-5 text-xl">
          <FontAwesomeIcon icon={faFaceSadCry} className="w-10 h-10" />
          <div>User not found</div>
        </div>
      </div>
    );
  }

  const attestations = await getAllRecipientAttestations(address);
  const username = await getUserName(address);

  const optimistAttestation = getOptimistAttestation(attestations);
  let optimistName;
  if (optimistAttestation) {
    const json: DecodedData = JSON.parse(optimistAttestation.decodedDataJson);
    optimistName = getDecodedValue<string>(json, "name");
  }

  const praiseUsers = await getAllPraiseUsers();
  const praiseUser = getPraiseUserByAddress(praiseUsers, address);
  const praiseUsername = praiseUser?.username;

  return (
    <>
      <LikeButton />
      <SearchAndSort />
      <div className="w-full border-b-4 border-theme-gray-1">
        <div className="text-2xl font-semibold">User</div>
      </div>

      <div className="flex flex-col items-center w-full gap-5">
        <div className="flex flex-col items-center w-full p-5 gap-10 bg-dots sm:flex-row rounded-xl shadow-theme-shadow-1">
          <UserIcon address={address} variant="square" size="large" />
          <div className="flex flex-col items-center sm:items-start gap-1 whitespace-nowrap">
            {username && (
              <div className="text-xl font-semibold">{username}</div>
            )}
            <div className="flex items-center gap-1">
              <a
                href={`https://optimism.easscan.org/address/${address}`}
                target="_blank"
              >
                {shortenEthAddress(address)}
              </a>
              <CopyButton textToCopy={address} />
            </div>
          </div>
          <div className="flex-grow hidden md:flex"></div>
          <div className="flex flex-col items-start gap-3">
            {optimistName && (
              <div className="flex flex-row items-baseline sm:flex-col md:items-start gap-3 sm:gap-1">
                <div className="text-xs text-gray-500 ">
                  Optimist Profile Name
                </div>
                {optimistName}
              </div>
            )}
            {praiseUsername && (
              <>
                <div className="flex flex-row items-baseline sm:flex-col md:items-start gap-3 sm:gap-1">
                  <div className="text-xs text-gray-500">Praise Username</div>
                  {praiseUsername}
                </div>
              </>
            )}
          </div>
          <div className="flex-grow hidden md:flex"></div>
          <div className="flex items-center justify-between w-40 px-3 py-1 bg-theme-3/50 rounded-xl">
            <span className="text-sm">Total likes</span>{" "}
            <span className="text-xl font-semibold">{attestations.length}</span>
          </div>
        </div>
        <div className="w-full border-b-4 border-theme-gray-1">
          <div className="text-2xl font-semibold">Likes</div>
        </div>
        {attestations.length === 0 && <div>No likes found</div>}

        {attestations.length > 0 && (
          <ol className="w-full">
            {attestations.map((att) => (
              <li key={att.id} className="pb-5">
                <AttestationCardAlt attestation={att} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}

export const revalidate = DEFAULT_REVALIDATE_TIME;
