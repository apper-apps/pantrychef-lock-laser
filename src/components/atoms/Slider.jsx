import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Slider = forwardRef(({ 
  className,
  min = 0,
  max = 100,
  value = 50,
  onChange,
  step = 1,
  ...props 
}, ref) => {
  return (
    <div className="relative w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        className={cn(
          "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5",
          "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500",
          "[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md",
          "[&::-webkit-slider-thumb]:hover:bg-primary-600 [&::-webkit-slider-thumb]:transition-colors",
          "[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full",
          "[&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:cursor-pointer",
          "[&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-md",
          className
        )}
        ref={ref}
        {...props}
      />
      <style jsx>{`
        input[type="range"]::-webkit-slider-track {
          background: linear-gradient(to right, #ff6b35 0%, #ff6b35 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%);
        }
        input[type="range"]::-moz-range-track {
          background: linear-gradient(to right, #ff6b35 0%, #ff6b35 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%);
        }
      `}</style>
    </div>
  );
});

Slider.displayName = "Slider";

export default Slider;