// LoadingDialog.js
import React from "react";

const LoadingDialog = () => {
  return (
    <div className="fixed top-4 left-4 bg-white border rounded-lg shadow-md p-4 z-50">
      <p className="text-lg">Generating your trip...</p>
    </div>
  );
};

export default LoadingDialog;
