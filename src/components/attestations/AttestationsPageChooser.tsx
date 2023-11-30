import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { ATTESTATIONS_PER_PAGE } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { getAllAttestationsCount } from "../../eas/getAllAttestationsCount";

type AttestationsPageChooserProps = {
  currentPage: number;
};

async function AttestationsPageChooser({
  currentPage,
}: AttestationsPageChooserProps) {
  const attestationsCount = await getAllAttestationsCount();
  const totalPages = Math.ceil(attestationsCount / ATTESTATIONS_PER_PAGE);
  currentPage = Number(currentPage);

  return (
    <div className="flex items-baseline justify-between w-full">
      <div className="w-40">
        {/* First Button */}
        <div className="hidden mr-4 md:inline-block hover:border-b-2 hover:border-theme-1">
          {currentPage > 1 && (
            <Link href="/1">
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 pr-2" />
              First
            </Link>
          )}
        </div>

        {/* Previous Button */}
        <div className="inline-block hover:border-b-2 hover:border-theme-1">
          {currentPage > 1 && (
            <Link href={`/${currentPage - 1}`}>
              {" "}
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 pr-2" />
              Previous
            </Link>
          )}
        </div>
      </div>

      {/* Current Page Info */}
      <div className="text-sm text-gray-500 whitespace-nowrap">
        {currentPage} of {totalPages}
      </div>

      <div className="flex justify-end w-40">
        {/* Next Button */}
        <div className="inline-block mr-4 hover:border-b-2 hover:border-theme-1">
          {currentPage < totalPages && (
            <Link href={`/${currentPage + 1}`}>
              Next
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 pl-2" />
            </Link>
          )}
        </div>

        {/* Last Button */}
        <div className="hidden md:inline-block hover:border-b-2 hover:border-theme-1">
          {currentPage < totalPages && (
            <Link href={`/${totalPages}`}>
              Last
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 pl-2" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttestationsPageChooser;
