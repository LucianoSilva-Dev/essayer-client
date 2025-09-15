// components/JoinClass/JoinBox.tsx
'use client';

import { useState } from 'react';

export default function JoinBox() {
  const [code, setCode] = useState('');

  const handleJoin = () => {
    if (code.trim() === '') return;
    // Aqui você pode redirecionar ou fazer uma chamada à API
    console.log('Código inserido:', code);
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-md w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Entre em uma turma!</h3>
      <input
        type="text"
        placeholder="Cole o código da turma aqui"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
      />
      <button
        onClick={handleJoin}
        className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-md transition"
      >
        Acessar Turma →
      </button>
      <p className="text-xs text-gray-500 mt-2">
        Este código será enviado pelo professor responsável ou pelo administrador da turma.
      </p>
    </div>
  );
}
