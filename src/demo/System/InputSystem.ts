import { System } from "GameEngine/System/System";
import { createEventSystem } from "general/EventSystem";
import { EntityQuery } from "GameEngine/EntityQuery";
import { InputEvent } from "../InputEvent";
import { Input } from "../Component/Input";

export class InputSystem extends System {
  private eventSystem = createEventSystem<InputEvent>();
  private actionSubscription = this.eventSystem.subscribeAll((event) => {
    this.handleInput(event);
  });

  query = {
    inputs: new EntityQuery<{ input: Input }>(["input"]),
  };

  update() {
    this.eventSystem.flushPublications();
  }

  dispose() {
    this.actionSubscription.cancel();
    this.eventSystem.dispose();
  }

  publishInput = this.eventSystem.publish;

  private handleInput(event: InputEvent) {
    this.query.inputs.forEach((input) => {
      input.components.input.events.push(event);
    });
  }
}
