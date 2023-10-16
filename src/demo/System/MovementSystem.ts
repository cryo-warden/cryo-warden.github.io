import { System } from "GameEngine/System/System";
import { Transform } from "GameEngine/Component/Transform";
import { EntityQuery } from "GameEngine/EntityQuery";
import { Vector } from "general/Vector";
import { Motion } from "../Component/Motion";

export class MovementSystem extends System {
  query = {
    movingEntities: new EntityQuery<{ transform: Transform; motion: Motion }>([
      "transform",
      "motion",
    ]),
  };
  update(dt: number) {
    this.query.movingEntities.forEach((entity) => {
      const { transform, motion } = entity.components;
      transform.position = Vector.add(
        transform.position,
        Vector.scale(motion.velocity, dt)
      );
    });
  }
}
