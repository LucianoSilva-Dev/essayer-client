"use client"

import { useEffect, useState, Suspense } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Bookmark, ThumbsUp, Share2, BookOpen, FileText, Quote, User, Send } from "lucide-react"
import type { Repertorio } from "@/../types/repertorio"
import type { Comentario } from '@/../api/types'
import { getArtigoById, getCitacaoById, getObraById, addComentario, addLike, removeLike, addFavorito, removeFavorito } from "@/../api/repertorio"
import type { RepertorioDocument } from "@/../api/repertorio/types"
import { mountRepertoire } from "@/app/utils"
import { useAuth } from "@/../contexts/auth-context"
import Loading from "./loading"
import { toast } from "react-toastify"
import { getProfilePictureLink } from "@/../api/usuario"

function CommentCard({ comentario }: { comentario: Comentario }) {
  const [authorProfilePictureLink, setAuthorProfilePictureLink] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      const data = await getProfilePictureLink(comentario.usuario?.id)
      if (data) setAuthorProfilePictureLink(data)
    }

    if (comentario.usuario) fetchData()
  }, [comentario.usuario])

  return (
    <div className="flex items-start space-x-4 py-4">
      <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
        {authorProfilePictureLink ? (
          <img src={authorProfilePictureLink} alt={`Foto de ${comentario.usuario.nome}`} className="w-full h-full object-cover" />
        ) : (
          <User size={24} className="text-gray-500 m-2" />
        )}
      </div>
      <div>
        <p className="font-semibold text-gray-800">{comentario.usuario.nome}</p>
        <p className="text-gray-600">{comentario.texto}</p>
      </div>
    </div>
  )
}

function RepertorioDetalhesContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const { userData, isLoggedIn } = useAuth()
  
  const [repertorio, setRepertorio] = useState<Repertorio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [isFavorito, setIsFavorito] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  const id = params.id as string
  const type = searchParams.get('type')

  const fetchRepertorio = async () => {
    if (!id || !type) {
        setError("Informações do repertório incompletas.");
        setLoading(false);
        return;
    }
    setLoading(true)
    try {
      let repertorioDoc: RepertorioDocument | null = null;
      switch(type) {
        case 'obra':
          repertorioDoc = await getObraById(id);
          repertorioDoc = {...repertorioDoc, tipoRepertorio: 'Obra'}
          break;
        case 'artigo':
          repertorioDoc = await getArtigoById(id);
          repertorioDoc = {...repertorioDoc, tipoRepertorio: 'Artigo'}
          break;
        case 'citacao':
          repertorioDoc = await getCitacaoById(id);
          repertorioDoc = {...repertorioDoc, tipoRepertorio: 'Citacao'}
          break;
        default:
          throw new Error("Tipo de repertório inválido");
      }

      if (repertorioDoc) {
        const mounted = mountRepertoire(repertorioDoc)
        if(mounted) {
          setRepertorio(mounted)
          setIsLiked(mounted.likeDoUsuario)
          setLikes(mounted.totalLikes)
          setIsFavorito(mounted.favoritadoPeloUsuario)
        } else {
          setError("Falha ao carregar o repertório.")
        }
      } else {
        setError("Repertório não encontrado.")
      }
    } catch (err) {
      setError("Erro ao buscar o repertório. Tente novamente mais tarde.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRepertorio()
  }, [id, type])

  const handleLike = async () => {
    if (!isLoggedIn) return toast.error("Você precisa estar logado para curtir.");
    if (!repertorio) return;

    try {
      if (isLiked) {
        await removeLike(repertorio.id);
        setLikes(prev => prev - 1);
      } else {
        await addLike(repertorio.id);
        setLikes(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      toast.error("Erro ao processar sua curtida.");
    }
  }
  
  const handleToggleFavorito = async () => {
    if (!isLoggedIn) return toast.error("Você precisa estar logado para favoritar.");
    if (!repertorio) return;

    try {
      if (isFavorito) {
        await removeFavorito(repertorio.id);
      } else {
        await addFavorito(repertorio.id);
      }
      setIsFavorito(!isFavorito);
    } catch (err) {
      toast.error("Erro ao salvar nos favoritos.");
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
      await fetchRepertorio(); // Re-fetch data to show the new comment
    } catch (err) {
      toast.error("Erro ao adicionar comentário.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (loading) return <Loading />

  if (error) {
     return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/main")}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </main>
    )
  }

  if (!repertorio) return null;

  const getModeloIcon = (modelo: string) => {
    switch (modelo) {
      case "obra": return BookOpen
      case "artigo": return FileText
      case "citacao": return Quote
      default: return BookOpen
    }
  }

  const getModeloLabel = (modelo: string) => {
    switch (modelo) {
      case "obra": return "Obra"
      case "artigo": return "Artigo"
      case "citacao": return "Citação"
      default: return "Obra"
    }
  }

  const getTitle = () => {
    switch (repertorio.modelo) {
      case "obra": return repertorio.titulo
      case "artigo": return repertorio.titulo
      case "citacao": return `Citação de ${repertorio.autoria}`
      default: return "Repertório"
    }
  }

  const getDescription = () => {
    switch (repertorio.modelo) {
      case "obra": return repertorio.sinopse.substring(0, 150) + "..."
      case "artigo": return repertorio.sintese.substring(0, 150) + "..."
      case "citacao": return repertorio.citacao.substring(0, 150) + "..."
      default: return ""
    }
  }

  const renderContent = () => {
    const ModeloIcon = getModeloIcon(repertorio.modelo)

    switch (repertorio.modelo) {
      case "obra":
        return (
          <div className="space-y-6">
            <div className="text-center border-b border-[#CA9C60] pb-6">
              <div className="flex items-center justify-center mb-4">
                <ModeloIcon size={32} className="text-[#CA9C60] mr-3" />
                <span className="text-lg font-medium text-[#CA9C60]">{getModeloLabel(repertorio.modelo)}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{repertorio.titulo}</h1>
              <p className="text-xl text-gray-600">Por {repertorio.autoria}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sinopse</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{repertorio.sinopse}</p>
            </div>
          </div>
        )
      case "artigo":
        return (
          <div className="space-y-6">
            <div className="text-center border-b border-[#CA9C60] pb-6">
              <div className="flex items-center justify-center mb-4">
                <ModeloIcon size={32} className="text-[#CA9C60] mr-3" />
                <span className="text-lg font-medium text-[#CA9C60]">{getModeloLabel(repertorio.modelo)}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{repertorio.titulo}</h1>
              <p className="text-xl text-gray-600">Por {repertorio.autoria}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Síntese</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{repertorio.sintese}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Fonte</h2>
              <p className="text-gray-600 italic">{repertorio.fonte}</p>
            </div>
          </div>
        )
      case "citacao":
        return (
          <div className="space-y-6">
            <div className="text-center border-b border-[#CA9C60] pb-6">
              <div className="flex items-center justify-center mb-4">
                <ModeloIcon size={32} className="text-[#CA9C60] mr-3" />
                <span className="text-lg font-medium text-[#CA9C60]">{getModeloLabel(repertorio.modelo)}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{repertorio.autoria}</h1>
            </div>
            <div className="bg-gray-50 border-l-4 border-[#CA9C60] p-8 rounded-r-lg">
              <blockquote className="text-2xl text-gray-800 italic leading-relaxed">"{repertorio.citacao}"</blockquote>
            </div>
            {repertorio.fonte && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Fonte</h2>
                <p className="text-gray-600 italic">{repertorio.fonte}</p>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Voltar
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-[#CA9C60] transition-colors"
                title="Compartilhar"
              >
                <Share2 size={18} className="mr-1" />
                Compartilhar
              </button>
              <button
                onClick={handleToggleFavorito}
                className={`flex items-center px-3 py-2 transition-colors ${
                  isFavorito ? "text-blue-600 hover:text-blue-700" : "text-gray-600 hover:text-blue-600"
                }`}
                title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Bookmark size={18} className="mr-1" />
                {isFavorito ? "Favoritado" : "Favoritar"}
              </button>
              <button
                onClick={handleLike}
                className={`flex items-center px-3 py-2 transition-colors ${
                  isLiked ? "text-blue-600 hover:text-blue-700" : "text-gray-600 hover:text-blue-600"
                }`}
                title="Curtir"
              >
                <ThumbsUp size={18} className="mr-1" />
                {likes}
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-l-[#CA9C60] overflow-hidden mt-4">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                   <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{repertorio.criador?.nome || 'Usuário desconhecido'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {renderContent()}
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Comentários ({repertorio.totalComentarios})</h3>
            
            {(userData?.cargo === 'professor' || userData?.cargo === 'admin') && (
              <form onSubmit={handleCommentSubmit} className="flex items-start space-x-4 mb-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Adicione um comentário..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                  rows={4}
                  disabled={isSubmittingComment}
                />
                <button type="submit" disabled={isSubmittingComment || !newComment.trim()} className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50">
                  <Send size={20} />
                </button>
              </form>
            )}

            <div className="space-y-4 divide-y divide-gray-200">
              {repertorio.comentarios && repertorio.comentarios.length > 0 ? (
                repertorio.comentarios.map((comentario) => (
                  <CommentCard key={comentario.id} comentario={comentario} />
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function RepertorioDetalhesPage() {
    return (
        <Suspense fallback={<Loading />}>
            <RepertorioDetalhesContent />
        </Suspense>
    )
}