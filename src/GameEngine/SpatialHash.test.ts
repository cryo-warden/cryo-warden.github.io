import { Circle } from "general/Geometry/Circle";
import { SpatialHash } from "./SpatialHash";
import { Vector } from "general/Geometry/Vector";

describe("SpatialHash", () => {
  it("detects overlaps", () => {
    console.timeLog("start");
    for (let i = 0; i < 1; ++i) {
      const s = new SpatialHash<string>(1);
      const a = Circle.create(Vector.create(100, 0), 50);
      const b = Circle.create(Vector.create(100, 0), 20);
      const c = Circle.create(Vector.create(150, 0), 20);
      const d = Circle.create(Vector.create(100, 50), 20);
      const e = Circle.create(Vector.create(50, 0), 20);
      const f = Circle.create(Vector.create(100, -50), 20);
      const g = Circle.create(Vector.create(10000, -50000), 20);
      const h = Circle.create(Vector.create(-10000, -50000), 20);
      const i = Circle.create(Vector.create(10000, 50000), 20);
      const j = Circle.create(Vector.create(-10000, 50000), 20);
      s.set(a, "a");
      s.set(b, "b");
      s.set(c, "c");
      s.set(d, "d");
      s.set(e, "e");
      s.set(f, "f");
      s.set(g, "g");
      s.set(h, "h");
      s.set(i, "i");
      s.set(j, "j");
      expect(new Set(s.get(a))).toEqual(
        new Set(["a", "b", "c", "d", "e", "f"])
      );
      expect(new Set(s.get(b))).toEqual(new Set(["a", "b"]));
      expect(new Set(s.get(c))).toEqual(new Set(["a", "c"]));
      expect(new Set(s.get(d))).toEqual(new Set(["a", "d"]));
      expect(new Set(s.get(e))).toEqual(new Set(["a", "e"]));
      expect(new Set(s.get(f))).toEqual(new Set(["a", "f"]));
    }
    console.timeLog("end");
  });
});
