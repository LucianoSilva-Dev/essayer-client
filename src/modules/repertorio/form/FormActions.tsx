import { Save, X } from "lucide-react";

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
}

export function FormActions({ onCancel, isSubmitting }: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-4">
      <button
        type="button"
        onClick={onCancel}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <X size={18} className="mr-2" />
        Cancelar
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-[#CA9C60] hover:bg-[#a68050] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
      >
        <Save size={18} className="mr-2" />
        {isSubmitting ? "Salvando..." : "Salvar Repertório"}
      </button>
    </div>
  );
}