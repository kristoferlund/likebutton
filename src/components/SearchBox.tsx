"use client";

import { KeyboardEvent, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function SearchBox() {
  const [error, setError] = useState<string>();

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Enter") {
      if (event.target instanceof HTMLInputElement) {
        const value = event.target.value;
        if (value.length === 66) {
          // search by attestation
          window.location.href = `/attestation/${value}`;
          return;
        }
        // search by user address or ens name
        window.location.href = `/user/${value}`;
        return;
      }
    }
  }

  return (
    <div className="relative flex-grow">
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute w-4 h-4 top-3 left-3"
      />
      <input
        type="text"
        placeholder="Search by ENS / Address / Txn hash "
        className="w-full p-2 pl-10 border-none hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40 focus:ring-4 focus:ring-theme-3 rounded-xl shadow-theme-shadow-1 focus:shadow-theme-shadow-1"
        onKeyUp={handleKeyUp}
        spellCheck={false}
      />
      {error && <div className="pt-2 text-red-500">{error}</div>}
    </div>
  );
}
