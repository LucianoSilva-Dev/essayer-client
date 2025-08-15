"use client"

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import RepertorioForm from "@/./components/repertorio/repertorio-form";
import Loading from "../loading";
import type { RepertorioFormData } from "@/types/repertorio";
import { getArtigoById, getCitacaoById, getObraById, updateArtigo, updateCitacao, updateObra } from "@/./apiCalls/repertorio";
import type { RepertorioDocument, UpdateArtigoBody, UpdateCitacaoBody, UpdateObraBody } from "@/./apiCalls/repertorio/types";
import { mountRepertoire } from "@/app/utils";
import { useAuth } from "@/./contexts/auth-context";

function EditarRepertorioContent() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const type = searchParams.get('type');

    const { userData, isLoggedIn, isLoading: isAuthLoading } = useAuth();
    const [initialData, setInitialData] = useState<RepertorioFormData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthLoading) return;
        if (!isLoggedIn) {
            toast.error("Você precisa estar logado para editar repertórios.");
            router.push('/login');
            return;
        }

        const fetchRepertorio = async () => {
            try {
                // CORREÇÃO: Verificação movida para dentro do 'try'
                if (!id || !type) {
                    toast.error("Informações inválidas para editar o repertório.");
                    router.push("/main");
                    return; // Este return não impede mais o finally
                }

                let repertorioDoc: RepertorioDocument | null = null;
                switch (type) {
                    case 'obra':
                        repertorioDoc = await getObraById(id);
                        repertorioDoc = { ...repertorioDoc, tipoRepertorio: 'Obra' }
                        break;
                    case 'artigo':
                        repertorioDoc = await getArtigoById(id);
                        repertorioDoc = { ...repertorioDoc, tipoRepertorio: 'Artigo' }
                        break;
                    case 'citacao':
                        repertorioDoc = await getCitacaoById(id);
                        repertorioDoc = { ...repertorioDoc, tipoRepertorio: 'Citacao' }
                        break;
                    default:
                        throw new Error("Tipo de repertório inválido");
                }

                if (repertorioDoc) {
                    const mounted = mountRepertoire(repertorioDoc);
                    if (mounted) {
                        if (mounted.criador.id !== userData?.id && userData?.cargo !== 'admin') {
                            toast.error("Você não tem permissão para editar este repertório.");
                            router.push(`/repertorio/${id}?type=${mounted.modelo}`);
                            return;
                        }
                        const formData: RepertorioFormData = {
                            modelo: mounted.modelo,
                            autoria: mounted.autoria,
                            eixos: mounted.eixos,
                            recortes: mounted.recortes,
                            isPublico: true,
                            ...(mounted.modelo === 'obra' && { titulo: mounted.titulo, sinopse: mounted.sinopse, tipoObra: mounted.tipoObra }),
                            ...(mounted.modelo === 'artigo' && { titulo: mounted.titulo, sintese: mounted.sintese, fonte: mounted.fonte }),
                            ...(mounted.modelo === 'citacao' && { citacao: mounted.citacao, fonte: mounted.fonte || '' })
                        } as RepertorioFormData;
                        setInitialData(formData);
                    }
                } else {
                    toast.error("Repertório não encontrado.");
                    router.push('/main');
                }
            } catch {
                toast.error("Erro ao carregar dados para edição.");
                router.push('/main');
            } finally {
                // CORREÇÃO: Este bloco agora é sempre alcançado.
                setLoading(false);
            }
        };

        fetchRepertorio();
    }, [id, type, isLoggedIn, isAuthLoading, router, userData]);

    const handleSubmit = async (data: RepertorioFormData) => {
        try {
            switch (data.modelo) {
                case 'obra':
                    const obraData: UpdateObraBody = {
                        titulo: data.titulo,
                        autor: data.autoria,
                        sinopse: data.sinopse,
                        tipoObra: data.tipoObra,
                        topicos: data.eixos,
                        subtopicos: data.recortes
                    };
                    await updateObra(id, obraData);
                    break;
                case 'artigo':
                    const artigoData: UpdateArtigoBody = {
                        titulo: data.titulo,
                        autor: data.autoria,
                        resumo: data.sintese,
                        fonte: data.fonte,
                        topicos: data.eixos,
                        subtopicos: data.recortes
                    };
                    await updateArtigo(id, artigoData);
                    break;
                case 'citacao':
                    const citacaoData: UpdateCitacaoBody = {
                        frase: data.citacao,
                        autor: data.autoria,
                        fonte: data.fonte,
                        topicos: data.eixos,
                        subtopicos: data.recortes
                    };
                    await updateCitacao(id, citacaoData);
                    break;
            }
            router.push(`/repertorio/${id}?type=${data.modelo}`);
        } catch (error) {
            console.error("Erro ao atualizar repertório:", error);
        }
    };

    if (loading || !initialData) {
        return <Loading />;
    }

    return (
        <main className="min-h-[calc(100vh-64px)] bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <RepertorioForm
                    onSubmit={handleSubmit}
                    onCancel={() => router.back()}
                    initialData={initialData}
                    isEditing={true}
                />
            </div>
        </main>
    );
}

export default function EditarRepertorioPage() {
    return (
        <Suspense fallback={<Loading />}>
            <EditarRepertorioContent />
        </Suspense>
    )
}