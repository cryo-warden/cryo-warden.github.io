import { Vector } from "general/Vector";
import { Subscribe } from "general/EventSystem";
import { EngineEvent, createEngineEventSystem } from "./EventSystem";
import { World } from "./World";
import { MovementSystem } from "./System/Movement";

type EngineAction = {
  type: "speak";
  content: string;
};

export type Engine = {
  subscribe: Subscribe<EngineEvent>;
  executeAction: (action: EngineAction) => void;
  // setWorld(world:World): void;
};

export const createEngine: () => Engine = () => {
  const eventSystem = createEngineEventSystem();
  let world: World = new World();
  world.addSystem(new MovementSystem());
  world.addEntity(null, {
    components: {
      transform: {
        position: Vector.create(0, 0),
      },
      motion: { velocity: Vector.create(0, 0) },
      actor: {},
      player: {},
    },
  });
  world.addEntity(null, {
    components: {
      transform: {
        position: Vector.create(2, -2),
      },
      motion: { velocity: Vector.create(0, 0) },
      actor: {},
      ai: {},
    },
  });
  world.update(1);

  return {
    subscribe: (type, listener) => eventSystem.subscribe(type, listener),
    executeAction: (action) => {
      // WIP create Action Queue as a Resource, and consume that queue in PlayerSystem
      // This sets the action in an ActorComponent, which is handled by the ActionSystem.
      // The reason for this separation is for an AISystem to also control ActorComponents.
      if (action.type === "speak") {
        eventSystem.publish({
          type: "logMessage",
          message: action.content,
        });
      }
    },
  };
};
