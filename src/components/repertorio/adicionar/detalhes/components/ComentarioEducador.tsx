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
    <div className="bg-[#E8E8E8] rounded-[52px] p-12">
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
                fontFamily: 'Montserrat',
                fontWeight: 300,
                fontSize: '32px',
                lineHeight: '48px'
              }}
            />
            
            <button
              onClick={() => onFixarChange(!fixarComentario)}
              className={`flex items-center justify-center px-6 py-2 rounded-[32px] transition-colors ${
                fixarComentario ? 'bg-[#075F70] text-white' : 'bg-white text-[#075F70]'
              }`}
            >
              <span 
                className="font-semibold text-2xl"
                style={{
                  fontFamily: 'Montserrat',
                  lineHeight: '48px'
                }}
              >
                Fixar
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