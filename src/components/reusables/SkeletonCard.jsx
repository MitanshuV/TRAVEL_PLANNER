// SkeletonCard.jsx
import React from "react";

const SkeletonCard = () => {
  return (
    <div className="p-4 border rounded-md shadow-lg bg-gray-200 animate-pulse">
      <div className="h-48 bg-gray-300 rounded-md mb-2" />
      <div className="h-6 bg-gray-300 rounded mb-2" />
      <div className="h-4 bg-gray-300 rounded mb-2" />
      <div className="h-4 bg-gray-300 rounded mb-2" />
      <div className="h-4 bg-gray-300 rounded mb-2" />
    </div>
  );
};

export default SkeletonCard;
