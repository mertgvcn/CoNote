import React from "react";

const MessageComponent = () => {
  return (
    <div style={{ position: "absolute", width: "300px", height: "200px" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="10 10 80 80"
        preserveAspectRatio="none"
      >
        <path d="M10,10 H90 V70 H75 L70,90 L65,70 H10 Z" fill="#aed581" />
      </svg>
    </div>
  );
};

export default MessageComponent;
