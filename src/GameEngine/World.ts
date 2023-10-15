import { Component } from "./Component/Component";
import {
  Entity,
  EntityId,
  WorldEntity,
  createEntityIdFactory,
  createWorldEntities,
} from "./Entity";
import { ISystem } from "./System/System";

export class World {
  addSystem(system: ISystem) {
    // WIP Add resources (such as event pubsub and library data)
    this.systems.push(system);
    this.worldEntityMap.forEach((worldEntity) => {
      system.submitEntity(worldEntity);
    });
  }

  addEntity(parentId: EntityId | null, entity: Entity): void {
    this.entityInsertionQueue.push({ parentId, entity });
  }
  removeEntity(entityId: EntityId): void {
    this.entityRemovalQueue.push(entityId);
  }
  // WIP Make Component changes also queued. IMPORTANT to keep Systems more predictable.
  addComponent(
    id: EntityId,
    componentName: string,
    component: Component
  ): void {
    const worldEntity = this.worldEntityMap.get(id);

    if (worldEntity == null) return;

    worldEntity.components[componentName] = component;

    this.submitWorldEntityToSystems(worldEntity);
  }
  removeComponent(id: EntityId, componentName: string): void {
    const worldEntity = this.worldEntityMap.get(id);

    if (worldEntity == null) return;

    this.removeWorldEntityFromSystems(worldEntity);

    delete worldEntity.components[componentName];

    this.submitWorldEntityToSystems(worldEntity);
  }

  update(deltaTime: number): void {
    while (this.entityRemovalQueue.length > 0) {
      const entityIdToRemove = this.entityRemovalQueue.pop();
      if (entityIdToRemove != null) {
        this.removeWorldEntity(entityIdToRemove);
      }
    }

    while (this.entityInsertionQueue.length > 0) {
      const entityInsertion = this.entityInsertionQueue.pop();
      if (entityInsertion != null) {
        const { parentId, entity } = entityInsertion;
        this.addWorldEntity(parentId, entity);
      }
    }

    for (let i = 0; i < this.systems.length; ++i) {
      const system = this.systems[i];
      if (system.isActive) {
        system.update(deltaTime);
      }
    }
  }

  private systems: ISystem[] = [];
  private entityInsertionQueue: {
    parentId: EntityId | null;
    entity: Entity;
  }[] = [];
  private entityRemovalQueue: EntityId[] = [];
  private entityIdFactory = createEntityIdFactory();
  private worldEntityMap: Map<EntityId, WorldEntity> = new Map();

  private submitWorldEntityToSystems(worldEntity: WorldEntity) {
    for (let i = 0; i < this.systems.length; ++i) {
      this.systems[i].submitEntity(worldEntity);
    }
  }
  private removeWorldEntityFromSystems(worldEntity: WorldEntity) {
    for (let i = 0; i < this.systems.length; ++i) {
      this.systems[i].revokeEntity(worldEntity);
    }
  }

  private addWorldEntity(parentId: EntityId | null, entity: Entity) {
    const parent =
      parentId == null ? null : this.worldEntityMap.get(parentId) ?? null;

    const worldEntities = createWorldEntities(
      parent,
      this.entityIdFactory,
      entity
    );
    for (let i = 0; i < worldEntities.length; ++i) {
      this.worldEntityMap.set(worldEntities[i].id, worldEntities[i]);
      this.submitWorldEntityToSystems(worldEntities[i]);
    }
  }

  private removeWorldEntity(id: EntityId) {
    const worldEntity = this.worldEntityMap.get(id);

    if (worldEntity == null) return;

    if (worldEntity.children != null) {
      for (let i = 0; i < worldEntity.children.length; ++i) {
        this.removeWorldEntity(worldEntity.children[i].id);
      }
    }

    for (let i = 0; i < this.systems.length; ++i) {
      this.systems[i].revokeEntity(worldEntity);
    }

    this.worldEntityMap.delete(id);
  }
}
