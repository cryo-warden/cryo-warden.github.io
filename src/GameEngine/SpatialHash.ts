import { Circle, Vector } from "general/Geometry/Geometry";

// WIP Implement matrix nested in high-granularity dictionary.

class LatticeMap<T> {
  private grid: T[][][] = [];

  get(v: Vector): T[] {
    const mappedX = v.x < 0 ? -2 * v.x + 1 : 2 * v.x;
    const mappedY = v.y < 0 ? -2 * v.y + 1 : 2 * v.y;
    return this.grid[mappedX]?.[mappedY] ?? [];
  }

  set(v: Vector, value: T): void {
    const mappedX = v.x < 0 ? -2 * v.x + 1 : 2 * v.x;
    const mappedY = v.y < 0 ? -2 * v.y + 1 : 2 * v.y;
    // TODO Check performance of setting length vs pushing vs pre-allocating array size.
    if (this.grid.length < mappedX) {
      this.grid.length = mappedX + 1;
    }
    if (this.grid[mappedX] == null) {
      this.grid[mappedX] = new Array(mappedY + 1);
    }
    if (this.grid[mappedX].length < mappedY) {
      this.grid[mappedX].length = mappedY + 1;
    }
    if (this.grid[mappedX][mappedY] == null) {
      this.grid[mappedX][mappedY] = [];
    }
    this.grid[mappedX][mappedY].push(value);
  }
}

export class SpatialHash<T> {
  private resolution: number;
  private latticeMap: LatticeMap<[Circle, T]> = new LatticeMap();

  constructor(resolution: number) {
    this.resolution = resolution;
  }

  get(c: Circle): T[] {
    const results: Set<T> = new Set();
    const latticeVectors = Circle.nearLatticeVectors(c, this.resolution);
    for (let i = 0; i < latticeVectors.length; ++i) {
      const tuples = this.latticeMap.get(latticeVectors[i]);
      for (let j = 0; j < tuples.length; ++j) {
        const [circle, value] = tuples[j];
        if (!results.has(value) && Circle.touches(circle, c)) {
          results.add(value);
        }
      }
    }
    return Array.from(results);
  }

  set(c: Circle, value: T) {
    const latticeVectors = Circle.nearLatticeVectors(c, this.resolution);
    for (let i = 0; i < latticeVectors.length; ++i) {
      this.latticeMap.set(latticeVectors[i], [c, value]);
    }
  }
}
