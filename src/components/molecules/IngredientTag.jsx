import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const IngredientTag = ({ 
  ingredient, 
  onRemove,
  variant = "primary" 
}) => {
  return (
    <Badge 
      variant={variant}
      className="pr-1 pl-3 py-2 flex items-center gap-2 text-sm"
    >
      <span>{ingredient}</span>
      {onRemove && (
        <button
          onClick={() => onRemove(ingredient)}
          className="hover:bg-primary-200 rounded-full p-0.5 transition-colors"
          aria-label={`Remove ${ingredient}`}
        >
          <ApperIcon name="X" size={12} />
        </button>
      )}
    </Badge>
  );
};

export default IngredientTag;