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
  const progress = ((value - min) / (max - min)) * 100;
  
  return (
    <div className={cn("relative w-full", className)}>
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        step={step}
        className="
          w-full h-2 rounded-lg appearance-none cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50
        "
        style={{
          background: `linear-gradient(to right, #ff6b35 0%, #ff6b35 ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%)`,
          '--progress': `${progress}%`
        }}
        {...props}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ff6b35;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          border: 2px solid white;
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ff6b35;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
});

Slider.displayName = "Slider";

export default Slider;