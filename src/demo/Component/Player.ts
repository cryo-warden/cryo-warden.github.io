import { EntityId } from "GameEngine/Entity";

export type Player = {
  observedEntities: EntityId[]; // WIP Factor observation logic into am Observer component.
};

const entityObservationMap: WeakMap<Player, Set<EntityId>> = new WeakMap();

export const observeEntity = (player: Player, entityId: EntityId): void => {
  if (!entityObservationMap.has(player)) {
    entityObservationMap.set(player, new Set(player.observedEntities));
  }
  const observationSet = entityObservationMap.get(player);
  if (observationSet == null) return;

  if (observationSet.has(entityId)) return;

  player.observedEntities.push(entityId);
  observationSet.add(entityId);
};

export const isObservingEntity = (
  player: Player,
  entityId: EntityId
): boolean => {
  const observationSet = entityObservationMap.get(player);
  if (observationSet == null) {
    return false;
  }

  return observationSet.has(entityId);
};
