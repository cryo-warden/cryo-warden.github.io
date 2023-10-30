import { expect } from "@jest/globals";
import { Vector, FluentCircle, Circle } from "./Geometry";

describe("Vector", () => {
  const a = Vector.create(2, 0);
  const b = Vector.create(3, 5);
  const c = Vector.create(0, 7);

  it("creates Vectors", () => {
    expect(a).toEqual({ x: 2, y: 0 });
    expect(b).toEqual({ x: 3, y: 5 });
    expect(c).toEqual({ x: 0, y: 7 });
  });

  it("adds Vectors", () => {
    expect(Vector.add(a, b)).toEqual({ x: 5, y: 5 });
    expect(Vector.add(a, c)).toEqual({ x: 2, y: 7 });
    expect(Vector.add(b, c)).toEqual({ x: 3, y: 12 });
  });

  it("subtracts Vectors", () => {
    expect(Vector.subtract(a, b)).toEqual({ x: -1, y: -5 });
    expect(Vector.subtract(a, c)).toEqual({ x: 2, y: -7 });
    expect(Vector.subtract(b, c)).toEqual({ x: 3, y: -2 });
  });

  it("scales Vectors", () => {
    expect(Vector.scale(a, 11)).toEqual({ x: 22, y: 0 });
    expect(Vector.scale(b, 13)).toEqual({ x: 39, y: 65 });
    expect(Vector.scale(c, 17)).toEqual({ x: 0, y: 119 });
  });

  it("inverse-scales Vectors", () => {
    expect(Vector.inverseScale(a, 11)).toEqual({
      x: expect.closeTo(2 / 11, 5),
      y: 0,
    });
    expect(Vector.inverseScale(b, 13)).toEqual({
      x: expect.closeTo(3 / 13, 5),
      y: 5 / 13,
    });
    expect(Vector.inverseScale(c, 17)).toEqual({
      x: 0,
      y: expect.closeTo(7 / 17, 5),
    });
  });

  it("multiplies Vectors", () => {
    expect(Vector.multiply(a, b)).toEqual({ x: 6, y: 10 });
    expect(Vector.multiply(a, c)).toEqual({ x: 0, y: 14 });
    expect(Vector.multiply(b, c)).toEqual({ x: -35, y: 21 });
  });

  it("computes magnitude of Vectors", () => {
    expect(Vector.magnitude(a)).toBeCloseTo(2, 5);
    expect(Vector.magnitude(b)).toBeCloseTo(Math.sqrt(34), 5);
    expect(Vector.magnitude(c)).toBeCloseTo(7, 5);
  });

  it("computes unit Vectors", () => {
    expect(Vector.unit(a)).toEqual({ x: 1, y: 0 });
    expect(Vector.unit(b)).toEqual({
      x: expect.closeTo(3 / Math.sqrt(34), 5),
      y: expect.closeTo(5 / Math.sqrt(34), 5),
    });
    expect(Vector.unit(c)).toEqual({ x: 0, y: 1 });
  });
});

describe("FluentCircle", () => {
  it("computes nearby lattice points", () => {
    const c = new FluentCircle(Circle.create(Vector.create(0, 50), 400));
    const latticeVectors = Array.from(c.nearLatticeVectors(200));
    expect(latticeVectors.length).toEqual(26);
  });
});
