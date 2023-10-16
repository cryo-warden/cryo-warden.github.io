import { System } from "./System";
import { Motion } from "GameEngine/Component/Motion";
import { Actor } from "GameEngine/Component/Actor";
import { EntityQuery } from "GameEngine/EntityQuery";

export class ActionSystem extends System {
  query = {
    actors: new EntityQuery<{ actor: Actor; motion: Motion }>([
      "actor",
      "motion",
    ]),
  };
  update(dt: number): void {
    this.query.actors.forEach((entity) => {
      const { actor, motion } = entity.components;
      const { action } = actor;
      // WIP Implement other actions.
      switch (action.type) {
        case "move":
          motion.velocity = action.direction;
      }
    });
  }
}
