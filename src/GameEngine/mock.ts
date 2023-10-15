// WIP Split into modules. Writing a bunch of code in here just to get things running.
import { Vector } from "general/Vector";
import { MoverComponent, TransformComponent } from "./Component";
import { Entity, revertWorldEntity } from "./Entity";
import { System } from "./System";
import { World } from "./World";

const mockEntity: Entity = {
  // WIP
  components: {
    transform: {
      position: Vector.create(3, 4),
    },
    mover: {
      velocity: Vector.create(1, 0),
    },
  },
  children: [
    {
      components: {
        transform: {
          position: Vector.create(0, -1),
        },
        mover: {
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

export class EmptySystem extends System<{}, []> {
  componentNames: [] = [];
  update(dt: number): void {
    console.log(
      JSON.stringify(Array.from(this.entities).map(revertWorldEntity), null, 2)
    );
  }
}

const movementSystemComponentNames = ["transform", "mover"] as const;

export class MovementSystem extends System<
  { transform: TransformComponent; mover: MoverComponent },
  typeof movementSystemComponentNames
> {
  componentNames = movementSystemComponentNames;
  update(dt: number): void {
    console.log(this.entities);
    // this.entities[0]?.components.transform.position;
  }
}

export const mockWorld = new World();

mockWorld.addSystem(new MovementSystem());
mockWorld.addEntity(null, mockEntity);
mockWorld.update(1);

mockWorld.addSystem(new EmptySystem());
mockWorld.update(1);
