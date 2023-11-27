import { expect } from "@jest/globals";
import { Vector, FluentCircle, Circle } from "./Geometry";

describe("FluentCircle", () => {
  it("computes nearby lattice points", () => {
    const c = new FluentCircle(Circle.create(Vector.create(0, 50), 400));
    const latticeVectors = Array.from(c.nearLatticeVectors(200));
    expect(latticeVectors.length).toEqual(26);
  });
});
