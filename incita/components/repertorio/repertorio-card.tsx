// Frontend/components/repertorio/repertorio-card.tsx
"use client"

import { useEffect, useState } from "react"
import { ThumbsUp, User, Bookmark, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Repertorio } from "@/../types/repertorio"
import { getProfilePictureLink } from "../../api/usuario"
import { addLike, removeLike, addFavorito, removeFavorito } from "../../api/repertorio"
import { useAuth } from "@/../contexts/auth-context"
import { toast } from "react-toastify"
import Image from "next/image"

interface RepertorioCardProps {
  repertorio: Repertorio
}

export default function RepertorioCard({ repertorio }: RepertorioCardProps) {
  const router = useRouter()
  const { isLoggedIn } = useAuth();
  
  const [likes, setLikes] = useState(repertorio.totalLikes)
  const [isLiked, setIsLiked] = useState(repertorio.likeDoUsuario)
  const [isFavorito, setIsFavorito] = useState(repertorio.favoritadoPeloUsuario);
  
  const [userProfilePictureLink, setUserProfilePictureLink] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUserProfilePicture() {
      if (repertorio.criador?.id) {
        const link = await getProfilePictureLink(repertorio.criador.id)
        setUserProfilePictureLink(link)
      }
    }
    fetchUserProfilePicture()
  }, [repertorio.criador?.id])

  // Atualizar estado local se as props mudarem (ex: após refetch geral)
  useEffect(() => {
    setLikes(repertorio.totalLikes);
    setIsLiked(repertorio.likeDoUsuario);
    setIsFavorito(repertorio.favoritadoPeloUsuario);
  }, [repertorio.totalLikes, repertorio.likeDoUsuario, repertorio.favoritadoPeloUsuario]);

  const handleLike = async () => {
    if (!isLoggedIn) return toast.error("Você precisa estar logado para curtir.");
    try {
      if (isLiked) {
        await removeLike(repertorio.id)
        setLikes((prev) => prev - 1)
      } else {
        await addLike(repertorio.id)
        setLikes((prev) => prev + 1)
      }
      setIsLiked(!isLiked)
    } catch {
       toast.error("Erro ao processar sua curtida.");
    }
  }

  const handleToggleFavorito = async () => {
    if (!isLoggedIn) return toast.error("Você precisa estar logado para favoritar.");
    try {
      if (isFavorito) {
        await removeFavorito(repertorio.id);
      } else {
        await addFavorito(repertorio.id);
      }
      setIsFavorito(!isFavorito);
    } catch {
      toast.error("Erro ao salvar nos favoritos.");
    }
  }

  const handleViewDetails = () => {
    router.push(`/repertorio/${repertorio.id}?type=${repertorio.modelo}`)
  }

  const getModeloStyle = (modelo: string) => {
    switch (modelo) {
      case "obra":
        return "border-amber-500 text-amber-700 bg-amber-50";
      case "artigo":
        return "border-teal-500 text-teal-700 bg-teal-50";
      case "citacao":
        return "border-blue-500 text-blue-700 bg-blue-50";
      default:
        return "border-gray-300 text-gray-800 bg-gray-100";
    }
  }

  const getModeloLabel = (repertorio: Repertorio) => {
    switch (repertorio.modelo) {
        case "obra":
            if (repertorio.tipoObra) {
                const tipo = repertorio.tipoObra.charAt(0).toUpperCase() + repertorio.tipoObra.slice(1);
                return `Obra (${tipo})`;
            }
            return "Obra";
        case "artigo":
            return "Artigo";
        case "citacao":
            return "Citação";
        default:
            return "Repertório";
    }
  }

  const renderContent = () => {
    switch (repertorio.modelo) {
      case "obra":
        return (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{repertorio.titulo}</h3>
            <p className="text-sm text-gray-600 mb-3">Por {repertorio.autoria}</p>
            <div className="mb-4">
              <p className="text-sm text-gray-700 line-clamp-4 whitespace-pre-wrap">
                {repertorio.sinopse}
              </p>
            </div>
          </>
        )

      case "artigo":
        return (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{repertorio.titulo}</h3>
            <p className="text-sm text-gray-600 mb-3">Por {repertorio.autoria}</p>
            <div className="mb-4">
              <p className="text-sm text-gray-700 line-clamp-4 whitespace-pre-wrap">
                {repertorio.sintese}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-xs text-gray-500">
                <span className="font-medium">Fonte:</span> {repertorio.fonte}
              </p>
            </div>
          </>
        )

      case "citacao":
        return (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{repertorio.autoria}</h3>
            <p className="text-sm text-gray-600 mb-3">Citação</p>
            <div className="mb-4">
              <p className="text-sm text-gray-700 italic mb-2 line-clamp-3 whitespace-pre-wrap">
                &quot;{repertorio.citacao}&quot;
              </p>
            </div>
            {repertorio.fonte && ( 
              <div className="mb-4">
                <p className="text-xs text-gray-500">
                  <span className="font-medium">Fonte:</span> {repertorio.fonte}
                </p>
              </div>
            )}
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-white h-full w-full flex rounded-lg border-l-4 border-l-[#CA9C60] shadow-sm hover:shadow-md transition p-4 cursor-pointer group flex flex-col justify-between hover:scale-110 duration-400 ease-in-out" onClick={handleViewDetails}>
      <div>
        {/* Cabeçalho do card */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            {userProfilePictureLink ? (
              <Image
                src={userProfilePictureLink}
                alt={`Foto de perfil de ${repertorio.criador.nome}`}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover mr-2"
              />
            ) : (
              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center mr-2">
                <User size={14} className="text-white" />
              </div>
            )}
            <span className="text-sm font-medium text-gray-800">{repertorio.criador.nome}</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleViewDetails()
              }}
              className="text-gray-400 hover:text-[#CA9C60] transition-colors opacity-0 group-hover:opacity-100"
              title="Ver detalhes"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleToggleFavorito()
              }}
              className={`transition-colors ${isFavorito ? "text-blue-500" : "text-gray-400 hover:text-blue-500"}`}
              title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Bookmark size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleLike()
              }}
              className={`flex items-center space-x-1 transition-colors ${isLiked ? "text-blue-500" : "text-gray-400 hover:text-blue-500"
                }`}
              title="Curtir"
            >
              <ThumbsUp size={16} />
              <span className="text-sm">{likes}</span>
            </button>
          </div>
        </div>

        {/* Tags de tipo e eixos */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold border ${getModeloStyle(repertorio.modelo)}`}>
            #{getModeloLabel(repertorio)}
          </span>
          {repertorio.eixos.map(eixo => (
             <span
                key={eixo}
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-800 border-gray-200`}
            >
                {eixo}
            </span>
          ))}
        </div>
        
        {/* Conteúdo específico do modelo - clicável */}
        <div>
          {renderContent()}
        </div>
      </div>

      {/* Recortes */}
      <div className="grid grid-cols-2 place-items-center gap-2 mt-4">
        {repertorio.recortes.slice(0, 4).map(recorte => (
            <span key={recorte} className="flex-3 w-full py-1 px-3 bg-[#E5EFF0] text-[#075F70] text-xs rounded-full text-center">
                {recorte}
            </span>
        ))}
      </div>
    </div>
  )
}