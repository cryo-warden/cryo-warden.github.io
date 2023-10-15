import { Archetype, ComponentNames, satisfiesArchetype } from "./Archetype";
import { SystemEntity, WorldEntity } from "./Entity";

export abstract class System<
  TArchetype extends Archetype,
  TComponentNames extends ComponentNames<TArchetype>,
> {
  abstract componentNames: TComponentNames;
  abstract update(deltaTime: number): void;

  isActive: boolean = true;

  protected entities: SystemEntity<TArchetype>[] = [];

  submitEntity(entity: WorldEntity<TArchetype>) {
    if (this.entitySatisfiesSystem(entity)) {
      this.entities.push(entity);
    }
  }

  submitEntities(entities: WorldEntity<TArchetype>[]) {
    for (let i = 0; i < entities.length; ++i) {
      this.submitEntity(entities[i]);
    }
  }

  private entitySatisfiesSystem(
    entity: WorldEntity<TArchetype>
  ): entity is SystemEntity<TArchetype> {
    return satisfiesArchetype<TArchetype, TComponentNames>(
      entity.components,
      this.componentNames
    );
  }
}
