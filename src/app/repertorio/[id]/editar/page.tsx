import React from 'react';
import RepertorioForm from '@/components/repertorio/repertorio-form';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    type?: string;
  };
}

export default function EditarRepertorioPage({ params, searchParams }: PageProps) {
  // Passamos o ID e o Tipo (que vem da URL ?type=obra)
  return (
    <RepertorioForm 
      repertoireId={params.id} 
      repertoireType={searchParams.type || 'obra'} 
      isEditing={true} 
    />
  );
}