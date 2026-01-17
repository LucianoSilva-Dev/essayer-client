"use client";

import React from 'react';

interface ComentarioEducadorProps {
  comentario: string;
  fixarComentario: boolean;
  onComentarioChange: (comentario: string) => void;
  onFixarChange: (fixar: boolean) => void;
}

export const ComentarioEducador: React.FC<ComentarioEducadorProps> = ({
  comentario,
  fixarComentario,
  onComentarioChange,
  onFixarChange
}) => {
  return (
    <div className="bg-surface-light rounded-[52px] p-12">
      <div className="space-y-7">
        {/* Label */}
        <h3 
          className="font-medium text-3xl"
          style={{
            color: '#434343',
            fontFamily: 'Montserrat',
            lineHeight: '20px'
          }}
        >
          Comentário do educador autor
        </h3>

        {/* Área do comentário */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <input
              type="text"
              value={comentario}
              onChange={(e) => onComentarioChange(e.target.value)}
              placeholder="Fixe um comentário no repertório..."
              className="flex-1 bg-transparent outline-none placeholder-opacity-100 mr-4"
              style={{
                color: '#898787',
                fontFamily: 'open sans',
                fontWeight: 300,
                fontSize: '16px',
                lineHeight: '32px'
              }}
            />
            
            <button
              onClick={() => onFixarChange(!fixarComentario)}
              className={`flex items-center justify-center  py-2 rounded-[32px] transition-colors ${
                fixarComentario ? 'bg-brand-teal-dark text-white px-2' : 'bg-white text-brand-teal-dark px-4'
              }`}
            >
              <span 
                className="font-semibold text-2xl"
                style={{
                  fontFamily: 'Montserrat',
                  lineHeight: '18px'
                }}
              >
                {fixarComentario ? 'Fixado' : 'Fixar'}
              </span>
            </button>
          </div>
          
          {/* Linha divisória */}
          <div className="border-t border-[#BDB4B4] w-full"></div>
        </div>
      </div>
    </div>
  );
};