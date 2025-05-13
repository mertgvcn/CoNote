import React from "react";

const DonutComponent = () => {
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
        A50,50 0 1,1 49.999,0
        M50,30
        A20,20 0 1,0 50.001,30
      "
          fill="#ba68c8"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default DonutComponent;
