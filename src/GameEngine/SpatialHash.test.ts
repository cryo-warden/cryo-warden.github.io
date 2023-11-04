import { Circle } from "general/Geometry/Circle";
import { SpatialHash } from "./SpatialHash";
import { Vector } from "general/Geometry/Vector";

describe("SpatialHash", () => {
  it("detects overlaps", () => {
    const s = new SpatialHash<string>(1);
    const a = Circle.create(Vector.create(0, 0), 5);
    const b = Circle.create(Vector.create(0, 0), 2);
    const c = Circle.create(Vector.create(5, 0), 2);
    const d = Circle.create(Vector.create(0, 5), 2);
    const e = Circle.create(Vector.create(-5, 0), 2);
    const f = Circle.create(Vector.create(0, -5), 2);
    s.set(a, "a");
    s.set(b, "b");
    s.set(c, "c");
    s.set(d, "d");
    s.set(e, "e");
    s.set(f, "f");
    expect(new Set(s.get(a))).toEqual(new Set(["a", "b", "c", "d", "e", "f"]));
    expect(new Set(s.get(b))).toEqual(new Set(["a", "b"]));
    expect(new Set(s.get(c))).toEqual(new Set(["a", "c"]));
    expect(new Set(s.get(d))).toEqual(new Set(["a", "d"]));
    expect(new Set(s.get(e))).toEqual(new Set(["a", "e"]));
    expect(new Set(s.get(f))).toEqual(new Set(["a", "f"]));
  });
});
