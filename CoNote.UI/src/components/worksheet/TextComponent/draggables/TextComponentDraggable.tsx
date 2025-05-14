import React from "react";

const TextComponentDraggable = () => {
  return (
    <svg
      width="220px"
      height="40px"
      viewBox="0 0 220 40"
      style={{
        border: "2px solid #aaa",
        borderRadius: 4,
      }}
    >
      <text
        x="10"
        y="25"
        fontSize="16"
        fontFamily="Arial, sans-serif"
        fill="#000000"
      >
        Edit this text
      </text>
    </svg>
  );
};

export default TextComponentDraggable;
