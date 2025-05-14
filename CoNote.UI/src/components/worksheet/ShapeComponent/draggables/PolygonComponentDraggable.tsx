import React from "react";

const PolygonComponentDraggable = () => {
  const getHexagonPoints = (
    sides: number = 6,
    boxSize: number = 100
  ): string => {
    const center = boxSize / 2;
    const radius = center;
    const angleStep = (2 * Math.PI) / sides;

    return Array.from({ length: sides }, (_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
  };

  return (
    <svg
      width="150px"
      height="150px"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polygon points={getHexagonPoints()} fill="#81c784" />
    </svg>
  );
};

export default PolygonComponentDraggable;
