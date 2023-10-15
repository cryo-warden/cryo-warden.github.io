// WIP Split into modules. Writing a bunch of code in here just to get things running.
import { Vector } from "general/Vector";
import { Component, MoverComponent, TransformComponent } from "./Component";
import { Archetype, ComponentNames } from "./Archetype";
import { deepClone } from "general/Object";
import { Entity, EntityId, SystemEntity, WorldEntity } from "./Entity";
import { System } from "./System";

export type EntityComponentMap<TComponent extends Component> = Map<
  EntityId,
  TComponent
>;

interface ComponentRegistry<TArchetype extends Archetype> {
  has(name: keyof TArchetype): boolean;
  get<TComponentName extends keyof TArchetype>(
    name: TComponentName
  ): EntityComponentMap<TArchetype[TComponentName]>;
  set<TComponentName extends keyof TArchetype>(
    name: TComponentName,
    entityComponentMap: EntityComponentMap<TArchetype[TComponentName]>
  ): void;
  delete(name: keyof TArchetype): void;
}

class WorldState<TArchetype extends Archetype> {
  private nextEntityId: EntityId = 0;
  private entitySet: Set<EntityId> = new Set();
  private componentRegistry: ComponentRegistry<TArchetype> = new Map();
  entities: WorldEntity<TArchetype>[] = [];

  addComponent<TComponentName extends keyof TArchetype>(
    id: EntityId,
    name: TComponentName,
    component: TArchetype[TComponentName]
  ) {
    if (!this.componentRegistry.has(name)) {
      this.componentRegistry.set(name, new Map());
    }
    const map = this.componentRegistry.get(name);
    map.set(id, component);
  }

  addEntity(entity: Entity<TArchetype>): void {
    if (entity == null) {
      return;
    }
    const id = this.nextEntityId++;
    const worldEntity: WorldEntity<TArchetype> = {
      id,
      components: deepClone(entity.components),
    };
    this.entities.push(worldEntity);
    this.entitySet.add(id);
    const { components } = entity; // WIP Scan children too
    for (let name in components) {
      const component = components[name];
      if (component != null) {
        this.addComponent(id, name, component);
      }
    }
  }
  removeEntity(id: EntityId): void {
    if (id == null) {
      return;
    }
    this.entitySet.delete(id);
    // WIP Remove components from registry.
  }
}

export class World<TArchetype extends Archetype> {
  private systems: System<TArchetype, ComponentNames<TArchetype>>[] = [];
  private entityInsertionQueue: Entity<TArchetype>[] = [];
  private worldEntityRemovalQueue: EntityId[] = [];
  private state = new WorldState<TArchetype>();

  addSystem(system: System<TArchetype, ComponentNames<TArchetype>>) {
    // Add resources (such as event pubsub and library data)
    this.systems.push(system);
    // system.submitEntities(); // WIP
  }

  addEntity(entity: Entity<TArchetype>): void {
    this.entityInsertionQueue.push(entity);
  }
  removeEntity(worldEntityId: EntityId): void {
    this.worldEntityRemovalQueue.push(worldEntityId);
  }

  update(deltaTime: number): void {
    for (let i = 0; i < this.systems.length; ++i) {
      const system = this.systems[i];
      if (system.isActive) {
        system.update(deltaTime);
      }
    }

    while (this.worldEntityRemovalQueue.length > 0) {
      const entityIdToRemove = this.worldEntityRemovalQueue.pop();
      if (entityIdToRemove != null) {
        this.state.removeEntity(entityIdToRemove);
      }
    }

    while (this.entityInsertionQueue.length > 0) {
      const entityToAdd = this.entityInsertionQueue.pop();
      if (entityToAdd != null) {
        this.state.addEntity(entityToAdd);
      }
    }
  }
}

type MockArchetype = {
  transform: TransformComponent;
  mover: MoverComponent;
};

const mockEntity: Entity<MockArchetype> = {
  // WIP
  components: {
    transform: {
      position: Vector.create(3, 4),
    },
  },
  children: [
    {
      components: {
        transform: {
          position: Vector.create(0, -1),
        },
      },
    },
    {
      components: {
        transform: {
          position: Vector.create(0, 1),
        },
      },
    },
  ],
};

const movementSystemComponentNames = ["transform", "mover"] as const;

export class MovementSystem extends System<
  { transform: TransformComponent; mover: MoverComponent },
  typeof movementSystemComponentNames
> {
  componentNames = movementSystemComponentNames;
  update(dt: number): void {
    this.entities;
  }
}

export const mockWorld = new World();
mockWorld.addSystem(new MovementSystem());
mockWorld.addEntity(mockEntity);
