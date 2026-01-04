import { FC, useState } from "react";
import Image from "next/image";
import { Check, X, Loader2 } from "lucide-react";
import { ConfirmationModal } from "@/shared/components/confirmation-modals/modal-2/ConfirmationModal";
import { PedidoEntrada, Aluno } from "@/lib/apiCalls/turma-aberta-prof/types";
import { aprovarPedido, recusarPedido } from "@/lib/apiCalls/turma-aberta-prof";
import { toast } from "react-toastify";

interface SolicitacaoItemProps {
  pedido: PedidoEntrada;
  turmaId: string;
  refetch: () => Promise<void>;
  onRemovePedido: (id: string) => void;
  onAddAluno: (aluno: Aluno) => void;
}

const SolicitacaoItem: FC<SolicitacaoItemProps> = ({ pedido, turmaId, refetch, onRemovePedido, onAddAluno }) => {
  const [loadingAction, setLoadingAction] = useState<'aprovar' | 'recusar' | null>(null);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: 'aprovar' | 'recusar';
  } | null>(null);

  const handleAction = async () => {
    if (!modalConfig) return;

    const { type } = modalConfig;
    setLoadingAction(type);
    setModalConfig(null); // Close modal immediately

    try {
      if (type === 'aprovar') {
        await aprovarPedido(turmaId, pedido.id);
        toast.success("Solicitação aprovada com sucesso!");
        onAddAluno(pedido); // Add to members list
        onRemovePedido(pedido.id); // Remove from requests list
      } else {
        await recusarPedido(turmaId, pedido.id);
        toast.success("Solicitação recusada com sucesso!");
        onRemovePedido(pedido.id); // Remove from requests list
      }
      // await refetch(); // Removed to avoid extra API call
    } catch (error: any) {
      console.error(`Erro ao ${type} solicitação:`, error);
      const msg = error?.response?.data?.error || `Erro ao ${type} solicitação.`;
      toast.error(msg);
    } finally {
      setLoadingAction(null);
    }
  };

  const openModal = (type: 'aprovar' | 'recusar') => {
    setModalConfig({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalConfig(null);
  };

  return (
    <>
      <div className="flex items-center justify-between py-2 border-b border-gray-100">
        <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
          {pedido.fotoPath ? (
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={pedido.fotoPath}
                alt={pedido.nome}
                width={50}
                height={50}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-gray-700 font-semibold">
              {pedido.nome[0]}
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-lg font-medium text-gray-800 truncate">
              {pedido.nome}
            </span>
            <span className="text-sm text-gray-500 truncate">
              {/* pedido.email não existe em Aluno, removendo ou verificando se existe em PedidoEntrada */}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('aprovar')}
            disabled={loadingAction !== null}
            className="text-green-600 hover:text-green-800 transition disabled:cursor-not-allowed p-1 rounded focus:outline-none focus:scale-110 focus:ring-2 focus:ring-green-400"
            title="Aprovar"
          >
            {loadingAction === 'aprovar' ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Check className="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-300" />
            )}
          </button>

          <button
            onClick={() => openModal('recusar')}
            disabled={loadingAction !== null}
            className="text-red-400 hover:text-red-600 transition disabled:cursor-not-allowed p-1 rounded focus:outline-none focus:scale-110 focus:ring-2 focus:ring-red-400"
            title="Recusar"
          >
            {loadingAction === 'recusar' ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <X className="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-300" />
            )}
          </button>
        </div>
      </div>

      {modalConfig && (
        <ConfirmationModal
          isOpen={modalConfig.isOpen}
          onClose={closeModal}
          onConfirm={handleAction}
          title={modalConfig.type === 'aprovar' ? "Aprovar Solicitação" : "Recusar Solicitação"}
          description={
            modalConfig.type === 'aprovar'
              ? `Tem certeza que deseja aprovar a entrada de ${pedido.nome} na turma?`
              : `Tem certeza que deseja recusar a entrada de ${pedido.nome} na turma?`
          }
          confirmText={modalConfig.type === 'aprovar' ? "Aprovar" : "Recusar"}
          variant={modalConfig.type === 'aprovar' ? 'primary' : 'danger'}
        />
      )}
    </>
  );
};

export default SolicitacaoItem;
