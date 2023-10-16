import { System } from "GameEngine/System/System";
import { EntityQuery } from "GameEngine/EntityQuery";
import { Actor } from "../Component/Actor";
import { Input } from "../Component/Input";
import { Player } from "../Component/Player";

export class PlayerSystem extends System {
  query = {
    players: new EntityQuery<{
      actor: Actor;
      input: Input;
      player: Player;
    }>(["actor", "input", "player"]),
  };
  update() {
    this.query.players.forEach((player) => {
      player.components.input.events.forEach((event) => {
        player.components.actor.action = event;
      });
      player.components.input.events = [];
    });
  }
}
