import { deepClone } from "general/Object";
import { IArchetype } from "./Archetype";

export type Entity = {
  components: IArchetype;
  children?: Entity[];
};

export type EntityId = number;

export type EntityIdFactory = {
  next(): number;
};

export const createEntityIdFactory = (): EntityIdFactory => {
  let nextId: EntityId = 0;
  return {
    next: () => nextId++,
  };
};

export type WorldEntity = {
  // add global transform
  parent: WorldEntity | null;
  id: EntityId;
  components: IArchetype;
  children?: WorldEntity[];
};

const accumulateWorldEntities = (
  accumulator: WorldEntity[],
  parent: WorldEntity | null,
  idFactory: EntityIdFactory,
  entity: Entity
): WorldEntity => {
  const worldEntity: WorldEntity = {
    parent,
    id: idFactory.next(),
    components: deepClone(entity.components),
  };

  accumulator.push(worldEntity);

  if (entity.children == null) {
    return worldEntity;
  }

  worldEntity.children = [];
  for (let i = 0; i < entity.children.length; ++i) {
    worldEntity.children.push(
      accumulateWorldEntities(
        accumulator,
        worldEntity,
        idFactory,
        entity.children[i]
      )
    );
  }

  return worldEntity;
};

export const createWorldEntities = (
  parent: WorldEntity["parent"],
  idFactory: EntityIdFactory,
  entity: Entity
): WorldEntity[] => {
  const accumulator: WorldEntity[] = [];

  accumulateWorldEntities(accumulator, parent, idFactory, entity);

  return accumulator;
};

export const revertWorldEntity = (worldEntity: WorldEntity): Entity => {
  return {
    components: deepClone(worldEntity.components),
    children: worldEntity.children?.map(revertWorldEntity),
  };
};

export type SystemEntity<TArchetype extends IArchetype> = WorldEntity & {
  components: TArchetype;
};
