import { AttestationsLoadingList } from "../../../../components/attestations/AttestationsLoadingList";
import { DEFAULT_REVALIDATE_TIME } from "../../../../config";
import { SchemaAttestationList } from "../../../../components/attestations/SchemaAttestationsList";
import SchemaAttestationsPageChooser from "../../../../components/attestations/SchemaAttestationsPageChooser";
import SchemaButtons from "../../../../components/attestations/SchemaButtons";
import { SearchAndSort } from "../../../../components/attestations/SearchAndSort";
import { Suspense } from "react";

type SchemaAttestationListPageProps = {
  params: {
    uid: string;
    pageNumber: number;
  };
};

export default async function SchemaAttestationListPage({
  params,
}: SchemaAttestationListPageProps) {
  const { uid, pageNumber } = params;

  return (
    <>
      <SearchAndSort />
      <SchemaButtons uid={uid} />
      <Suspense fallback={<AttestationsLoadingList />}>
        <SchemaAttestationList uid={uid} page={pageNumber} />
      </Suspense>
      <SchemaAttestationsPageChooser uid={uid} currentPage={pageNumber} />
    </>
  );
}

export const revalidate = DEFAULT_REVALIDATE_TIME;
