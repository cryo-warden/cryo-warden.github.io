import { IArchetype, ComponentNames, satisfiesArchetype } from "../Archetype";
import { SystemEntity, WorldEntity } from "../Entity";

export interface ISystem {
  isActive: boolean;
  update(deltaTime: number): void;
  submitEntity(entity: WorldEntity): void;
  revokeEntity(entity: WorldEntity): void;
}

export abstract class System<
  TArchetype extends IArchetype,
  TComponentNames extends ComponentNames<TArchetype>,
> implements ISystem
{
  abstract componentNames: TComponentNames;
  abstract update(deltaTime: number): void;

  isActive: boolean = true;

  protected entities: Set<SystemEntity<TArchetype>> = new Set();

  submitEntity(entity: WorldEntity) {
    if (this.entitySatisfiesSystem(entity)) {
      this.entities.add(entity);
    }
  }

  revokeEntity(entity: SystemEntity<TArchetype>) {
    this.entities.delete(entity);
  }

  private entitySatisfiesSystem(
    entity: WorldEntity
  ): entity is SystemEntity<TArchetype> {
    return satisfiesArchetype<TArchetype, TComponentNames>(
      entity.components,
      this.componentNames
    );
  }
}
