import React from "react";

type PolygonComponentPropsType = {
  sides?: number;
};

const PolygonComponent = ({ sides = 6 }: PolygonComponentPropsType) => {
  function getPolygonPointsFullSize(sides: number, boxSize = 100): string {
    const center = boxSize / 2;
    const radius = center; // max radius to touch borders
    const angleStep = (2 * Math.PI) / sides;

    const points = Array.from({ length: sides }, (_, i) => {
      const angle = i * angleStep - Math.PI / 2; // yukarıdan başla
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    });

    return points.join(" ");
  }

  return (
    <div style={{ position: "absolute", width: "150px", height: "150px" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon points={getPolygonPointsFullSize(sides)} fill="#81c784" />
      </svg>
    </div>
  );
};

export default PolygonComponent;
