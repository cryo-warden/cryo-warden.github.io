import { EntityQuery } from "GameEngine/EntityQuery";
import { System } from "GameEngine/System/System";
import { Actor } from "../Component/Actor";
import { Motion } from "../Component/Motion";
import { Output } from "../Component/Output";
import { Action } from "../InputEvent";
import { Vector } from "general/Vector";

export class ActionSystem extends System {
  query = {
    actors: new EntityQuery<{ actor: Actor; motion: Motion }>([
      "actor",
      "motion",
    ]),
    outputs: new EntityQuery<{ output: Output }>(["output"]),
  };
  update(dt: number) {
    this.query.actors.forEach((entity) => {
      const { actor, motion } = entity.components;
      const { action } = actor;
      // WIP Implement other actions.
      // WIP Allow some actions even if not every Actor Entity has every other affected component. While this could potentially be done by using separate queries for each meaningful combination of Components, spend some time thinking about whether a superior approach is possible, such as creating a Partial option for EntityQuery (which actually might... just work anyway).
      switch (action.type) {
        case "move":
          motion.velocity = Vector.scale(
            Vector.unit(action.direction),
            actor.speed
          );
          break;
        case "speak":
          this.query.outputs.forEach((output) => {
            // WIP Create an entity with an Audible component in this Entity's location? That's probably simpler than having a whole AudioSpace component that we also query here.
            output.components.output.events.push({
              type: "logMessage",
              message: action.message,
            });
          });
          break;
      }
      actor.action = Action.none;
    });
  }
}
