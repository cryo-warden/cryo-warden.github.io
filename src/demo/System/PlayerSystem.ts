import { System } from "GameEngine/System/System";
import { EntityQuery } from "GameEngine/EntityQuery";
import { Actor } from "../Component/Actor";
import { Observable } from "../Component/Observable";
import { Input } from "../Component/Input";
import { Output } from "../Component/Output";
import { Player } from "../Component/Player";

export type PlayerArchetype = {
  observable: Observable;
  actor: Actor;
  input: Input;
  output: Output;
  player: Player;
};

export class PlayerSystem extends System {
  query = {
    players: new EntityQuery<PlayerArchetype>([
      "actor",
      "observable",
      "input",
      "output",
      "player",
    ]),
  };
  update() {
    this.query.players.forEach((player) => {
      if (player.components.player.selfEntityId == null) {
        player.components.player.selfEntityId = player.id;
        player.components.output.events.push({
          type: "observeSelf",
          entityView: {
            id: player.id,
            name: player.components.observable.name,
            description: player.components.observable.description,
            interactions: [], // WIP
          },
        });
      }
      player.components.input.events.forEach((event) => {
        player.components.actor.action = event;
      });
      player.components.input.events = [];
    });
  }
}
