import React from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const RecipeCard = ({ 
  recipe, 
  onClick,
  className 
}) => {
  const getMatchColor = (percentage) => {
    if (percentage >= 80) return "success";
    if (percentage >= 60) return "warning";
    return "error";
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy": return "success";
      case "medium": return "warning";
      case "hard": return "error";
      default: return "default";
    }
  };

  return (
    <Card 
      hover 
      onClick={() => onClick?.(recipe)}
      className={className}
    >
      <div className="relative">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-t-lg"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
          <div className={`text-xs font-bold ${
            recipe.matchPercentage >= 80 ? "text-green-600" :
            recipe.matchPercentage >= 60 ? "text-yellow-600" :
            "text-red-600"
          }`}>
            {recipe.matchPercentage}%
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-gray-900 line-clamp-2">
            {recipe.title}
          </h3>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <ApperIcon name="Clock" size={14} />
            <span>{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="Users" size={14} />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant={getDifficultyColor(recipe.difficulty)} size="small">
            {recipe.difficulty}
          </Badge>
          <Badge variant={getMatchColor(recipe.matchPercentage)} size="small">
            {recipe.matchPercentage}% match
          </Badge>
        </div>

        {recipe.dietary && recipe.dietary.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.dietary.slice(0, 3).map((diet) => (
              <Badge key={diet} variant="accent" size="small">
                {diet}
              </Badge>
            ))}
            {recipe.dietary.length > 3 && (
              <Badge variant="default" size="small">
                +{recipe.dietary.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecipeCard;