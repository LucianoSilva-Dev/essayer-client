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
      className={`px-8 py-3 w-[580px] rounded-[30px] text-[#434343] font-medium text-[30px] transition-colors duration-300 ${
        disabled ? "bg-[#898787] cursor-not-allowed" : "bg-[#075F70] text-[#E5EFF0] hover:bg-[#019DA3] cursor-pointer delay-200"
      }`}
    >
      Criar turma
    </button>
  );
}