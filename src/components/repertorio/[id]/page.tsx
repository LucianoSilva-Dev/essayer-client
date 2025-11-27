"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Bookmark, ThumbsUp } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

// Tipos e API
import type { Repertorio } from "@/types/repertorio";
import type { RepertorioDocument } from "@/apiCalls/repertorio/types";
import { addComentario, addFavorito, addLike, deleteRepertorio, getArtigoById, getCitacaoById, getObraById, removeFavorito, removeLike } from "@/apiCalls/repertorio";
import { getProfilePictureLink } from "@/apiCalls/usuario";
import { mountRepertoire } from "@/app/utils";

// Helpers e Mappers
import { getEixosComRecortes } from "./helpers/repertorio-mapper";

// Componentes de UI
import Loading from "./loading";
import ConfirmationModal from "@/components/shared/confirmation-modal";
import { CreatorInfo } from "./components/CreatorInfo";
import { RepertorioActions } from "./components/RepertorioActions";
import { CommentSection } from "./components/CommentSection";
import { RepertorioFooter } from "./components/RepertorioFooter";

// Componentes de Conteúdo
import { ObraContent } from "./components/content/ObraContent";
import { ArtigoContent } from "./components/content/ArtigoContent";
import { CitacaoContent } from "./components/content/CitacaoContent";
import { toast } from "react-toastify";

function RepertorioDetalhesContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { userData, isLoggedIn } = useAuth();

  // Estados de Dados
  const [repertorio, setRepertorio] = useState<Repertorio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados de Interação
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isFavorito, setIsFavorito] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Estados de Modal e Imagem
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', onConfirm: async () => { } });
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [authorProfilePictureLink, setAuthorProfilePictureLink] = useState<string | null>(null);

  const [isLiking, setIsLiking] = useState(false)
  const [isFavouriting, setIsFavouriting] = useState(false)


  const id = params.id as string;
  const type = searchParams.get('type');

  // Permissões
  const canEditRepertory = isLoggedIn && (repertorio?.criador.id === userData?.id || userData?.cargo === 'admin');
  const canDeleteRepertory = isLoggedIn && (repertorio?.criador.id === userData?.id || userData?.cargo === 'admin');

  // --- BUSCA DE DADOS ---
  const fetchRepertorio = useCallback(async () => {
    if (!id || !type) return;

    setLoading(true);
    setError(null);

    try {
      let repertorioDoc: RepertorioDocument | null = null;

      switch (type) {
        case 'obra':
          repertorioDoc = { ...(await getObraById(id)), tipoRepertorio: 'Obra' };
          break;
        case 'artigo':
          repertorioDoc = { ...(await getArtigoById(id)), tipoRepertorio: 'Artigo' };
          break;
        case 'citacao':
          repertorioDoc = { ...(await getCitacaoById(id)), tipoRepertorio: 'Citacao' };
          break;
        default:
          throw new Error("Tipo de repertório inválido");
      }

      const mounted = mountRepertoire(repertorioDoc);
      if (mounted) {
        setRepertorio(mounted);
        setLikes(mounted.totalLikes);
        setIsLiked(mounted.likeDoUsuario);
        setIsFavorito(mounted.favoritadoPeloUsuario);
        if (mounted.criador?.id) {
          getProfilePictureLink(mounted.criador.id).then(setAuthorProfilePictureLink);
        }
      } else {
        setError("Falha ao processar os dados do repertório.");
      }
    } catch (err) {
      console.error("Erro ao buscar repertório:", err);
      setError("Repertório não encontrado ou ocorreu um erro ao buscá-lo.");
      setRepertorio(null);
    } finally {
      setLoading(false);
    }
  }, [id, type]);

  useEffect(() => {
    fetchRepertorio();
  }, [fetchRepertorio]);

  const getTitle = () => {
    if (!repertorio) return undefined;
    switch (repertorio.modelo) {
      case "obra": return repertorio.titulo;
      case "artigo": return repertorio.titulo;
      case "citacao": return repertorio.autoria;
      default: return undefined;
    }
  }

  const getDescription = () => {
    if (!repertorio) return undefined;
    switch (repertorio.modelo) {
      case "obra": return repertorio.sinopse;
      case "artigo": return repertorio.sintese;
      case "citacao": return repertorio.citacao;
      default: return undefined;
    }
  }

  // --- AÇÕES ---
  const handleLike = async () => {
    if (!isLoggedIn) return toast.error("Você precisa estar logado para curtir.");
    if (!repertorio) return;
    if (isLiking) return

    try {
      setIsLiking(true)
      if (isLiked) {
        await removeLike(repertorio.id);
        setLikes(prev => prev - 1);
      } else {
        await addLike(repertorio.id);
        setLikes(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Erro ao processar sua curtida:", err);
    } finally {
      setIsLiking(false)
    }
  }

  const handleToggleFavorito = async () => {
    if (!isLoggedIn) return toast.error("Você precisa estar logado para favoritar.");
    if (!repertorio) return;
    if (isFavouriting) return

    try {
      setIsFavouriting(true)
      if (isFavorito) {
        await removeFavorito(repertorio.id);
      } else {
        await addFavorito(repertorio.id);
      }
      setIsFavorito(!isFavorito);
    } catch (err) {
      console.error("Erro ao salvar nos favoritos:", err);
    } finally {
      setIsFavouriting(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: getTitle(),
          text: getDescription(),
          url: window.location.href,
        })
      } catch (error) {
        console.log("Erro ao compartilhar:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copiado para a área de transferência!")
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !repertorio) return;
    if (!isLoggedIn) return toast.error("Você precisa estar logado para comentar.");

    setIsSubmittingComment(true);
    try {
      await addComentario(repertorio.id, { texto: newComment });
      setNewComment("");
      toast.success("Comentário adicionado!");
      await fetchRepertorio();
    } catch (err) {
      console.error("Erro ao adicionar comentário.", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleEditRepertorio = () => router.push(`/repertorio/${id}/editar?type=${repertorio?.modelo}`);

  const handleDeleteRepertorio = () => {
    openConfirmationModal({
      title: "Excluir Repertório",
      message: "Tem certeza? Essa ação não pode ser desfeita.",
      onConfirm: async () => {
        await deleteRepertorio(id)
        router.replace('/main')
      }
    });
  };

  const openConfirmationModal = (options: any) => {
    setModalContent(options);
    setIsModalOpen(true);
  };

  // --- HELPERS DE RENDERIZAÇÃO ---
  const renderContent = () => {
    if (!repertorio) return null;
    switch (repertorio.modelo) {
      case "obra": return <ObraContent repertorio={repertorio} />;
      case "artigo": return <ArtigoContent repertorio={repertorio as any} />;
      case "citacao": return <CitacaoContent repertorio={repertorio as any} />;
      default: return null;
    }
  };

  const getTypeColorClass = (modelo: string) => {
    switch (modelo) {
      case 'artigo': return 'text-[#2258B6]';
      case 'obra': return 'text-[#CA9C60]';
      case 'citacao': return 'text-[#0C8462]';
      default: return 'text-gray-700';
    }
  };

  const getRepertorioTitle = () => (repertorio && repertorio.modelo !== 'citacao') ? repertorio.titulo : null;
  const getRepertorioTypeLabel = () => repertorio ? repertorio.modelo.charAt(0).toUpperCase() + repertorio.modelo.slice(1) : '';

  // --- RENDER DA PÁGINA ---
  if (loading) return <Loading />;

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-montserrat">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={() => router.back()} className="text-teal-600 hover:underline">Voltar</button>
        </div>
      </main>
    );
  }

  if (!repertorio) return null;

  const typeColorClass = getTypeColorClass(repertorio.modelo);
  const title = getRepertorioTitle();
  const dadosFooter = getEixosComRecortes(repertorio);

  return (
    <main className="min-h-screen bg-gray-50 pb-12 font-montserrat">
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} {...modalContent} isLoading={isModalLoading} />

      <div className="container mx-auto px-4 pt-6 md:pt-8">
        <div className="max-w-4xl mx-auto">

          {/* Header Superior: Ações Externas */}
          <div className="flex justify-end items-center mb-4">
            <RepertorioActions
              canEdit={canEditRepertory}
              canDelete={canDeleteRepertory}
              onEdit={handleEditRepertorio}
              onDelete={handleDeleteRepertorio}
              onShare={handleShare}
            />
          </div>

          {/* Card Principal */}
          <div className="bg-[#EAEAEA] rounded-[2rem] p-6 md:p-10 shadow-sm">

            {/* Header Interno */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <CreatorInfo creator={repertorio.criador} profilePictureUrl={authorProfilePictureLink} />

              <div className="flex items-center self-start md:self-center gap-3">
                {/* Pill Principal */}
                <div className="bg-white rounded-full px-5 py-2 flex items-center shadow-sm">
                  <span className={`font-bold ${typeColorClass}`}>
                    {getRepertorioTypeLabel()}
                  </span>

                  {title && (
                    <>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className={`font-bold ${typeColorClass} truncate max-w-[150px] sm:max-w-[250px]`}>
                        {title}
                      </span>
                    </>
                  )}
                </div>

                {/* Ações Rápidas */}
                <button onClick={handleLike} className="p-2 rounded-full hover:bg-white/50 transition-colors text-gray-700 hover:text-blue-600 flex items-center gap-1" title="Curtir">
                  <ThumbsUp size={22} className={isLiked ? "fill-blue-600 text-blue-600" : ""} />
                  {likes > 0 && <span className="text-sm font-medium">{likes}</span>}
                </button>

                <button onClick={handleToggleFavorito} className="p-2 rounded-full hover:bg-white/50 transition-colors text-gray-700 hover:text-blue-600" title="Salvar">
                  <Bookmark size={22} className={isFavorito ? "fill-blue-600 text-blue-600" : ""} />
                </button>
              </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="mt-12 text-gray-800">
              {renderContent()}
            </div>

            {/* Footer do Card */}
            <RepertorioFooter dados={dadosFooter} />
          </div>

          {/* Seção de Comentários */}
          <div className="mt-8">
            <CommentSection
              comments={repertorio.comentarios || []}
              repertorioId={repertorio.id}
              isLoggedIn={isLoggedIn}
              userRole={userData?.cargo}
              newComment={newComment}
              setNewComment={setNewComment}
              isSubmittingComment={isSubmittingComment}
              onCommentSubmit={handleCommentSubmit}
              onCommentUpdate={fetchRepertorio}
              openModal={openConfirmationModal}

              // Props para o Mock e Correção do Toast
              authorName={repertorio.criador.nome}
              authorProfilePicture={authorProfilePictureLink}
              authorId={repertorio.criador.id}
            />
          </div>

        </div>
      </div>
    </main>
  );
}

export default function RepertorioDetalhesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RepertorioDetalhesContent />
    </Suspense>
  );
}

function getTitle(): string | undefined {
  throw new Error("Function not implemented.");
}
function getDescription(): string | undefined {
  throw new Error("Function not implemented.");
}

