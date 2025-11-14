import React from "react";

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};

export default FilterGroup;