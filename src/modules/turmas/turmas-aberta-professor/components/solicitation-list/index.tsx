import { FC } from "react";
import SolicitacaoItem from "../solicitation-item";
import { PedidoEntrada } from "@/lib/apiCalls/turma-aberta-prof/types";

interface SolicitacoesListProps {
  pedidos: PedidoEntrada[];
  loading: boolean;
  refetch: () => Promise<void>;
  turmaId: string;
  searchTerm: string;
  onRemovePedido: (id: string) => void;
  onAddAluno: (aluno: any) => void; // Using any or Aluno type if imported
}

import { Aluno } from "@/lib/apiCalls/turma-aberta-prof/types";

const SolicitacoesList: FC<SolicitacoesListProps> = ({ pedidos, loading, refetch, turmaId, searchTerm, onRemovePedido, onAddAluno }) => {
  if (loading) {
    return <p className="text-gray-500 text-sm p-4 text-center">Carregando solicitações...</p>;
  }

  // Filter pedidos based on searchTerm
  const filteredPedidos = pedidos.filter((pedido) =>
    pedido.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!pedidos || pedidos.length === 0) {
    return <p className="text-gray-500 text-sm p-4 text-center">Nenhuma solicitação pendente.</p>;
  }

  if (filteredPedidos.length === 0) {
    return <p className="text-gray-500 text-sm p-4 text-center">Nenhuma solicitação encontrada para "{searchTerm}".</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {filteredPedidos.map((pedido) => (
        <SolicitacaoItem
          key={pedido.id}
          pedido={pedido}
          turmaId={turmaId}
          refetch={refetch}
          onRemovePedido={onRemovePedido}
          onAddAluno={onAddAluno}
        />
      ))}
    </div>
  );
};

export default SolicitacoesList;
