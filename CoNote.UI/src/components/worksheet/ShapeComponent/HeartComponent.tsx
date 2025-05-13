import React from "react";

const HeartComponent = () => {
  return (
    <div style={{ position: "absolute", width: "150px", height: "150px" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 26.4"
        preserveAspectRatio="none"
      >
        <path
          d="M23.6,0c-3.4,0-6.4,2.1-7.6,5.1C14.8,2.1,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4
         c0,4.5,3.5,8.2,10.3,13.8c1.6,1.3,3.4,2.7,5.3,4.2c1.9-1.5,3.7-2.9,5.3-4.2
         C28.5,16.6,32,12.9,32,8.4C32,3.8,28.2,0,23.6,0z"
          fill="#e91e63"
        />
      </svg>
    </div>
  );
};

export default HeartComponent;
