"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

type FaqCardProps = {
  question: string;
  answer?: string;
};

export default function FaqCard({ question, answer }: FaqCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-gray-200 py-4 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
        <HelpCircle className="text-inherit" size={20} />
            <p className="text-gray-800 font-medium">{question}</p>
        </div>
        {open ? (
          <ChevronUp className="text-gray-500" size={20} />
        ) : (
          <ChevronDown className="text-gray-500" size={20} />
        )}
      </div>

      {open && answer && (
        <p className="mt-3 text-gray-600 text-sm ml-7">{answer}</p>
      )}
    </div>
  );
}
