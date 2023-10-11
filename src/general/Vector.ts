export interface Vector {
  readonly x: number;
  readonly y: number;
}

const create = (x: number, y: number): Vector => ({ x, y });

const add = (a: Vector, b: Vector) => create(a.x + b.x, a.y + b.y);

const subtract = (a: Vector, b: Vector) => create(a.x - b.x, a.y - b.y);

const scale = (a: Vector, b: number) => create(a.x * b, a.y * b);

const inverseScale = (a: Vector, b: number) => create(a.x / b, a.y / b);

/** For rotations, multiply vectors as imaginary numbers. */
const multiply = (a: Vector, b: Vector) => create(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);

const magnitude = (a: Vector) => Math.hypot(a.x, a.y);

/** Obtain the magnitude-1 vector with the same direction as the input. */
const unit = (a: Vector) => inverseScale(a, Math.hypot(a.x, a.y));

export const Vector = {
  create,
  add,
  subtract,
  scale,
  inverseScale,
  multiply,
  magnitude,
  unit,
}
