import { faFaceSadCry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createFileRoute } from "@tanstack/react-router";
import { CopyButton } from "../components/CopyButton";
import LikeButton from "../components/LikeButton";
import { SearchAndSort } from "../components/attestations/SearchAndSort";
import { UserIcon } from "../components/user/UserIcon";
import { shortenEthAddress } from "../util/string";
import { useAllRecipientAttestations } from "../eas/useAllRecipientAttestations";
import { AttestationCard } from "../components/attestation/AttestationCard";
import { useEnsName } from "../ens/useEnsName";
import { useEnsAddress } from "../ens/useEnsAddress";
import { AttestationCardAlt } from "../components/attestation/AttestationCardAlt";

export const Route = createFileRoute("/user/$userId")({
  parseParams: (params) => ({
    userId: params.userId,
  }),
  stringifyParams: ({ userId }) => ({ userId: `${userId}` }),
  component: Page,
});

function Page() {
  const { userId } = Route.useParams();
  const { data: username } = useEnsName(userId);
  const { data: address } = useEnsAddress(userId);
  const { data: attestations } = useAllRecipientAttestations(address);

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

  return (
    <>
      <LikeButton />
      <SearchAndSort />
      <div className="w-full border-b-4 border-theme-gray-1">
        <div className="text-2xl font-semibold">User</div>
      </div>

      <div className="flex flex-col items-center w-full gap-5">
        <div className="flex flex-col items-center w-full gap-10 p-5 bg-dots sm:flex-row rounded-xl shadow-theme-shadow-1">
          <UserIcon address={address} variant="square" size="large" />
          <div className="flex flex-col items-center gap-1 sm:items-start whitespace-nowrap">
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
