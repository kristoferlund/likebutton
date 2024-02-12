import { AttestationList } from "../components/attestations/AttestationsList";
import { AttestationsLoadingList } from "../components/attestations/AttestationsLoadingList";
import AttestationsPageChooser from "../components/attestations/AttestationsPageChooser";
import LikeButton from "../components/LikeButton";
import { SearchAndSort } from "../components/attestations/SearchAndSort";
import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/$pageId")({
  parseParams: (params) => ({
    pageId: z.number().int().parse(Number(params.pageId)),
  }),
  stringifyParams: ({ pageId }) => ({ pageId: `${pageId}` }),
  component: Page,
});

function Page() {
  const params = Route.useParams();

  return (
    <>
      <LikeButton />
      <SearchAndSort />
      <Suspense fallback={<AttestationsLoadingList />}>
        <AttestationList page={params.pageId} />
      </Suspense>
      <AttestationsPageChooser currentPage={params.pageId} />
    </>
  );
}
