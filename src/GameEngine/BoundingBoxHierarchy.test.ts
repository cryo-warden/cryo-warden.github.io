import { SimpleIterator } from "general/SimpleIterator";
import { BoundingBoxHierarchy } from "./BoundingBoxHierarchy";
import { BoundingBox } from "./BoundingBox";

const { create, touches } = BoundingBox;

const getBruteValidator =
  (h: BoundingBoxHierarchy<number>, boxes: (BoundingBox | null)[]) =>
  (box: BoundingBox): void => {
    const hSet = SimpleIterator.toSet(h.getTouchedValueIterator(box));

    const bruteSet = new Set(
      boxes
        .map((b, i): [number, BoundingBox | null] => [i, b])
        .filter(([_, b]) => {
          return b && touches(box, b);
        })
        .map(([i]) => i)
    );

    // console.log(hSet, bruteSet);

    expect(hSet).toEqual(bruteSet);
  };

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
      create(25, 25, 75, 150),
      create(50, 25, 200, 250),
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

    const validateAgainstBruteForce = getBruteValidator(h, boxes);

    boxes.forEach(validateAgainstBruteForce);

    const testBoxes = [
      create(0, 0, 0, 0),
      create(-10000, -10000, 10000, 10000),
      create(100, 100, 125, 125),
      create(0, -2000, 25, 2000),
    ];

    testBoxes.forEach(validateAgainstBruteForce);

    expect(h.depth).toBeLessThanOrEqual(boxes.length);

    const removalIdSet = new Set([4, 5]);
    const removedBoxes = boxes.map((b, i) => (removalIdSet.has(i) ? null : b));

    const validateRemovalAgainstBruteForce = getBruteValidator(h, removedBoxes);

    Array.from(removalIdSet).forEach((id) => {
      h.remove(id);
    });

    testBoxes.forEach(validateRemovalAgainstBruteForce);
  });
});
