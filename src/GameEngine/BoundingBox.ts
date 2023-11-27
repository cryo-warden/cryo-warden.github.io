const { min, max } = Math;

export type BoundingBox = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

const area = (box: BoundingBox): number => {
  return (box.right - box.left) * (box.bottom - box.top);
};

const create = (
  left: number,
  top: number,
  right: number,
  bottom: number
): BoundingBox => {
  return { left, top, right, bottom };
};

const merge = (a: BoundingBox, b: BoundingBox): BoundingBox => {
  return {
    left: min(a.left, b.left),
    top: min(a.top, b.top),
    right: max(a.right, b.right),
    bottom: max(a.bottom, b.bottom),
  };
};

const touches = (a: BoundingBox, b: BoundingBox): boolean => {
  return (
    a.left <= b.right &&
    a.right >= b.left &&
    a.top <= b.bottom &&
    a.bottom >= b.top
  );
};

export const BoundingBox = {
  create,
  area,
  merge,
  touches,
};
