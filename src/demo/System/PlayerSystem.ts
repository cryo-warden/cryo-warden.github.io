import { System } from "GameEngine/System/System";
import { EntityQuery } from "GameEngine/EntityQuery";
import { Actor } from "../Component/Actor";
import { Appearance } from "../Component/Appearance";
import { Input } from "../Component/Input";
import { Output } from "../Component/Output";
import { Player, isObservingEntity, observeEntity } from "../Component/Player";

export class PlayerSystem extends System {
  query = {
    players: new EntityQuery<{
      actor: Actor;
      input: Input;
      output: Output;
      player: Player;
    }>(["actor", "input", "output", "player"]),
    viewable: new EntityQuery<{
      appearance: Appearance;
    }>(["appearance"]),
  };
  update() {
    this.query.players.forEach((player) => {
      player.components.input.events.forEach((event) => {
        player.components.actor.action = event;
      });
      player.components.input.events = [];
      this.query.viewable.forEach((viewable) => {
        if (isObservingEntity(player.components.player, viewable.id)) return;

        observeEntity(player.components.player, viewable.id);
        // WIP Factor observations into a separate component
        // WIP Filter by distance, and sensory+environmental configurations.
        player.components.output.events.push({
          type: "gainEntityView",
          entityView: {
            id: viewable.id,
            name: viewable.components.appearance.name,
            description: viewable.components.appearance.description,
          },
        });
      });
    });
  }
}
