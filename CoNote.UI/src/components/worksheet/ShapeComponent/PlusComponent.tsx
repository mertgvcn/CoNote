import React from "react";

const PlusComponent = () => {
  return (
    <div style={{ position: "absolute", width: "100px", height: "100px" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="
        M40,0 H60 V40 H100 V60 H60 V100 H40 V60 H0 V40 H40 Z
      "
          fill="#ef5350"
        />
      </svg>
    </div>
  );
};

export default PlusComponent;
