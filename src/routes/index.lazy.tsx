import { AttestationList } from "../components/attestations/AttestationsList";
import { AttestationsLoadingList } from "../components/attestations/AttestationsLoadingList";
import AttestationsPageChooser from "../components/attestations/AttestationsPageChooser";
import LikeButton from "../components/LikeButton";
import { SearchAndSort } from "../components/attestations/SearchAndSort";
import { Suspense } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <LikeButton />
      <SearchAndSort />
      <Suspense fallback={<AttestationsLoadingList />}>
        <AttestationList page={1} />
      </Suspense>
      <AttestationsPageChooser currentPage={1} />
    </>
  );
}
