import { System } from "./System";
import { AI } from "GameEngine/Component/AI";
import { Actor } from "GameEngine/Component/Actor";
import { EntityQuery } from "GameEngine/EntityQuery";

export class AISystem extends System {
  query = {
    aiActors: new EntityQuery<{ ai: AI; actor: Actor }>(["ai", "actor"]),
  };
  update(dt: number): void {
    // WIP
  }
}
