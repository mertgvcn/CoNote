import React from "react";

const ArrowComponent = () => {
  return (
    <div style={{ position: "absolute", width: "350px", height: "40px" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="10 20 180 60"
        preserveAspectRatio="none"
      >
        <path
          d="M10,40 L130,40 L130,20 L190,50 L130,80 L130,60 L10,60 Z"
          fill="#64b5f6"
        />
      </svg>
    </div>
  );
};

export default ArrowComponent;
