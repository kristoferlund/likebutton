import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { ATTESTATIONS_PER_PAGE } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";
import { Suspense } from "react";
import { useAllAttestationsCount } from "../../eas/useAllAttestationsCount";

type AttestationsPageChooserProps = {
  currentPage: number;
};

function AttestationsPageChooserInner({
  currentPage,
}: AttestationsPageChooserProps) {
  const { data: attestationsCount } = useAllAttestationsCount();

  if (!attestationsCount) return null;

  const totalPages = Math.ceil(attestationsCount / ATTESTATIONS_PER_PAGE);
  currentPage = Number(currentPage);

  return (
    <div className="flex items-start justify-between w-full h-10">
      <div className="w-40">
        {/* First Button */}
        <div className="hidden mr-4 md:inline-block hover:border-b-2 hover:border-theme-1">
          {currentPage > 1 && (
            <Link to="/">
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 pr-2" />
              First
            </Link>
          )}
        </div>

        {/* Previous Button */}
        <div className="inline-block hover:border-b-2 hover:border-theme-1">
          {currentPage > 1 && (
            <Link
              to="/$pageId"
              params={{ pageId: (currentPage - 1).toString() }}
            >
              {" "}
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 pr-2" />
              Previous
            </Link>
          )}
        </div>
      </div>

      {/* Current Page Info */}
      <div className="pt-1 text-sm text-gray-500 whitespace-nowrap">
        {currentPage} of {totalPages}
      </div>

      <div className="flex justify-end w-40">
        {/* Next Button */}
        <div className="inline-block mr-4 hover:border-b-2 hover:border-theme-1">
          {currentPage < totalPages && (
            <Link
              to="/$pageId"
              params={{ pageId: (currentPage + 1).toString() }}
            >
              Next
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 pl-2" />
            </Link>
          )}
        </div>

        {/* Last Button */}
        <div className="hidden md:inline-block hover:border-b-2 hover:border-theme-1">
          {currentPage < totalPages && (
            <Link to="/$pageId" params={{ pageId: totalPages.toString() }}>
              Last
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 pl-2" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AttestationsPageChooser(
  props: AttestationsPageChooserProps
) {
  return (
    <Suspense fallback={null}>
      <AttestationsPageChooserInner {...props} />
    </Suspense>
  );
}
