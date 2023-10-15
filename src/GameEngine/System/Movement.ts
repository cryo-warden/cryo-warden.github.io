import { Vector } from "general/Vector";
import { System } from "./System";
import { Transform } from "GameEngine/Component/Transform";
import { Motion } from "GameEngine/Component/Motion";

const componentNames = ["transform", "motion"] as const;

export class MovementSystem extends System<
  { transform: Transform; motion: Motion },
  typeof componentNames
> {
  componentNames = componentNames;
  update(dt: number): void {
    this.entities.forEach((entity) => {
      const { transform, motion } = entity.components;
      transform.position = Vector.add(
        transform.position,
        Vector.scale(motion.velocity, dt)
      );
    });
  }
}
