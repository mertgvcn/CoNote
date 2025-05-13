import React from "react";

const DiamondComponent = () => {
  return (
    <div style={{ position: "absolute", width: "150px", height: "150px" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M50,0 L100,50 L50,100 L0,50 Z" fill="#4fc3f7" />
      </svg>
    </div>
  );
};

export default DiamondComponent;
