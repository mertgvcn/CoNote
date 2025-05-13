import React from "react";

const TriangleComponent = () => {
  return (
    <div style={{ position: "absolute", width: "150px", height: "150px" }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <polygon points="50,0 100,100 0,100" fill="#a1887f" />
      </svg>
    </div>
  );
};

export default TriangleComponent;
