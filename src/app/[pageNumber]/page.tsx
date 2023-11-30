import { AttestationList } from "../../components/attestations/AttestationsList";
import { AttestationsLoadingList } from "../../components/attestations/AttestationsLoadingList";
import AttestationsPageChooser from "../../components/attestations/AttestationsPageChooser";
import { DEFAULT_REVALIDATE_TIME } from "../../config";
import Image from "next/image";
import Link from "next/link";
import SchemaButtons from "../../components/attestations/SchemaButtons";
import { SearchAndSort } from "../../components/attestations/SearchAndSort";
import { Suspense } from "react";

export default async function AttestationListPage({
  params,
}: {
  params: { pageNumber: number };
}) {
  return (
    <>
      <Link
        href="https://optimism.easscan.org/attestation/attestWithSchema/0x33e9094830a5cba5554d1954310e4fbed2ef5f859ec1404619adea4207f391fd"
        target="_blank"
      >
        <Image
          src="/click-to-like.svg"
          alt="Optimism Attestations"
          width={250}
          height={40}
          className="hover:opacity-70 mb-10"
        />
      </Link>
      <SearchAndSort />
      <Suspense fallback={<AttestationsLoadingList />}>
        <AttestationList page={params.pageNumber} />
      </Suspense>
      <AttestationsPageChooser currentPage={params.pageNumber} />
    </>
  );
}

export const revalidate = DEFAULT_REVALIDATE_TIME;
