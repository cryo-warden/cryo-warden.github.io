import { System } from "GameEngine/System/System";
import { EntityQuery } from "GameEngine/EntityQuery";
import { AI } from "../Component/AI";
import { Actor } from "../Component/Actor";

export class AISystem extends System {
  query = {
    aiActors: new EntityQuery<{ ai: AI; actor: Actor }>(["ai", "actor"]),
  };
  update(dt: number) {
    // WIP
  }
}
