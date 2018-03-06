export const withinBounds = (point: Coords, p1: Coords, p2: Coords) => {
  const { x: startX, y: startY } = p1;
  const { x: endX, y: endY } = p2;
  const { x, y } = point;
  const inXRange = (x >= startX && x <= endX) || (x >= endX && x <= startX);
  const inYRange = (y >= startY && y <= endY) || (y >= endY && y <= startY);
  return inXRange && inYRange;
};

export const sameCoord = (p1: Coords, p2: Coords) =>
  p1.x === p2.x && p1.y === p2.y;
