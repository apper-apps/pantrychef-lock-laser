import React from "react";
import Card from "@/components/atoms/Card";
import Checkbox from "@/components/atoms/Checkbox";
import Slider from "@/components/atoms/Slider";
import Button from "@/components/atoms/Button";
import FilterSection from "@/components/molecules/FilterSection";
import Label from "@/components/atoms/Label";

const SearchFilters = ({
  filters,
  onFiltersChange,
  onReset,
  className
}) => {
  const dietaryOptions = [
    "Vegetarian",
    "Vegan", 
    "Gluten-Free",
    "Dairy-Free",
    "Low-Carb",
    "Keto",
    "Paleo",
    "Mediterranean"
  ];

  const difficultyOptions = ["Easy", "Medium", "Hard"];

  const handleDietaryChange = (diet, checked) => {
    const newDietary = checked 
      ? [...filters.dietary, diet]
      : filters.dietary.filter(d => d !== diet);
    
    onFiltersChange({ ...filters, dietary: newDietary });
  };

  const handleDifficultyChange = (difficulty, checked) => {
    onFiltersChange({ 
      ...filters, 
      difficulty: checked ? difficulty : "" 
    });
  };

  const handleMaxTimeChange = (time) => {
    onFiltersChange({ ...filters, maxTime: time });
  };

  const getTimeLabel = (time) => {
    if (time <= 30) return `${time} minutes`;
    if (time <= 60) return `${time} minutes`;
    if (time <= 120) return `${Math.floor(time / 60)}h ${time % 60}m`;
    return "Any time";
  };

  return (
    <Card className={className}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <Button
            variant="ghost" 
            size="small"
            onClick={onReset}
            className="text-sm"
          >
            Reset
          </Button>
        </div>

        <FilterSection title="Cooking Time">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm text-gray-600 mb-0">
                Max time: {getTimeLabel(filters.maxTime)}
              </Label>
            </div>
            <Slider
              min={10}
              max={180}
              value={filters.maxTime}
              onChange={handleMaxTimeChange}
              step={5}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>10 min</span>
              <span>3 hours</span>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Dietary Restrictions">
          <div className="space-y-2">
            {dietaryOptions.map((diet) => (
              <Checkbox
                key={diet}
                id={`diet-${diet}`}
                label={diet}
                checked={filters.dietary.includes(diet)}
                onChange={(e) => handleDietaryChange(diet, e.target.checked)}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Difficulty Level">
          <div className="space-y-2">
            {difficultyOptions.map((difficulty) => (
              <Checkbox
                key={difficulty}
                id={`difficulty-${difficulty}`}
                label={difficulty}
                checked={filters.difficulty === difficulty}
                onChange={(e) => handleDifficultyChange(difficulty, e.target.checked)}
              />
            ))}
          </div>
        </FilterSection>
      </div>
    </Card>
  );
};

export default SearchFilters;