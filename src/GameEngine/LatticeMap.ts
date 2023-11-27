import { Vector } from "general/Geometry/Geometry";
import { SimpleMap } from "general/Map";

export class LatticeMap<T> implements SimpleMap<Vector, T> {
  private rows: T[][] = [];
  private resolution: number;

  constructor(resolution: number) {
    this.resolution = resolution;
  }

  get(key: Vector): T {
    const mappedX = this.mapCoordinate(key.x);
    const mappedY = this.mapCoordinate(key.y);
    return this.rows[mappedY]?.[mappedX];
  }

  has(key: Vector): boolean {
    return this.get(key) !== void 0;
  }

  set(key: Vector, value: T): this {
    const mappedX = this.mapCoordinate(key.x);
    const mappedY = this.mapCoordinate(key.y);
    // TODO Check performance of setting length vs pushing vs pre-allocating array size.
    if (this.rows[mappedY] == null) {
      this.rows[mappedY] = new Array(mappedX + 1);
    }

    this.rows[mappedY][mappedX] = value;

    return this;
  }

  private mapCoordinate(n: number): number {
    return Math.round((n < 0 ? -2 * n + 1 : 2 * n) / this.resolution);
  }
}

export class VectorMap<T> implements SimpleMap<Vector, T> {
  private cellMapMap: Map<Vector["x"], Map<Vector["y"], T>> = new Map();
  private resolution: number;

  constructor(resolution: number) {
    this.resolution = resolution;
  }

  get(key: Vector): T | undefined {
    const mappedX = this.mapCoordinate(key.x);
    const mappedY = this.mapCoordinate(key.y);
    return this.cellMapMap.get(mappedY)?.get(mappedX);
  }

  has(key: Vector): boolean {
    return this.get(key) !== void 0;
  }

  set(key: Vector, value: T): this {
    const mappedX = this.mapCoordinate(key.x);
    const mappedY = this.mapCoordinate(key.y);
    // TODO Check performance of setting length vs pushing vs pre-allocating array size.
    if (!this.cellMapMap.has(mappedY)) {
      this.cellMapMap.set(mappedY, new Map());
    }

    this.cellMapMap.get(mappedY)?.set(mappedX, value);

    return this;
  }

  private mapCoordinate(n: number): number {
    return Math.round(n / this.resolution);
  }
}

export class LatticeMultiMap<T> {
  private latticeMap: SimpleMap<Vector, T[]>;

  constructor(resolution: number) {
    this.latticeMap = new VectorMap<T[]>(resolution);
  }

  get(key: Vector): T[] | undefined {
    return this.latticeMap.get(key);
  }

  set(key: Vector, value: T): void {
    if (!this.has(key)) {
      this.latticeMap.set(key, []);
    }

    this.latticeMap.get(key)?.push(value);
  }

  has(key: Vector): boolean {
    return this.latticeMap.has(key);
  }
}
