import { Fluent } from "general/Object";
import { FluentVector, Vector } from "./Vector";

export type Circle = {
  readonly center: Vector;
  readonly radius: number;
};

export class FluentCircle
  implements
    Circle,
    Fluent<
      Circle,
      FluentCircle,
      {
        area: number;
        containsVector: boolean;
        nearLatticeVectors: Iterable<Vector>;
      }
    >
{
  center: FluentVector;
  radius: number;

  constructor(c: Circle) {
    this.center = new Vector.Fluent(c.center);
    this.radius = c.radius;
  }

  value() {
    return {
      center: this.center.value(),
      radius: this.radius,
    };
  }

  clone() {
    return new FluentCircle(this);
  }

  area() {
    return this.radius * this.radius;
  }

  containsVector(v: Vector) {
    return this.center.isNear(v, this.radius);
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

  addRadius(dRadius: number) {
    this.radius += dRadius;
    return this;
  }

  /** Using a lattice defined by `resolution`, rooted at (0,0), returns all the Vectors on that lattice which share a grid cell with this `FluentCircle`. */
  *nearLatticeVectors(resolution: number): Iterable<Vector> {
    // MUST immediately `this.clone()` and never reference `this` again, because a generator shouldn't depend on a mutable instance available outside the scope of this function.
    if (resolution !== Math.round(resolution)) {
      throw new Error("`resolution` MUST be an integer.");
    }

    if (resolution < 1) {
      throw new Error("`resolution` MUST be at least 1.");
    }

    const enclosingCircle = this.clone().addRadius(resolution);
    const latticeVector = enclosingCircle.center.clone();
    latticeVector
      .translateX(enclosingCircle.radius)
      .translateX(-(latticeVector.x % resolution))
      .translateY(-(latticeVector.y % resolution))
      .round();
    while (!enclosingCircle.containsVector(latticeVector)) {
      latticeVector.translateX(-resolution);
    }
    while (enclosingCircle.containsVector(latticeVector)) {
      const scanUpVector = latticeVector.clone();
      while (enclosingCircle.containsVector(scanUpVector)) {
        yield scanUpVector.value();
        scanUpVector.translateY(resolution);
      }
      const scanDownVector = latticeVector.clone().translateY(-resolution);
      while (enclosingCircle.containsVector(scanDownVector)) {
        yield scanDownVector.value();
        scanDownVector.translateY(-resolution);
      }
      latticeVector.translateX(-resolution);
    }
  }
}

const create = (center: Vector, radius: number) => ({ center, radius });

const area = (c: Circle) => Math.PI * c.radius * c.radius;

const containsVector = (c: Circle, v: Vector) =>
  Vector.areNear(c.center, v, c.radius);

const nearLatticeVectors = function (
  c: Circle,
  resolution: number
): Iterable<Vector> {
  return new FluentCircle(c).nearLatticeVectors(resolution);
};

export const Circle = {
  create,
  area,
  containsVector,
  nearLatticeVectors,
};
