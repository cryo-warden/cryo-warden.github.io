import { System } from "./System";
import { Actor } from "GameEngine/Component/Actor";
import { Player } from "GameEngine/Component/Player";
import { EntityQuery } from "GameEngine/EntityQuery";
import { InputEvent, OutputEvent } from "GameEngine/EventSystem";
import { Publish, Subscription, SubscribeAll } from "general/EventSystem";

type PlayerSystemConfiguration = {
  publishEvent: Publish<OutputEvent>;
  subscribeAction: SubscribeAll<InputEvent>;
};

/**
 * TODO: PlayerSystem and the Player Component would normally be defined externally, not as part of the GameEngine library code. However, this project is still pre-MVP. Get it working, then refactor and reorganize.
 */
export class PlayerSystem extends System {
  constructor({ publishEvent, subscribeAction }: PlayerSystemConfiguration) {
    super();
    this.publishEvent = publishEvent;
    this.actionSubscription = subscribeAction((event) => {
      this.handleInput(event);
    });
  }

  query = {
    players: new EntityQuery<{ player: Player; actor: Actor }>([
      "player",
      "actor",
    ]),
  };
  update(dt: number): void {
    // WIP
  }

  private handleInput(event: InputEvent) {
    this.query.players.forEach((player) => {
      player.components.actor.action = event;
    });
  }

  private actionSubscription: Subscription;
  private publishEvent: Publish<OutputEvent>;
}
