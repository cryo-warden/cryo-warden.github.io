import { IEntityQuery } from "GameEngine/EntityQuery";

export abstract class System {
  abstract query: Record<string, IEntityQuery>;
  isActive: boolean = true;
  abstract update(deltaTime: number): void;
}
