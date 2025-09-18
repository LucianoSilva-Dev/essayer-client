"use client";

export default function CriarTurmaButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded text-white ${
        disabled ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      Criar turma
    </button>
  );
}
