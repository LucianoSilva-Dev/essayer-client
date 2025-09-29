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
      className={`px-8 py-3 rounded-lg text-white font-medium text-lg ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#3C3C3C] hover:bg-[#2C2C2C] transition-colors"
      }`}
    >
      Criar turma
    </button>
  );
}