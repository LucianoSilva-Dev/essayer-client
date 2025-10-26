"use client";

import React from "react";
import FaqCard from "./FaqCard";

type FaqListProps = {
  faqs: { question: string; answer: string }[];
};

export default function FaqList({ faqs }: FaqListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
      {faqs.map((faq, index) => (
        <FaqCard key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
