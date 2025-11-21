import React from 'react';

interface RedacaoEditorAreaProps {
  value: string;
  onChange: (val: string) => void;
}

export default function RedacaoEditorArea({ value, onChange }: RedacaoEditorAreaProps) {
  return (
    <textarea
      className="w-full h-full p-6 resize-none outline-none text-gray-700 text-base leading-relaxed placeholder:text-gray-300 placeholder:text-center placeholder:pt-[20%] md:placeholder:pt-[10%]"
      placeholder="Comece a digitar aqui..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      spellCheck={false}
    />
  );
}