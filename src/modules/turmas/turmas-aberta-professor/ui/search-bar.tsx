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
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#3C3C3C]" />
      <input
        type="search"
        placeholder={placeholder}
        className="h-10 w-full rounded-[20px] bg-[#E2E2E2] pl-10 pr-3 text-md text-gray-700 placeholder-[#898787] focus:ring-2 focus:ring-teal-600 outline-none transition"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
