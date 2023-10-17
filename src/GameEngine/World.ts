import { Queue } from "general/Array";
import { Component } from "./Component/Component";
import {
  Entity,
  EntityId,
  WorldEntity,
  createEntityIdFactory,
  createWorldEntities,
} from "./Entity";
import { IEntityQuery } from "./EntityQuery";
import { System } from "./System/System";
import { UpdateNamedArguments } from "./Update";

export class World {
  addSystem(system: System) {
    this.systems.push(system);
    Object.values(system.query).forEach((query) => {
      this.queries.add(query);
      this.worldEntityMap.forEach((worldEntity) => {
        query.submitEntity(worldEntity);
      });
    });
  }

  addEntity(parentId: EntityId | null, entity: Entity): void {
    this.entityInsertionQueue.push({ parentId, entity });
  }
  removeEntity(entityId: EntityId): void {
    this.entityRemovalQueue.push(entityId);
  }
  // WIP Make Component changes also queued. IMPORTANT to keep Systems more predictable.
  addComponent(id: EntityId, componentName: string, component: Component) {
    const worldEntity = this.worldEntityMap.get(id);

    if (worldEntity == null) return;

    worldEntity.components[componentName] = component;

    this.submitWorldEntityToQueries(worldEntity);
  }
  removeComponent(id: EntityId, componentName: string) {
    const worldEntity = this.worldEntityMap.get(id);

    if (worldEntity == null) return;

    this.removeWorldEntityFromQueries(worldEntity);

    delete worldEntity.components[componentName];

    this.submitWorldEntityToQueries(worldEntity);
  }

  update(deltaTime: number, namedArguments: UpdateNamedArguments) {
    while (this.entityRemovalQueue.length > 0) {
      const entityIdToRemove = this.entityRemovalQueue.shift();
      if (entityIdToRemove != null) {
        this.removeWorldEntity(entityIdToRemove);
      }
    }

    while (this.entityInsertionQueue.length > 0) {
      const entityInsertion = this.entityInsertionQueue.shift();
      if (entityInsertion != null) {
        const { parentId, entity } = entityInsertion;
        this.addWorldEntity(parentId, entity);
      }
    }

    for (let i = 0; i < this.systems.length; ++i) {
      const system = this.systems[i];
      if (system.isActive) {
        system.update(deltaTime, namedArguments);
      }
    }
  }

  private queries: Set<IEntityQuery> = new Set();
  private systems: System[] = [];
  private entityInsertionQueue: Queue<{
    parentId: EntityId | null;
    entity: Entity;
  }> = [];
  private entityRemovalQueue: Queue<EntityId> = [];
  private entityIdFactory = createEntityIdFactory();
  private worldEntityMap: Map<EntityId, WorldEntity> = new Map();

  private submitWorldEntityToQueries(worldEntity: WorldEntity) {
    this.queries.forEach((query) => query.submitEntity(worldEntity));
  }
  private removeWorldEntityFromQueries(worldEntity: WorldEntity) {
    this.queries.forEach((query) => query.revokeEntity(worldEntity));
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
      this.submitWorldEntityToQueries(worldEntities[i]);
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

    this.removeWorldEntityFromQueries(worldEntity);

    this.worldEntityMap.delete(id);
  }
}
