import { Archetype } from "./Archetype";

export type Entity<TArchetype extends Archetype> = {
  components: Partial<TArchetype>;
  children?: Entity<TArchetype>[];
};

export type EntityId = number;

export interface WorldEntity<TArchetype extends Archetype> {
  id: EntityId;
  components: Partial<TArchetype>;
  // WIP parent and children
}

export interface SystemEntity<TArchetype extends Archetype> {
  id: EntityId;
  components: TArchetype;
  // WIP parent and children
}
