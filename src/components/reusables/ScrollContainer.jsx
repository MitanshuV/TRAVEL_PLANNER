import React from "react";

const ScrollContainer = ({ children }) => {
  return (
    <div className="overflow-x-auto scrollbar-hidden whitespace-nowrap">
      <div className="flex gap-4">{children}</div>
    </div>
  );
};

export default ScrollContainer;
