"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Clock, Timer, FileText, Quote, PlayCircle, AlertCircle, Loader2 } from "lucide-react";
import { EixoOptions } from "@/shared/constants/eixos";
import { AtividadeRedacaoDetalhada } from "@/lib/apiCalls/turma/types";
import { Repertorio } from "@/types/repertorio";
import { getAtividadeRedacaoDetalhes } from "@/lib/apiCalls/tarefas";
import { getRepertoriosBulk } from "@/lib/apiCalls/repertorio";
import { RepertorioDocument } from "@/lib/apiCalls/repertorio/types";
import RepertorioCard from "@/modules/repertorio/repertorio-card";

// Agora aceita 'id' em vez do objeto tarefa completo
interface RevisaoRedacaoPageProps {
  id: string;
}

export function RevisaoRedacaoPage({ id }: RevisaoRedacaoPageProps) {
  const [tarefa, setTarefa] = useState<AtividadeRedacaoDetalhada | null>(null);
  const [repertoriosDetalhados, setRepertoriosDetalhados] = useState<Repertorio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  // Busca os dados da tarefa ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAtividadeRedacaoDetalhes(id);
        if (data) {
          setTarefa(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Erro ao carregar tarefa:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Busca os detalhes dos repertórios quando a tarefa é carregada
  useEffect(() => {
    const fetchRepertorios = async () => {
      if (tarefa?.repertoriosApoio && tarefa.repertoriosApoio.length > 0) {
        try {
          const ids = tarefa.repertoriosApoio.map(r => r.id);
          const data = await getRepertoriosBulk(ids);
          
          // Mapeamento de RepertorioDocument para Repertorio
          const mappedRepertorios: Repertorio[] = data.map((doc: RepertorioDocument) => {
            const base = {
              id: doc.id,
              totalLikes: doc.totalLikes,
              favoritadoPeloUsuario: doc.favoritadoPeloUsuario,
              likeDoUsuario: doc.likeDoUsuario,
              criador: doc.criador,
              totalComentarios: doc.totalComentarios || 0,
              comentarios: doc.comentarios || [],
              eixos: doc.subtopicos || [],
              recortes: doc.topicos || [],
              isPublico: true, // Assumindo true pois veio da API
            };

            if (doc.tipoRepertorio === 'Obra') {
              return {
                ...base,
                modelo: 'obra',
                titulo: doc.titulo,
                autoria: doc.autor,
                sinopse: doc.sinopse,
                tipoObra: doc.tipoObra,
              } as any;
            } else if (doc.tipoRepertorio === 'Artigo') {
              return {
                ...base,
                modelo: 'artigo',
                titulo: doc.titulo,
                autoria: doc.autor,
                sintese: doc.resumo,
                fonte: doc.fonte,
              } as any;
            } else { // Citacao
              return {
                ...base,
                modelo: 'citacao',
                autoria: doc.autor,
                citacao: doc.frase,
                fonte: doc.fonte,
              } as any;
            }
          });

          setRepertoriosDetalhados(mappedRepertorios);
        } catch (error) {
          console.error("Erro ao buscar repertórios:", error);
        }
      }
    };


    if (tarefa) {
      fetchRepertorios();
    }
  }, [tarefa]);

  // Checar se existe rascunho salvo localmente
  useEffect(() => {
    if (typeof window !== 'undefined') {
        const storageKey = `tarefa_inprogress_${id}`;
        const savedDataString = localStorage.getItem(storageKey);
        if (savedDataString) {
            setHasDraft(true);
        }
    }
  }, [id]);

  // --- Estado de Loading ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-in fade-in duration-500">
        <Loader2 className="w-10 h-10 text-brand-teal-dark animate-spin" />
        <p className="text-brand-teal-dark font-montserrat font-medium">Carregando detalhes da atividade...</p>
      </div>
    );
  }

  // --- Estado de Erro ou Não Encontrado ---
  if (error || !tarefa) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center p-8">
        <div className="bg-red-50 p-4 rounded-full text-red-500">
            <AlertCircle size={40} />
        </div>
        <h2 className="text-xl font-bold text-neutral-dark font-montserrat">Atividade não encontrada</h2>
        <p className="text-gray-500 max-w-md font-montserrat">
            Não foi possível carregar os dados desta tarefa. Verifique se o link está correto ou tente novamente mais tarde.
        </p>
        <Link href="/turmas_aluno" className="text-brand-teal-dark font-bold hover:underline mt-2">
            Voltar para minhas turmas
        </Link>
      </div>
    );
  }

  // Lógica de UI (Mantida a mesma do design anterior)
  const selectedEixo = EixoOptions.find((e) => 
    tarefa.eixoTematico && e.nome.toLowerCase().includes(tarefa.eixoTematico.toLowerCase())
  );

  const dataEntregaDate = tarefa.dataLimite ? new Date(tarefa.dataLimite) : null;

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-0">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* =========================================================
            COLUNA ESQUERDA: Conteúdo da Prova
           ========================================================= */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Card Título */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 flex items-start gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5EFF0] rounded-bl-[100px] -z-0 opacity-50 pointer-events-none" />
                
                <div className="z-10 flex-1 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-[#E5EFF0] text-brand-teal-dark px-3 py-1 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider">
                            Eixo Temático
                        </span>
                        <div className="flex items-center gap-2 text-gray-600 font-medium font-montserrat text-sm">
                            {selectedEixo ? (
                                <>
                                    <Image 
                                        src={`/icons/${selectedEixo.icon}`} 
                                        alt={selectedEixo.nome} 
                                        width={16} 
                                        height={16} 
                                    />
                                    {selectedEixo.nome}
                                </>
                            ) : (
                                <span>{tarefa.eixoTematico || "Geral"}</span>
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-gray-400 text-sm font-montserrat font-medium mb-1">Título da Atividade</h3>
                        <p className="text-[24px] font-bold text-neutral-dark font-montserrat leading-tight">
                            {tarefa.titulo}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-gray-400 text-sm font-montserrat font-medium mb-1">Tema da Redação</h3>
                        <p className="text-[18px] text-neutral-dark font-montserrat italic bg-gray-50 p-4 rounded-xl border-l-4 border-brand-teal-dark">
                            "{tarefa.tema}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Card Instruções */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 space-y-4">
                <div className="flex items-center gap-2 text-brand-teal-dark mb-2">
                    <FileText size={20} />
                    <h3 className="font-bold font-montserrat text-lg">Instruções</h3>
                </div>
                <div className="text-gray-600 font-montserrat whitespace-pre-wrap leading-relaxed text-sm">
                    {tarefa.descricao || "Nenhuma instrução adicional fornecida pelo professor."}
                </div>
            </div>

            {/* Card Repertórios */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-teal-dark px-2">
                    <Quote size={20} />
                    <h3 className="font-bold font-montserrat text-lg">
                        Textos de Apoio ({tarefa.repertoriosApoio?.length || 0})
                    </h3>
                </div>
                
                {tarefa.repertoriosApoio && tarefa.repertoriosApoio.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {repertoriosDetalhados.length > 0 ? (
                            repertoriosDetalhados.map((rep) => (
                                <div 
                                   key={rep.id} 
                                   className="hover:scale-[1.02] transition-transform duration-300"
                                >
                                   <RepertorioCard repertorio={rep} />
                                </div>
                           ))
                        ) : (
                            // Skeleton loading ou estado de carregamento inicial
                             tarefa.repertoriosApoio.map((rep, index) => (
                                <div key={rep.id || index} className="bg-white p-4 rounded-2xl border border-gray-200 text-gray-400 text-sm text-center animate-pulse">
                                    Carregando texto de apoio...
                                </div>
                             ))
                        )}
                    </div>
                ) : (
                    <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-8 text-center flex flex-col items-center gap-2 text-gray-400 font-montserrat">
                        <Quote size={32} className="opacity-20" />
                        <p className="italic">Esta tarefa não possui textos de apoio anexados.</p>
                    </div>
                )}
            </div>
        </div>

        {/* =========================================================
            COLUNA DIREITA: Logística e Ação
           ========================================================= */}
        <div className="space-y-6">
            
            {/* Prazo */}
            <div className="bg-brand-teal-dark text-white p-8 rounded-[30px] shadow-lg relative overflow-hidden group">
                 <div className="absolute -right-10 -top-10 bg-white/10 w-40 h-40 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700" />
                 
                 <h3 className="font-montserrat font-semibold text-lg opacity-80 mb-6 flex items-center gap-2 relative z-10">
                    <Calendar size={18} /> Prazo de Entrega
                 </h3>

                 <div className="space-y-1 relative z-10">
                    <p className="text-3xl font-bold font-montserrat">
                        {dataEntregaDate ? format(dataEntregaDate, "dd/MM") : "Sem prazo"}
                    </p>
                    <p className="text-xl font-medium font-montserrat opacity-90 capitalize">
                        {dataEntregaDate ? format(dataEntregaDate, "EEEE", { locale: ptBR }) : "--"}
                    </p>
                 </div>

                 <div className="mt-6 pt-6 border-t border-white/20 flex items-center gap-3 relative z-10">
                    <Clock size={20} />
                    <div>
                        <p className="text-xs opacity-70 font-montserrat uppercase">Até às</p>
                        <p className="font-bold font-montserrat text-lg">
                            {dataEntregaDate ? format(dataEntregaDate, "HH:mm") + "h" : "--:--"}
                        </p>
                    </div>
                 </div>
            </div>

            {/* Timer */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-[#E5EFF0] rounded-full flex items-center justify-center text-brand-teal-dark">
                    <Timer size={28} />
                </div>
                <div>
                    <p className="text-gray-400 text-xs font-montserrat font-bold uppercase tracking-wide">
                        Tempo Sugerido
                    </p>
                    <p className="text-2xl font-bold text-neutral-dark font-montserrat">
                        {tarefa.tempoLimiteEmMinutos ? `${tarefa.tempoLimiteEmMinutos} min` : "Livre"}
                    </p>
                </div>
            </div>

            {/* BOTÃO DE AÇÃO: Leva para o EDITOR */}
            <div className="bg-white p-6 rounded-[30px] shadow-xl border border-gray-100 flex flex-col gap-4 transform transition-all hover:border-brand-teal-dark/30">
                <div className="flex gap-3 items-start">
                    <div className="bg-blue-50 p-2 rounded-full text-brand-teal-dark mt-1">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h4 className="text-neutral-dark font-bold font-montserrat text-sm mb-1">
                            Pronto para começar?
                        </h4>
                        <p className="text-gray-500 text-xs font-montserrat leading-relaxed">
                            Ao clicar abaixo, você irá para o editor e o cronômetro (se houver) será iniciado.
                        </p>
                    </div>
                </div>
                
                {/* Ajustei o link para a rota correta do seu editor: /fazer-tarefa/[id]/editor */}
                <Link 
                    href={`/fazer-tarefa/${id}/editor`} 
                    className="
                        group w-full bg-brand-teal-dark hover:bg-[#054a57] 
                        text-white font-bold py-4 rounded-2xl 
                        transition-all duration-300 
                        flex items-center justify-center gap-3 
                        shadow-md hover:shadow-lg hover:-translate-y-1
                    "
                >
                    <PlayCircle size={22} className="group-hover:scale-110 transition-transform" />
                    <span>{hasDraft ? "Continuar Redação" : "Iniciar Redação"}</span>
                </Link>
            </div>

        </div>
      </div>
    </div>
  );
}
