import React from "react";

const SquareComponent = () => {
  return (
    <div style={{ position: "absolute", width: "150px", height: "150px" }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <rect x="0" y="0" width="100" height="100" fill="#90caf9" />
      </svg>
    </div>
  );
};

export default SquareComponent;
