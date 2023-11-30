import { CopyButton } from "../../../components/CopyButton";
import { CustomDisplay } from "../../../components/attestation/CustomDisplay";
import { DEFAULT_REVALIDATE_TIME } from "../../../config";
import { DecodedData } from "../../../eas/types/decoded-data.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { RawData } from "../../../components/attestation/RawData";
import { SchemaName } from "../../../components/attestation-card/SchemaName";
import { SearchAndSort } from "../../../components/attestations/SearchAndSort";
import { UserIcon } from "../../../components/user/UserIcon";
import dayjs from "dayjs";
import { faFaceSadCry } from "@fortawesome/free-solid-svg-icons";
import { getAttestation } from "../../../eas/getAttestation";
import { getSchemaData } from "../../../eas/getSchemaData";
import { getUserName } from "../../../eas/getUserName";
import relativeTime from "dayjs/plugin/relativeTime";
import { shortenEthAddress } from "../../../util/string";
export default async function AttestationPage({
  params,
}: {
  params: { id: string };
}) {
  dayjs.extend(relativeTime);

  const { id } = params;
  const attestation = await getAttestation(id);

  if (!attestation) {
    return (
      <div className="absolute top-0 flex flex-col justify-center h-screen">
        <div className="flex flex-col items-center gap-5 text-xl">
          <FontAwesomeIcon icon={faFaceSadCry} className="w-10 h-10" />
          <div>Attestation not found</div>
        </div>
      </div>
    );
  }

  const json: DecodedData = JSON.parse(attestation.decodedDataJson);
  const schemaData = getSchemaData(attestation.schemaId);
  const recipientName = await getUserName(attestation.recipient);
  const attesterName = await getUserName(attestation.attester);

  return (
    <>
      <SearchAndSort />
      <div className="w-full border-b-4 border-theme-gray-1">
        <div className="text-2xl font-semibold">
          {schemaData?.name} Attestation
        </div>
      </div>

      <div className="flex-col w-full p-5 bg-white space-y-5 rounded-xl shadow-theme-shadow-1">
        {schemaData?.description && (
          <div className="flex items-center gap-5">
            <div className="flex-grow">{schemaData.description}</div>
            <div className="w-28 hidden md:block">
              <a href={schemaData.projectUrl} target="_blank">
                <Image
                  src={schemaData.logo}
                  width="100"
                  alt={schemaData?.name}
                  className="w-28 max-w-none"
                />
              </a>
            </div>
          </div>
        )}
        <div className="flex flex-col w-full gap-5 md:flex-row md:justify-between">
          <div className="flex justify-between md:w-2/5">
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <div className="w-12 text-xs text-gray-500">To </div>
                <Link
                  href={`/user/${attestation.recipient}`}
                  className="flex items-center gap-1"
                >
                  <UserIcon
                    address={attestation.recipient}
                    className="inline-block"
                    size="tiny"
                  />
                  {recipientName || shortenEthAddress(attestation.recipient)}
                </Link>
                <CopyButton textToCopy={attestation.recipient} />
              </div>
              <div className="flex items-center ">
                <div className="w-12 text-xs text-gray-500">From</div>
                <Link
                  href={`/user/${attestation.attester}`}
                  className="flex items-center gap-1"
                >
                  <UserIcon
                    address={attestation.attester}
                    className="inline-block"
                    size="tiny"
                  />
                  {attesterName || shortenEthAddress(attestation.attester)}
                </Link>
                <CopyButton textToCopy={attestation.attester} />
              </div>
              <div className="flex items-center">
                <div className="w-12 text-xs text-gray-500">Uid</div>
                <a
                  href={`https://optimism.easscan.org/attestation/view/${attestation.id}`}
                  target="_blank"
                >
                  {shortenEthAddress(attestation.id)}
                </a>
                <CopyButton textToCopy={attestation.id} />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center md:w-1/5">
            <div className="text-xs text-gray-500">Created</div>
            <div>
              {dayjs.unix(parseInt(attestation.time.toString())).fromNow()}
            </div>
          </div>
          <div className="flex flex-col justify-center md:w-1/5">
            <div className="text-xs text-gray-500">Expires</div>
            <div>
              {attestation.expirationTime > 0
                ? attestation.expirationTime.toString()
                : "Does not expire"}
            </div>
          </div>
          <div className="flex flex-col justify-center md:w-1/5">
            <div className="text-xs text-gray-500">Revoked</div>
            <div>{attestation.revoked ? "Yes" : "No"} </div>
          </div>
        </div>
      </div>

      <CustomDisplay attestation={attestation} />

      <RawData data={json} />
    </>
  );
}

export const revalidate = DEFAULT_REVALIDATE_TIME;
