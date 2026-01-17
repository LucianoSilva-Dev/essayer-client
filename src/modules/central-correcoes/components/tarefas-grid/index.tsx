import Image from "next/image";
import { AtividadeProfessor } from "@/lib/apiCalls/turma/types";
import { ArrowUpRight, Eye } from "lucide-react"; // Importei Eye para variar o ícone se quiser
import { formatDate } from "../../helpers/formatDate";

interface Props {
  tarefas: AtividadeProfessor[] | undefined;
  onSelectTarefa: (id: string) => void;
}

export function TarefaGrid({ tarefas, onSelectTarefa }: Props) {
  if (!tarefas) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p>Nenhuma tarefa encontrada para este filtro.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
      {tarefas.map((tarefa) => {
        const extraAlunos =
          tarefa.usuariosResponderam.length > 3
            ? tarefa.usuariosResponderam.length - 3
            : 0;
        const avataresParaMostrar = tarefa.usuariosResponderam.slice(0, 3);

        const isEncerrada = new Date(tarefa.dataLimite || "") < new Date();
        const textoData = tarefa.dataLimite
          ? isEncerrada
            ? "Fechou em"
            : "Fecha em"
          : "";

        return (
          <div
            key={tarefa.id}
            onClick={() => onSelectTarefa(tarefa.id)}
            // APLICAÇÃO DOS ESTILOS CONDICIONAIS
            className={`
            relative rounded-[24px] p-6 flex flex-col justify-between min-h-[280px] border transition-all duration-300 cursor-pointer group overflow-hidden
            ${
              isEncerrada
                ? // ESTILO ENCERRADA:
                  // - bg-gray-100: Fundo um pouco mais escuro que o branco
                  // - grayscale: Tira a saturação (fica cinza)
                  // - opacity-80: Leve transparência
                  // - hover:grayscale-0: Devolve a cor ao passar o mouse
                  "bg-gray-100 border-gray-200 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 hover:bg-white hover:shadow-md"
                : // ESTILO ATIVA (Padrão):
                  // - Efeitos de sombra colorida e levitação (-translate-y-1)
                  "bg-[#F8F9FA] border-transparent hover:border-brand-teal-dark/30 hover:shadow-xl hover:shadow-brand-teal-dark/10 hover:-translate-y-1"
            }
          `}
          >
            {/* Topo do Card */}
            <div className="relative">
              {/* Header */}
              <div className="flex justify-between items-start mb-2 h-10">
                <span
                  className={`text-sm font-medium block mt-1 transition-colors ${
                    isEncerrada
                      ? "text-gray-500"
                      : "text-gray-500 group-hover:text-brand-teal-dark"
                  }`}
                >
                  {tarefa.tipoAtividade === "Redacao" ? "Redação" : "Material"}
                </span>

                {/* BOTÃO CTA */}
                <div
                  className={`
                    w-10 h-10 rounded-full text-white flex items-center justify-center shadow-md transform opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300
                    ${isEncerrada ? "bg-gray-500" : "bg-brand-teal-dark"}
                `}
                >
                  {/* Se estiver encerrada, mostra um ícone de 'Olho' (Visualizar), senão Seta (Acessar) */}
                  {isEncerrada ? <Eye size={20} /> : <ArrowUpRight size={20} />}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 leading-snug line-clamp-3 mb-4 pr-2">
                {tarefa.titulo}
              </h3>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-200 flex justify-between h-25">
              {/* Lado Esquerdo */}
              <div className="flex flex-col justify-between">
                <span className="text-sm font-semibold text-gray-700 block">
                  Envios
                </span>

                <div className="flex items-center relative pb-1">
                  <div className="flex -space-x-5">
                    {avataresParaMostrar.map((user, i) => (
                      <div
                        key={i}
                        style={{ zIndex: i * 10 }}
                        className={`relative w-9 h-9 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center overflow-hidden
                                    ${
                                      i === 0
                                        ? "blur-[0.5px] opacity-90 grayscale-[0.2]"
                                        : ""
                                    } 
                                `}
                      >
                        {user.fotoPath ? (
                          <Image
                            src={user.fotoPath}
                            alt={user.nome}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-[10px] font-bold text-gray-500">
                            {user.nome
                              ? user.nome.substring(0, 2).toUpperCase()
                              : "??"}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {extraAlunos > 0 && (
                    <div
                      style={{ zIndex: 40 }}
                      // Ajuste de cor da pill baseada no status também
                      className={`relative -ml-4 h-9 min-w-[3.5rem] px-1.5 bg-white rounded-full text-[10px] font-bold shadow-sm border-2 border-white flex flex-col items-center justify-center leading-none text-center
                                ${
                                  isEncerrada
                                    ? "text-gray-500"
                                    : "text-brand-teal-dark"
                                }
                            `}
                    >
                      <span>+{extraAlunos}</span>
                      <span>alunos</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Lado Direito */}
              <div className="text-right flex flex-col items-end justify-between h-full">
                <span
                  className={`text-xl font-bold leading-none mt-1 transition-transform origin-right group-hover:scale-105
                    ${isEncerrada ? "text-gray-600" : "text-brand-teal-dark"}
                `}
                >
                  {tarefa.usuariosResponderam.length}
                  <span className="text-gray-400 text-lg">
                    /{tarefa.totalMembros}
                  </span>
                </span>

                <span className="text-xs text-gray-500 font-medium leading-tight pb-1">
                  {textoData} <br />
                  {formatDate(tarefa.dataLimite)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
