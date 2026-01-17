import RepertorioForm from '@/modules/repertorio/repertorio-form';
import React from 'react';

export const metadata = {
  title: 'Editar Repertório',
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    type?: string;
  }>;
}

export default async function EditarRepertorioPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { type } = await searchParams;
  // Passamos o ID e o Tipo (que vem da URL ?type=obra)
  return (
    <RepertorioForm 
      repertoireId={id} 
      repertoireType={type || 'obra'} 
      isEditing={true} 
    />
  );
}