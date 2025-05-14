import React from "react";

const CrossComponentDraggable = () => {
  return (
    <svg
      width="100px"
      height="100px"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d="M10,0 L50,40 L90,0 L100,10 L60,50
           L100,90 L90,100 L50,60 L10,100 L0,90
           L40,50 L0,10 Z"
        fill="#7e57c2"
      />
    </svg>
  );
};

export default CrossComponentDraggable;
