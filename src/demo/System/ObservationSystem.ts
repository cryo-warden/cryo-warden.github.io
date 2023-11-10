import { System } from "GameEngine/System/System";
import { EntityQuery } from "GameEngine/EntityQuery";
import { Observable } from "../Component/Observable";
import { Observer } from "../Component/Observer";
import { Output } from "../Component/Output";
import { EntityId } from "GameEngine/Entity";
import { Transform } from "GameEngine/Component/Transform";
import { Vector } from "general/Geometry/Geometry";

const entityObservationMap: WeakMap<Observer, Set<EntityId>> = new WeakMap();

export const observeEntity = (observer: Observer, entityId: EntityId): void => {
  if (!entityObservationMap.has(observer)) {
    entityObservationMap.set(observer, new Set(observer.observedEntities));
  }
  const observationSet = entityObservationMap.get(observer);
  if (observationSet == null) return;

  if (observationSet.has(entityId)) return;

  observer.observedEntities.push(entityId);
  observationSet.add(entityId);
};

export const isObservingEntity = (
  observer: Observer,
  entityId: EntityId
): boolean => {
  const observationSet = entityObservationMap.get(observer);
  if (observationSet == null) {
    return false;
  }

  return observationSet.has(entityId);
};

export type ObserverArchetype = {
  observer: Observer;
  output: Output;
  transform: Transform;
};

export class ObservationSystem extends System {
  query = {
    observers: new EntityQuery<ObserverArchetype>([
      "observer",
      "output",
      "transform",
    ]),
    observables: new EntityQuery<{
      observable: Observable;
      transform: Transform;
    }>(["observable", "transform"]),
  };
  update() {
    // WIP Filter by distance, and sensory+environmental configurations.
    this.query.observers.forEach((observer) => {
      this.query.observables.forEach((observable) => {
        if (isObservingEntity(observer.components.observer, observable.id))
          return;

        observeEntity(observer.components.observer, observable.id);
        observer.components.output.events.push({
          type: "observeEntity",
          entityView: {
            id: observable.id,
            name: observable.components.observable.name,
            description: observable.components.observable.description,
            interactions: [
              {
                label: "Approach",
                action: {
                  type: "move",
                  direction: Vector.subtract(
                    observable.components.transform.position,
                    observer.components.transform.position
                  ),
                },
              },
            ],
          },
        });
      });
    });
  }
}
