"use client";

import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex flex-col items-center gap-2 mt-10">
  <button
    onClick={() => onPageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="disabled:opacity-40"
  >
    <ChevronUp className="text-cyan-700" size={22} />
  </button>

  <span className="text-sm font-medium text-gray-700">
    {currentPage}/{totalPages}
  </span>

  <button
    onClick={() => onPageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="disabled:opacity-40"
  >
    <ChevronDown className="text-cyan-700" size={22} />
  </button>
</div>
)
}
