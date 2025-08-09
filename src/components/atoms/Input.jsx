import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text", 
  error = false,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 rounded-lg border transition-all duration-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1";
  
  const variants = {
    default: "border-gray-200 bg-white text-gray-900 focus:border-primary-500 focus:ring-primary-500/20 shadow-sm hover:border-gray-300",
    error: "border-error-500 bg-red-50 text-gray-900 focus:border-error-500 focus:ring-error-500/20"
  };

  return (
    <input
      type={type}
      className={cn(baseStyles, error ? variants.error : variants.default, className)}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;