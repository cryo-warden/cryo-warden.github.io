import { System } from "./System";
import { Motion } from "GameEngine/Component/Motion";
import { Actor } from "GameEngine/Component/Actor";
import { EntityQuery } from "GameEngine/EntityQuery";
import { Action } from "GameEngine/EventSystem";

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
      // WIP Allow some actions even if not every Actor Entity has every other affected component. While this could potentially be done by using separate queries for each meaningful combination of Components, spend some time thinking about whether a superior approach is possible, such as creating a Partial option for EntityQuery (which actually might... just work anyway).
      switch (action.type) {
        case "move":
          motion.velocity = action.direction; // WIP Parameterize speed and ensure that the direction is coerced to a unit Vector, or at least has square magnitude less than 1.
          break;
        case "speak":
          console.log(action.message); // WIP Create an entity with an Audible component in this location? That's probably simpler than having a whole AudioSpace component that we also query here.
          break;
      }
      actor.action = Action.none;
    });
  }
}
