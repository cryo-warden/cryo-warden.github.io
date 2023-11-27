import { Fluent } from "general/Object";
import { FluentVector, Vector } from "./Vector";

export type Rect = {
  readonly center: Vector;
  readonly width: number;
  readonly height: number;
};

export class FluentRect
  implements
    Rect,
    Fluent<
      Rect,
      FluentRect,
      {
        area: number;
        containsVector: boolean;
        nearLatticeVectors: Iterable<Vector>;
        touches: boolean;
      }
    >
{
  center: FluentVector;
  width: number;
  height: number;

  constructor(r: Rect) {
    this.center = new Vector.Fluent(r.center);
    this.width = r.width;
    this.height = r.height;
  }

  value() {
    return {
      center: this.center.value(),
      width: this.width,
      height: this.height,
    };
  }

  clone() {
    return new FluentRect(this);
  }

  area() {
    return this.width * this.height;
  }

  containsVector(v: Vector) {
    return (
      Math.abs(this.center.x - v.x) * 2 <= this.width &&
      Math.abs(this.center.y - v.y) * 2 <= this.height
    );
  }

  translate(v: Vector) {
    this.center.add(v);
    return this;
  }

  translateX(dx: number) {
    this.center.translateX(dx);
    return this;
  }

  translateY(dy: number) {
    this.center.translateY(dy);
    return this;
  }

  addWidth(dWidth: number) {
    this.width += dWidth;
    return this;
  }

  addHeight(dHeight: number) {
    this.height += dHeight;
    return this;
  }

  touches(r: Rect) {
    return (
      Math.abs(this.center.x - r.center.x) * 2 <= this.width + r.width &&
      Math.abs(this.center.y - r.center.y) * 2 <= this.height + r.height
    );
  }

  /** Using a lattice defined by `resolution`, rooted at (0,0), returns all the Vectors on that lattice which share a grid cell with this `FluentCircle`. */
  nearLatticeVectors(resolution: number): Vector[] {
    if (resolution !== Math.round(resolution)) {
      throw new Error("`resolution` MUST be an integer.");
    }

    if (resolution < 1) {
      throw new Error("`resolution` MUST be at least 1.");
    }

    const results: Vector[] = [];

    const enclosingRect = this.clone()
      .addWidth(resolution * 2)
      .addHeight(resolution * 2);
    const scanDownVector = enclosingRect.center.clone();
    scanDownVector
      .translateX(-enclosingRect.width / 2)
      .translateY(-enclosingRect.height / 2)
      .translateX(-(scanDownVector.x % resolution))
      .translateY(-(scanDownVector.y % resolution))
      .round();
    while (enclosingRect.containsVector(scanDownVector)) {
      const scanRightVector = scanDownVector.clone();
      while (enclosingRect.containsVector(scanRightVector)) {
        results.push(scanRightVector.value());
        scanRightVector.translateX(resolution);
      }
      scanDownVector.translateY(resolution);
    }

    return results;
  }
}

const create = (center: Vector, width: number, height: number) => ({
  center,
  width,
  height,
});

const area = (r: Rect) => r.width * r.height;

const containsVector = (r: Rect, v: Vector) =>
  Math.abs(r.center.x - v.x) * 2 <= r.width &&
  Math.abs(r.center.y - v.y) * 2 <= r.height;

const touches = (a: Rect, b: Rect): boolean => new FluentRect(a).touches(b);

export const Rect = {
  create,
  area,
  containsVector,
  touches,
};
