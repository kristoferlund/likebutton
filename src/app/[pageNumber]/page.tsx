import AttestDialog from "../../components/AttestDialog";
import { AttestationList } from "../../components/attestations/AttestationsList";
import { AttestationsLoadingList } from "../../components/attestations/AttestationsLoadingList";
import AttestationsPageChooser from "../../components/attestations/AttestationsPageChooser";
import { DEFAULT_REVALIDATE_TIME } from "../../config";
import Image from "next/image";
import LikeButton from "../../components/LikeButton";
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
      <LikeButton />
      <SearchAndSort />
      <Suspense fallback={<AttestationsLoadingList />}>
        <AttestationList page={params.pageNumber} />
      </Suspense>
      <AttestationsPageChooser currentPage={params.pageNumber} />
    </>
  );
}

export const revalidate = DEFAULT_REVALIDATE_TIME;
