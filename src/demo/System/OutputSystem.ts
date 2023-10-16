import { createEventSystem } from "general/EventSystem";
import { System } from "GameEngine/System/System";
import { EntityQuery } from "GameEngine/EntityQuery";
import { Output } from "../Component/Output";
import { OutputEvent } from "../OutputEvent";

export class OutputSystem extends System {
  private eventSystem = createEventSystem<OutputEvent>();

  query = {
    outputs: new EntityQuery<{ output: Output }>(["output"]),
  };

  update() {
    this.query.outputs.forEach((output) => {
      output.components.output.events.forEach((event) => {
        this.eventSystem.publish(event);
      });
      output.components.output.events = [];
    });
    this.eventSystem.flushPublications();
  }

  dispose() {
    this.eventSystem.dispose();
  }

  subscribe = this.eventSystem.subscribe;
}
