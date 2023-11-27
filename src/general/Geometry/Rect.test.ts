import { expect } from "@jest/globals";
import { Vector } from "./Vector";
import { FluentRect, Rect } from "./Rect";

describe("FluentRect", () => {
  it("computes nearby lattice points", () => {
    const r = new FluentRect(Rect.create(Vector.create(0, 50), 400, 400));
    const latticeVectors = Array.from(r.nearLatticeVectors(100));
    expect(latticeVectors.length).toEqual(42); // WIP
  });
});
