"use client";
import { useState } from "react";

export default function CarrosselImagens() {
  const imagens = ["/img1.png", "/img2.png", "/img3.png"];
  const [index, setIndex] = useState(0);

  return (
    <div className="flex items-center justify-center space-x-4">
      <button onClick={() => setIndex((index - 1 + imagens.length) % imagens.length)}>◀</button>
      <img src={imagens[index]} alt="Foto da turma" className="w-24 h-24 rounded-full" />
      <button onClick={() => setIndex((index + 1) % imagens.length)}>▶</button>
    </div>
  );
}
