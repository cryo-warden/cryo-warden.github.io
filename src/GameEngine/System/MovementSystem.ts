import { Vector } from "general/Vector";
import { System } from "./System";
import { Transform } from "GameEngine/Component/Transform";
import { Motion } from "GameEngine/Component/Motion";
import { EntityQuery } from "GameEngine/EntityQuery";

export class MovementSystem extends System {
  query = {
    movingEntities: new EntityQuery<{ transform: Transform; motion: Motion }>([
      "transform",
      "motion",
    ]),
  };
  update(dt: number): void {
    this.query.movingEntities.forEach((entity) => {
      const { transform, motion } = entity.components;
      transform.position = Vector.add(
        transform.position,
        Vector.scale(motion.velocity, dt)
      );
    });
  }
}
