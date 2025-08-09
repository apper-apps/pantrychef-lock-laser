import recipesData from "@/services/mockData/recipes.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllRecipes = async () => {
  await delay(300);
  return [...recipesData];
};

export const getRecipeById = async (id) => {
  await delay(200);
  const recipe = recipesData.find(r => r.Id === id);
  if (!recipe) {
    throw new Error("Recipe not found");
  }
  return { ...recipe };
};

export const searchRecipes = async (ingredients, filters = {}) => {
  await delay(400);
  
  let results = [...recipesData];

  // Calculate match percentage based on available ingredients
  results = results.map(recipe => {
    const recipeIngredients = recipe.ingredients || [];
    const availableIngredients = ingredients.map(ing => ing.toLowerCase());
    
    // Mark ingredients as available if they match user's ingredients
    const updatedIngredients = recipeIngredients.map(ingredient => ({
      ...ingredient,
      isAvailable: availableIngredients.some(userIng => 
        ingredient.name.toLowerCase().includes(userIng) || 
        userIng.includes(ingredient.name.toLowerCase())
      )
    }));

    // Calculate match percentage
    const totalIngredients = recipeIngredients.length;
    const availableCount = updatedIngredients.filter(ing => ing.isAvailable).length;
    const matchPercentage = totalIngredients > 0 ? Math.round((availableCount / totalIngredients) * 100) : 0;

    return {
      ...recipe,
      ingredients: updatedIngredients,
      matchPercentage
    };
  });

  // Filter by minimum match (at least 1 ingredient must match)
  results = results.filter(recipe => recipe.matchPercentage > 0);

  // Apply dietary filters
  if (filters.dietary && filters.dietary.length > 0) {
    results = results.filter(recipe => {
      const recipeDietary = recipe.dietary || [];
      return filters.dietary.every(diet => 
        recipeDietary.some(recipeDiet => 
          recipeDiet.toLowerCase().includes(diet.toLowerCase())
        )
      );
    });
  }

  // Apply cooking time filter
  if (filters.maxTime && filters.maxTime > 0) {
    results = results.filter(recipe => recipe.cookTime <= filters.maxTime);
  }

  // Apply difficulty filter
  if (filters.difficulty) {
    results = results.filter(recipe => 
      recipe.difficulty && 
      recipe.difficulty.toLowerCase() === filters.difficulty.toLowerCase()
    );
  }

  // Sort by match percentage (highest first)
  results.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return results;
};

export const createRecipe = async (recipeData) => {
  await delay(500);
  const newRecipe = {
    Id: Math.max(...recipesData.map(r => r.Id)) + 1,
    ...recipeData
  };
  recipesData.push(newRecipe);
  return { ...newRecipe };
};

export const updateRecipe = async (id, updatedData) => {
  await delay(300);
  const index = recipesData.findIndex(r => r.Id === id);
  if (index === -1) {
    throw new Error("Recipe not found");
  }
  recipesData[index] = { ...recipesData[index], ...updatedData };
  return { ...recipesData[index] };
};

export const deleteRecipe = async (id) => {
  await delay(300);
  const index = recipesData.findIndex(r => r.Id === id);
  if (index === -1) {
    throw new Error("Recipe not found");
  }
  recipesData.splice(index, 1);
  return true;
};