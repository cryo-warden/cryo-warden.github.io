import { System } from "./System";
import { Motion } from "GameEngine/Component/Motion";
import { Actor } from "GameEngine/Component/Actor";

const componentNames = ["actor", "motion"] as const;

export class ActionSystem extends System<
  { actor: Actor; motion: Motion },
  typeof componentNames
> {
  componentNames = componentNames;
  update(dt: number): void {
    this.entities.forEach((entity) => {
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
