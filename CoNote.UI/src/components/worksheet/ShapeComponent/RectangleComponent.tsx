import React from "react";

const RectangleComponent = () => {
  return (
    <div style={{ position: "absolute", width: "150px", height: "100px" }}>
      <svg width="100%" height="100%" viewBox="0 0 150 100">
        <rect x="0" y="0" width="150" height="100" fill="#90caf9" />
      </svg>
    </div>
  );
};

export default RectangleComponent;
