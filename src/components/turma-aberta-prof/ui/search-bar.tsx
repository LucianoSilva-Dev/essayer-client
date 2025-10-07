"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchBar({
  placeholder = "Pesquisar...",
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-[250px]">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        placeholder={placeholder}
        className="h-10 w-full rounded-full border border-gray-300 bg-white pl-10 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-teal-600 outline-none transition"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
