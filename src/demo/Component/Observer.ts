import { EntityId } from "GameEngine/Entity";

export type Observer = {
  observedEntities: EntityId[]; // WIP Don't allow EntityId inside component data. It breaks deserialization.
};
