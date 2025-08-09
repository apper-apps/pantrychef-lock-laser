import React from "react";
import RecipeCard from "@/components/molecules/RecipeCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const RecipeGrid = ({ 
  recipes, 
  loading, 
  error, 
  onRecipeClick,
  onRetry,
  className 
}) => {
  if (loading) {
    return <Loading className={className} />;
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={onRetry}
        className={className}
      />
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <Empty
        title="No recipes found"
        description="Try adjusting your ingredients or filters to find more recipes"
        className={className}
      />
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.Id}
            recipe={recipe}
            onClick={onRecipeClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;