import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className }) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse bg-[length:200%_100%]" 
                 style={{
                   animation: "shimmer 1.5s ease-in-out infinite",
                   backgroundImage: "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)"
                 }} />
            
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" 
                   style={{
                     animation: "shimmer 1.5s ease-in-out infinite",
                     backgroundImage: "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)"
                   }} />
              
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse"
                     style={{
                       animation: "shimmer 1.5s ease-in-out infinite",
                       backgroundImage: "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)"
                     }} />
                <div className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse"
                     style={{
                       animation: "shimmer 1.5s ease-in-out infinite",
                       backgroundImage: "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)"
                     }} />
              </div>
              
              <div className="flex justify-between">
                <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse"
                     style={{
                       animation: "shimmer 1.5s ease-in-out infinite", 
                       backgroundImage: "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)"
                     }} />
                <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse"
                     style={{
                       animation: "shimmer 1.5s ease-in-out infinite",
                       backgroundImage: "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)"
                     }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default Loading;