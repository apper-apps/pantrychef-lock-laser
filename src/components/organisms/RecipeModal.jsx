import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const RecipeModal = ({ 
  recipe, 
  isOpen, 
  onClose 
}) => {
  if (!recipe) return null;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy": return "success";
      case "medium": return "warning"; 
      case "hard": return "error";
      default: return "default";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={onClose}
          />
          
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl"
            >
              <Card className="max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="relative">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={onClose}
                    className="absolute top-4 right-4 rounded-full w-10 h-10 p-0"
                  >
                    <ApperIcon name="X" size={16} />
                  </Button>
                  <div className="absolute bottom-4 left-4 bg-white rounded-full p-3 shadow-lg">
                    <div className={`text-sm font-bold ${
                      recipe.matchPercentage >= 80 ? "text-green-600" :
                      recipe.matchPercentage >= 60 ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {recipe.matchPercentage}% match
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Title and Meta */}
                  <div className="space-y-4">
                    <h1 className="font-display text-3xl font-bold text-gray-900">
                      {recipe.title}
                    </h1>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Clock" size={16} />
                        <span>{recipe.prepTime + recipe.cookTime} min total</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Users" size={16} />
                        <span>{recipe.servings} servings</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ApperIcon name="ChefHat" size={16} />
                        <span>Prep: {recipe.prepTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Flame" size={16} />
                        <span>Cook: {recipe.cookTime} min</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={getDifficultyColor(recipe.difficulty)}>
                        {recipe.difficulty}
                      </Badge>
                      {recipe.dietary && recipe.dietary.map((diet) => (
                        <Badge key={diet} variant="accent" size="small">
                          {diet}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Ingredients */}
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Ingredients
                      </h2>
                      <div className="space-y-3">
                        {recipe.ingredients.map((ingredient, index) => (
                          <div 
                            key={index}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                              ingredient.isAvailable 
                                ? "bg-green-50 text-green-900" 
                                : "bg-red-50 text-red-900"
                            }`}
                          >
                            <ApperIcon 
                              name={ingredient.isAvailable ? "CheckCircle" : "XCircle"} 
                              size={16}
                              className={ingredient.isAvailable ? "text-green-600" : "text-red-600"}
                            />
                            <span className="font-medium">
                              {ingredient.amount} {ingredient.unit} {ingredient.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Instructions
                      </h2>
                      <div className="space-y-4">
                        {recipe.instructions.map((instruction, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 leading-relaxed pt-1">
                              {instruction}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RecipeModal;