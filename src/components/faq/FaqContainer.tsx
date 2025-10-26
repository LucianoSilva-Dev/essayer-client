"use client";

import React, { useState } from "react";
import FaqList from "./FaqList";
import Pagination from "./Pagination";

const allFaqs = [
  { question: "Como posso criar uma turma?", answer: "Você pode criar uma turma acessando o painel do professor e clicando em 'Criar Turma'." },
  { question: "Posso entrar em mais de uma turma?", answer: "Sim! Você pode participar de várias turmas ao mesmo tempo." },
  { question: "Como redefinir minha senha?", answer: "Vá até a página de login e clique em 'Esqueci minha senha'." },
  // ...mais perguntas
];

export default function FaqContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(allFaqs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFaqs = allFaqs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <FaqList faqs={currentFaqs} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
