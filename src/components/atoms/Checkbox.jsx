import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className, 
  id,
  label,
  checked = false,
  onChange,
  ...props 
}, ref) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="sr-only"
          ref={ref}
          {...props}
        />
        <div 
          onClick={() => onChange && onChange({ target: { checked: !checked } })}
          className={cn(
            "w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200 flex items-center justify-center",
            checked 
              ? "bg-primary-500 border-primary-500" 
              : "bg-white border-gray-300 hover:border-primary-400",
            className
          )}
        >
          {checked && (
            <ApperIcon name="Check" size={12} className="text-white" />
          )}
        </div>
      </div>
      {label && (
        <label 
          htmlFor={id} 
          className="ml-2 text-sm text-gray-700 cursor-pointer select-none"
        >
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;