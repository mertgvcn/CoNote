export const getTransform = (x: number, y: number, rotation: number = 0) =>
  `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
