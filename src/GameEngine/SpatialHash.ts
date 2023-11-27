import { Circle } from "general/Geometry/Geometry";
import { LatticeMultiMap } from "./LatticeMap";

export class SpatialHash<T> {
  private resolution: number;
  private latticeMultiMap: LatticeMultiMap<[Circle, T]>;

  constructor(resolution: number) {
    this.resolution = resolution;
    this.latticeMultiMap = new LatticeMultiMap<[Circle, T]>(this.resolution);
  }

  get(c: Circle): T[] {
    const results: Set<T> = new Set();
    const latticeVectors = Circle.nearLatticeVectors(c, this.resolution);
    for (let i = 0; i < latticeVectors.length; ++i) {
      const tuples = this.latticeMultiMap.get(latticeVectors[i]);
      if (tuples == null) {
        continue;
      }
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
      this.latticeMultiMap.set(latticeVectors[i], [c, value]);
    }
  }
}
