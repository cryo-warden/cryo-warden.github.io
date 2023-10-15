import {
  Entity,
  EntityId,
  WorldEntity,
  createEntityIdFactory,
  createWorldEntities,
} from "./Entity";
import { ISystem } from "./System";

export class World {
  private systems: ISystem[] = [];
  private entityInsertionQueue: Entity[] = [];
  private entityRemovalQueue: EntityId[] = [];

  addSystem(system: ISystem) {
    // Add resources (such as event pubsub and library data)
    this.systems.push(system);
    system.submitEntities(Array.from(this.worldEntityMap.values()));
  }

  addEntity(entity: Entity): void {
    this.entityInsertionQueue.push(entity);
  }
  removeEntity(entityId: EntityId): void {
    this.entityRemovalQueue.push(entityId);
  }

  update(deltaTime: number): void {
    while (this.entityRemovalQueue.length > 0) {
      const entityIdToRemove = this.entityRemovalQueue.pop();
      if (entityIdToRemove != null) {
        this.removeWorldEntity(entityIdToRemove);
      }
    }

    while (this.entityInsertionQueue.length > 0) {
      const entityToAdd = this.entityInsertionQueue.pop();
      if (entityToAdd != null) {
        this.addWorldEntity(entityToAdd);
      }
    }

    for (let i = 0; i < this.systems.length; ++i) {
      const system = this.systems[i];
      if (system.isActive) {
        system.update(deltaTime);
      }
    }
  }

  private entityIdFactory = createEntityIdFactory();
  private worldEntityMap: Map<EntityId, WorldEntity> = new Map();

  private submitWorldEntitiesToSystems(worldEntities: WorldEntity[]) {
    for (let i = 0; i < this.systems.length; ++i) {
      this.systems[i].submitEntities(worldEntities);
    }
  }

  private addWorldEntity(entity: Entity) {
    const worldEntities = createWorldEntities(
      null,
      this.entityIdFactory,
      entity
    );
    for (let i = 0; i < worldEntities.length; ++i) {
      this.worldEntityMap.set(worldEntities[i].id, worldEntities[i]);
    }
    this.submitWorldEntitiesToSystems(worldEntities);
  }

  private removeWorldEntity(id: EntityId) {
    const worldEntity = this.worldEntityMap.get(id);
    if (worldEntity == null) {
      return;
    }

    for (let i = 0; i < this.systems.length; ++i) {
      this.systems[i].revokeEntity(worldEntity);
    }

    this.worldEntityMap.delete(id);

    if (worldEntity.children == null) return;
    for (let i = 0; i < worldEntity.children.length; ++i) {
      this.removeWorldEntity(worldEntity.children[i].id);
    }
  }
}
