"use client";

import { KeyboardEvent, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "@tanstack/react-router";

export function SearchBox() {
  const [error] = useState<string>();
  const navigate = useNavigate();

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Enter") {
      if (event.target instanceof HTMLInputElement) {
        const value = event.target.value;
        navigate({ to: "/user/$userId", params: { userId: value } });
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
        placeholder="Search by ENS / Address"
        className="w-full p-2 pl-10 border-none hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40 focus:ring-4 focus:ring-theme-3 rounded-xl shadow-theme-shadow-1 focus:shadow-theme-shadow-1"
        onKeyUp={handleKeyUp}
        spellCheck={false}
      />
      {error && <div className="pt-2 text-red-500">{error}</div>}
    </div>
  );
}
