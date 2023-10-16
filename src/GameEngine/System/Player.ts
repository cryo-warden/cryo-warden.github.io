import { System } from "./System";
import { Actor } from "GameEngine/Component/Actor";
import { Player } from "GameEngine/Component/Player";
import { EntityQuery } from "GameEngine/EntityQuery";

export class PlayerSystem extends System {
  query = {
    players: new EntityQuery<{ player: Player; actor: Actor }>([
      "player",
      "actor",
    ]),
  };
  update(dt: number): void {
    // WIP
  }
}
