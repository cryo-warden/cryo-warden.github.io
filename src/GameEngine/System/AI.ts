import { System } from "./System";
import { AI } from "GameEngine/Component/AI";
import { Actor } from "GameEngine/Component/Actor";

const componentNames = ["ai", "actor"] as const;

export class PlayerSystem extends System<
  { ai: AI; actor: Actor },
  typeof componentNames
> {
  componentNames = componentNames;
  update(dt: number): void {
    // WIP
  }
}
