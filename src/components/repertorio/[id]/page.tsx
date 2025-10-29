"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import type { Repertorio } from "@/types/repertorio";
import type { RepertorioDocument } from "@/apiCalls/repertorio/types";
import {getArtigoById, getCitacaoById, getObraById  } from "@/apiCalls/repertorio";
import { getProfilePictureLink } from "@/apiCalls/usuario";
import { mountRepertoire } from "@/app/utils";

// Componentes de UI e Lógica
import Loading from "./loading";
import ConfirmationModal from "@/components/shared/confirmation-modal";

// Componentes locais da página de detalhes
import { CreatorInfo } from "./components/CreatorInfo";
import { RepertorioActions } from "./components/RepertorioActions";
import { CommentSection } from "./components/CommentSection";
import { ObraContent } from "./components/content/ObraContent";
import { ArtigoContent } from "./components/content/ArtigoContent";
import { CitacaoContent } from "./components/content/CitacaoContent";

function RepertorioDetalhesContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { userData, isLoggedIn } = useAuth();

  // Estados
  const [repertorio, setRepertorio] = useState<Repertorio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isFavorito, setIsFavorito] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', onConfirm: async () => {} });
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [authorProfilePictureLink, setAuthorProfilePictureLink] = useState<string | null>(null);
  
  const id = params.id as string;
  const type = searchParams.get('type');
  
  const canEditRepertory = isLoggedIn && (repertorio?.criador.id === userData?.id || userData?.cargo === 'admin');
  const canDeleteRepertory = isLoggedIn && (repertorio?.criador.id === userData?.id || userData?.cargo === 'admin');

  // --- LÓGICA DE BUSCA DE DADOS ---
  const fetchRepertorio = useCallback(async () => {
    if (!id || !type) {
      // Aguarda até que id e type estejam disponíveis
      return;
    }

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

  // --- FUNÇÕES DE AÇÃO ---
  const handleLike = async () => { /* ... sua lógica ... */ };
  const handleToggleFavorito = async () => { /* ... sua lógica ... */ };
  const handleShare = async () => { /* ... sua lógica ... */ };
  const handleCommentSubmit = async (e: React.FormEvent) => { /* ... sua lógica ... */ };
  const handleEditRepertorio = () => router.push(`/repertorio/${id}/editar?type=${repertorio?.modelo}`);
  const handleDeleteRepertorio = () => openConfirmationModal({ /* ... */ });
  const openConfirmationModal = (options: any) => { /* ... */ };
  const handleConfirmAction = async () => { /* ... */ };

  const renderContent = () => {
    if (!repertorio) return null;
    switch (repertorio.modelo) {
      case "obra": return <ObraContent repertorio={repertorio} />;
      case "artigo": return <ArtigoContent repertorio={repertorio as any} />;
      case "citacao": return <CitacaoContent repertorio={repertorio as any} />;
      default: return null;
    }
  };

  // --- RENDERIZAÇÃO ---
  if (loading) return <Loading />;
  
  if (error) {
    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-red-600 mb-4">Ocorreu um Erro</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                    onClick={() => router.push("/main")}
                    className="flex items-center mx-auto px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Voltar para a página principal
                </button>
            </div>
        </main>
    );
  }
  
  if (!repertorio) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} {...modalContent} isLoading={isModalLoading} />
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
            <RepertorioActions {...{ canEdit: canEditRepertory, canDelete: canDeleteRepertory, isFavorito, isLiked, likes, onEdit: handleEditRepertorio, onDelete: handleDeleteRepertorio, onShare: handleShare, onToggleFavorito: handleToggleFavorito, onLike: handleLike }} />
          </div>

          <div className="bg-white rounded-lg shadow-lg border-l-4 border-l-[#CA9C60] overflow-hidden mt-4">
            <CreatorInfo creator={repertorio.criador} profilePictureUrl={authorProfilePictureLink} />
            <div className="p-4 sm:p-6 md:p-8">
              {renderContent()}
            </div>
          </div>

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
          />
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
