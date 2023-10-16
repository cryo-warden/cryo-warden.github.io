import { IArchetype, ComponentNames, satisfiesArchetype } from "./Archetype";
import { SystemEntity, WorldEntity } from "./Entity";

export interface IEntityQuery {
  submitEntity(entity: WorldEntity): void;
  revokeEntity(entity: WorldEntity): void;
}

export class EntityQuery<TArchetype extends IArchetype> {
  componentNames: ComponentNames<TArchetype>;

  constructor(componentNames: ComponentNames<TArchetype>) {
    this.componentNames = componentNames;
  }

  private entities: Set<SystemEntity<TArchetype>> = new Set();

  forEach(fn: (entity: SystemEntity<TArchetype>) => void) {
    this.entities.forEach(fn);
  }

  submitEntity(entity: WorldEntity) {
    if (this.entitySatisfiesQuery(entity)) {
      this.entities.add(entity);
    }
  }

  revokeEntity(entity: SystemEntity<TArchetype>) {
    this.entities.delete(entity);
  }

  private entitySatisfiesQuery(
    entity: WorldEntity
  ): entity is SystemEntity<TArchetype> {
    return satisfiesArchetype<TArchetype>(
      entity.components,
      this.componentNames
    );
  }
}
