import { System } from "./System";
import { Actor } from "GameEngine/Component/Actor";
import { Player } from "GameEngine/Component/Player";

const componentNames = ["player", "actor"] as const;

export class PlayerSystem extends System<
  { player: Player; actor: Actor },
  typeof componentNames
> {
  componentNames = componentNames;
  update(dt: number): void {
    // WIP
  }
}
