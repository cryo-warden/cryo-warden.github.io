import { Fluent } from "general/Object";

export type Vector = {
  readonly x: number;
  readonly y: number;
};

export class FluentVector
  implements
    Vector,
    Fluent<
      Vector,
      FluentVector,
      {
        dotMultiply: number;
        magnitude: number;
        squaredMagnitude: number;
        isNear: boolean;
      }
    >
{
  x: number;
  y: number;

  constructor(v: Vector) {
    this.x = v.x;
    this.y = v.y;
  }

  value(): Vector {
    return {
      x: this.x,
      y: this.y,
    };
  }

  clone() {
    return new FluentVector(this);
  }

  add(v: Vector) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  translateX(dx: number) {
    this.x += dx;
    return this;
  }

  translateY(dy: number) {
    this.y += dy;
    return this;
  }

  subtract(v: Vector) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  scale(s: number) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  inverseScale(s: number) {
    this.x /= s;
    this.y /= s;
    return this;
  }

  /** For rotations, multiply vectors as imaginary numbers. */
  multiply(v: Vector) {
    this.x = this.x * v.x - this.y * v.y;
    this.y = this.y * v.x + this.x * v.y;
    return this;
  }

  dotMultiply(v: Vector) {
    return this.x * v.x + this.y * v.y;
  }

  squaredMagnitude() {
    return this.x * this.x + this.y * this.y;
  }

  magnitude() {
    return Math.hypot(this.x, this.y);
  }

  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }

  isNear(v: Vector, radius: number) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx * dx + dy * dy <= radius * radius;
  }

  unit() {
    const magnitude = this.magnitude();
    this.x /= magnitude;
    this.y /= magnitude;
    return this;
  }
}

const create = (x: number, y: number): Vector => ({ x, y });

const add = (a: Vector, b: Vector) => create(a.x + b.x, a.y + b.y);

const subtract = (a: Vector, b: Vector) => create(a.x - b.x, a.y - b.y);

const scale = (a: Vector, b: number) => create(a.x * b, a.y * b);

const inverseScale = (a: Vector, b: number) => create(a.x / b, a.y / b);

/** For rotations, multiply vectors as imaginary numbers. */
const multiply = (a: Vector, b: Vector) =>
  create(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);

const magnitude = (a: Vector) => Math.hypot(a.x, a.y);

const round = (a: Vector) => create(Math.round(a.x), Math.round(a.y));

const areNear = (a: Vector, b: Vector, radius: number) =>
  Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) < radius * radius;

/** Obtain the magnitude-1 vector with the same direction as the input. */
const unit = (a: Vector) => inverseScale(a, Math.hypot(a.x, a.y));

export const Vector = {
  Fluent: FluentVector,
  create,
  add,
  subtract,
  scale,
  inverseScale,
  multiply,
  magnitude,
  round,
  areNear,
  unit,
};
