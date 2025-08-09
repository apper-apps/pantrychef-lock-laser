import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import ApperIcon from "@/components/ApperIcon";

const FilterSection = ({ 
  title, 
  children, 
  className,
  collapsible = false,
  defaultOpen = true 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold text-gray-900 mb-0">
          {title}
        </Label>
        {collapsible && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ApperIcon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
          </button>
        )}
      </div>
      {(!collapsible || isOpen) && (
        <div className="space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterSection;