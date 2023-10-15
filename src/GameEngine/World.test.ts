import { Vector } from "general/Vector";
import { Entity } from "./Entity";
import { System } from "./System/System";
import { World } from "./World";
import { MovementSystem } from "./System/Movement";
import { ComponentNames, IArchetype } from "./Archetype";

type MutableToken = { updateCount: number; lastEntityCount: number };

abstract class BaseTestSystem<T extends IArchetype> extends System<
  T,
  ComponentNames<T>
> {
  mutableToken: MutableToken;

  constructor(mutableToken: MutableToken) {
    super();
    this.mutableToken = mutableToken;
  }

  update(dt: number): void {
    this.mutableToken.updateCount += 1;
    this.mutableToken.lastEntityCount = this.entities.size;
  }
}

class EmptyTestSystem extends BaseTestSystem<{}> {
  componentNames: [] = [];
}

const mockEntity: Entity = {
  components: {
    transform: {
      position: Vector.create(3, 4),
    },
    motion: {
      velocity: Vector.create(1, 0),
    },
  },
  children: [
    {
      components: {
        transform: {
          position: Vector.create(0, -1),
        },
        motion: {
          velocity: Vector.create(1, 0),
        },
      },
    },
    {
      components: {
        transform: {
          position: Vector.create(0, 1),
        },
      },
    },
  ],
};

describe("World", () => {
  it("can add systems and run updates", () => {
    const mutableToken: MutableToken = { lastEntityCount: 0, updateCount: 0 };

    const mockWorld = new World();
    mockWorld.addSystem(new EmptyTestSystem(mutableToken));
    mockWorld.addSystem(new MovementSystem());
    mockWorld.addEntity(null, mockEntity);

    mockWorld.update(1);

    expect(mutableToken.lastEntityCount).toEqual(3);
    expect(mutableToken.updateCount).toEqual(1);

    mockWorld.update(1);

    expect(mutableToken.lastEntityCount).toEqual(3);
    expect(mutableToken.updateCount).toEqual(2);
  });

  // WIP Add tests for adding/removing Entities and Components.
});
