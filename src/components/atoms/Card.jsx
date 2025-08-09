import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  hover = false,
  children, 
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200";
  const hoverStyles = hover ? "hover:shadow-md hover:scale-[1.02] cursor-pointer transform-gpu" : "";

  return (
    <div
      className={cn(baseStyles, hoverStyles, className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;