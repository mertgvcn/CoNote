import React from "react";

const StarComponent = () => {
  return (
    <div style={{ position: "absolute", width: "150px", height: "150px" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="
      M50,0
      L63,38
      L100,38
      L70,60
      L82,100
      L50,78
      L18,100
      L30,60
      L0,38
      L37,38
      Z
    "
          fill="#ffd54f"
        />
      </svg>
    </div>
  );
};

export default StarComponent;
