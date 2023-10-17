import { System } from "GameEngine/System/System";
import { EntityQuery } from "GameEngine/EntityQuery";
import { UpdateNamedArguments } from "GameEngine/Update";
import { Actor } from "../Component/Actor";
import { Greeting } from "../Component/Greeting";

export class ConversationSystem extends System {
  query = {
    greeters: new EntityQuery<{ actor: Actor; greeting: Greeting }>([
      "actor",
      "greeting",
    ]),
  };
  update(dt: number, { time }: UpdateNamedArguments) {
    this.query.greeters.forEach((greeter) => {
      const { actor, greeting } = greeter.components;

      if (greeting.messageIndex >= greeting.messages.length) return;

      if (!greeting.isInitialized) {
        greeting.lastMessageTime = time;
        greeting.isInitialized = true;
        return;
      }

      if (time > greeting.lastMessageTime + greeting.delayMS) {
        actor.action = {
          type: "speak",
          message: greeting.messages[greeting.messageIndex],
        };
        greeting.messageIndex += 1;
        greeting.lastMessageTime = time;
      }
    });
  }
}
