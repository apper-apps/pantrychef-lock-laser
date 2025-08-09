import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import IngredientSearch from "@/components/organisms/IngredientSearch";
import SearchFilters from "@/components/organisms/SearchFilters";
import RecipeGrid from "@/components/organisms/RecipeGrid";
import RecipeModal from "@/components/organisms/RecipeModal";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import * as recipeService from "@/services/api/recipeService";

const HomePage = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filters, setFilters] = useState({
    dietary: [],
    maxTime: 60,
    difficulty: ""
  });
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const searchRecipes = useCallback(async () => {
    if (selectedIngredients.length === 0) {
      setRecipes([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const results = await recipeService.searchRecipes(selectedIngredients, filters);
      setRecipes(results);
      
      if (results.length === 0) {
        toast.info("No recipes found with your current ingredients and filters.");
      } else {
        toast.success(`Found ${results.length} recipe${results.length !== 1 ? 's' : ''} for you!`);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to search recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [selectedIngredients, filters]);

  useEffect(() => {
    searchRecipes();
  }, [searchRecipes]);

  // Listen for add ingredient events from Empty component
  useEffect(() => {
    const handleAddIngredient = (e) => {
      const ingredient = e.detail;
      if (!selectedIngredients.includes(ingredient)) {
        setSelectedIngredients(prev => [...prev, ingredient]);
        toast.success(`Added ${ingredient} to your ingredients!`);
      }
    };

    window.addEventListener('add-ingredient', handleAddIngredient);
    return () => window.removeEventListener('add-ingredient', handleAddIngredient);
  }, [selectedIngredients]);

  const handleRecipeClick = async (recipe) => {
    try {
      const fullRecipe = await recipeService.getRecipeById(recipe.Id);
      setSelectedRecipe(fullRecipe);
      setIsModalOpen(true);
    } catch (err) {
      toast.error("Failed to load recipe details.");
    }
  };

  const handleResetFilters = () => {
    setFilters({
      dietary: [],
      maxTime: 60, 
      difficulty: ""
    });
    toast.info("Filters reset");
  };

  const handleClearIngredients = () => {
    setSelectedIngredients([]);
    setRecipes([]);
    toast.info("Ingredients cleared");
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="ChefHat" size={24} className="text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold text-gray-900">
                PantryChef
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="small"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <ApperIcon name="SlidersHorizontal" size={16} className="mr-2" />
                Filters
              </Button>

              {selectedIngredients.length > 0 && (
                <Button
                  variant="outline"
                  size="small"
                  onClick={handleClearIngredients}
                >
                  <ApperIcon name="X" size={16} className="mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Search and Filters */}
          <div className={`lg:col-span-1 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <IngredientSearch
              selectedIngredients={selectedIngredients}
              onIngredientsChange={setSelectedIngredients}
            />
            
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onReset={handleResetFilters}
            />
          </div>

          {/* Main Content - Recipe Results */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              {selectedIngredients.length > 0 ? (
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Recipe Results
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {loading ? (
                        "Searching for recipes..."
                      ) : recipes.length > 0 ? (
                        `Found ${recipes.length} recipe${recipes.length !== 1 ? 's' : ''} with your ingredients`
                      ) : (
                        "No recipes found with current ingredients"
                      )}
                    </p>
                  </div>
                  
                  {!loading && recipes.length > 0 && (
                    <div className="text-sm text-gray-500">
                      Sorted by ingredient match
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ApperIcon name="Search" size={48} className="text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Find Your Perfect Recipe
                  </h2>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Start by adding ingredients you have at home. We'll find delicious recipes you can make right now!
                  </p>
                </div>
              )}
            </div>

            <RecipeGrid
              recipes={recipes}
              loading={loading}
              error={error}
              onRecipeClick={handleRecipeClick}
              onRetry={searchRecipes}
            />
          </div>
        </div>
      </div>

      {/* Recipe Detail Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRecipe(null);
        }}
      />
    </div>
  );
};

export default HomePage;