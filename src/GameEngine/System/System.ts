import { IEntityQuery } from "GameEngine/EntityQuery";
import { UpdateNamedArguments } from "GameEngine/Update";

export abstract class System {
  abstract query: Record<string, IEntityQuery>;
  abstract update(
    deltaTime: number,
    namedArguments: UpdateNamedArguments
  ): void;
  isActive: boolean = true;
}
