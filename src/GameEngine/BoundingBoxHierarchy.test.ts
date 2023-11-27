import { SimpleIterator } from "general/SimpleIterator";
import { BoundingBoxHierarchy } from "./BoundingBoxHierarchy";
import { BoundingBox } from "./BoundingBox";

const { create, touches } = BoundingBox;

describe("BoundingBoxHierarchy", () => {
  it("detects overlaps", () => {
    const h = new BoundingBoxHierarchy<number>();
    const boxes = [
      create(-25, -25, 25, 25),
      create(-50, -25, 0, 25),
      create(0, 50, 100, 100),
      create(-100, -100, -75, -75),
      create(175, 175, 200, 200),
      create(100, 100, 125, 125),
    ];
    boxes.forEach((box, index) => {
      h.insert(box, index);
    });
    // h.log();

    expect(
      SimpleIterator.toSet(
        h.getTouchedValueIterator(
          create(-Infinity, -Infinity, Infinity, Infinity)
        )
      )
    ).toEqual(new Set(boxes.map((_, i) => i)));

    const validateAgainstBruteForce = (box: BoundingBox): void => {
      const hSet = SimpleIterator.toSet(h.getTouchedValueIterator(box));

      const bruteSet = new Set(
        boxes
          .map((b, i): [number, BoundingBox] => [i, b])
          .filter(([_, b]) => {
            return touches(b, box);
          })
          .map(([i]) => i)
      );

      // console.log(hSet, bruteSet);

      expect(hSet).toEqual(bruteSet);
    };

    boxes.forEach(validateAgainstBruteForce);

    const testBoxes = [
      create(0, 0, 0, 0),
      create(-10000, -10000, 10000, 10000),
      create(100, 100, 125, 125),
      create(0, -2000, 25, 2000),
    ];

    testBoxes.forEach(validateAgainstBruteForce);
  });
});
