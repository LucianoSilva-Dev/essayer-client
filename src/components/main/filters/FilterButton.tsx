import React from "react";
import { cn } from "@/lib/utils";

interface FilterButtonProps {
  onClick: () => void;
  isActive: boolean;
  label: string;
  icon?: React.ElementType;
  colorConfig?: {
    active: string;
    inactive: string;
  };
}

const FilterButton: React.FC<FilterButtonProps> = ({
  onClick,
  isActive,
  label,
  icon: Icon,
  colorConfig = {
    active: "bg-teal-100 text-teal-700 border-teal-200",
    inactive: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100",
  },
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-full border transition-colors",
        isActive ? colorConfig.active : colorConfig.inactive
      )}
    >
      {Icon && <Icon size={14} className="mr-1.5" />}
      {label}
    </button>
  );
};

export default FilterButton;