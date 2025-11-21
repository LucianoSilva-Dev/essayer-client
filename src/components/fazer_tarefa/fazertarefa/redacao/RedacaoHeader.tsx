import React from 'react';

interface RedacaoHeaderProps {
  tema: string;
}

export default function RedacaoHeader({ tema }: RedacaoHeaderProps) {
  return (
    <h1 className="text-[#0F5F68] text-2xl md:text-3xl font-bold leading-tight">
      {tema}
    </h1>
  );
}