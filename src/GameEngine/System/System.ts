import { IEntityQuery } from "GameEngine/EntityQuery";

export abstract class System {
  abstract query: Record<string, IEntityQuery>;
  abstract update(deltaTime: number): void;
  isActive: boolean = true;
}
