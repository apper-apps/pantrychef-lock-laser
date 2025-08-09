import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No recipes found",
  description = "Try adding some ingredients or adjusting your filters to discover delicious recipes you can make.",
  className,
  showSuggestions = true
}) => {
  const suggestions = [
    "chicken",
    "pasta",
    "rice", 
    "tomatoes",
    "onions",
    "garlic"
  ];

  return (
    <div className={cn("flex items-center justify-center min-h-[400px]", className)}>
      <Card className="p-8 text-center max-w-lg">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="ChefHat" size={40} className="text-primary-600" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>

        {showSuggestions && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700">
              Try searching for popular ingredients:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((ingredient) => (
                <Button
                  key={ingredient}
                  variant="outline"
                  size="small"
onClick={() => {
                    // This would trigger adding the ingredient to search
                    if (typeof window !== 'undefined' && window.CustomEvent) {
                      window.dispatchEvent(new window.CustomEvent('add-ingredient', { detail: ingredient }));
                    }
                  }}
                  className="text-sm"
                >
                  <ApperIcon name="Plus" size={14} className="mr-1" />
                  {ingredient}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Empty;