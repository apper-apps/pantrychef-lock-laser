import React, { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import SearchBar from "@/components/molecules/SearchBar";
import IngredientTag from "@/components/molecules/IngredientTag";
import Label from "@/components/atoms/Label";
import { ingredientSuggestions } from "@/services/mockData/ingredients.json";

const IngredientSearch = ({ 
  selectedIngredients, 
  onIngredientsChange,
  className 
}) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(ingredientSuggestions || []);
  }, []);

  const handleAddIngredient = (ingredient) => {
    const normalizedIngredient = ingredient.toLowerCase().trim();
    const existingIngredient = selectedIngredients.find(
      ing => ing.toLowerCase() === normalizedIngredient
    );

    if (!existingIngredient && normalizedIngredient) {
      onIngredientsChange([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    onIngredientsChange(selectedIngredients.filter(ing => ing !== ingredient));
  };

  const availableSuggestions = suggestions.filter(
    suggestion => !selectedIngredients.some(
      ing => ing.toLowerCase() === suggestion.toLowerCase()
    )
  );

  return (
    <Card className={className}>
      <div className="p-6 space-y-4">
        <div>
          <Label className="text-lg font-semibold text-gray-900">
            What ingredients do you have?
          </Label>
          <p className="text-sm text-gray-600 mt-1">
            Add ingredients you have at home to find matching recipes
          </p>
        </div>

        <SearchBar
          placeholder="Add an ingredient..."
          onSearch={handleAddIngredient}
          suggestions={availableSuggestions}
          autoFocus
        />

        {selectedIngredients.length > 0 && (
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Selected Ingredients ({selectedIngredients.length})
            </Label>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient) => (
                <IngredientTag
                  key={ingredient}
                  ingredient={ingredient}
                  onRemove={handleRemoveIngredient}
                  variant="primary"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default IngredientSearch;