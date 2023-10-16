import { Vector } from "general/Vector";
import { Subscribe } from "general/EventSystem";
import {
  Action,
  InputEvent,
  OutputEvent,
  createInputEventSystem,
  createOutputEventSystem,
} from "./EventSystem";
import { World } from "./World";
import { MovementSystem } from "./System/MovementSystem";
import { PlayerSystem } from "./System/PlayerSystem";
import { ActionSystem } from "./System/ActionSystem";

export type Engine = {
  readonly subscribe: Subscribe<OutputEvent>;
  readonly executeAction: (action: InputEvent) => void;
  // readonly setWorld(world:World): void; // WIP Construct World OUTSIDE of GameEngine.
  readonly start: () => void;
  readonly stop: () => void;
  readonly dispose: () => void;
};

export const createEngine: () => Engine = () => {
  let isActive = false;

  // WIP !!! Create and dispose these EventSystems, System instances, and the World outside of the engine!
  const inputEventSystem = createInputEventSystem();
  const outputEventSystem = createOutputEventSystem();

  let world: World = new World();
  world.addSystem(new MovementSystem());
  world.addSystem(
    new PlayerSystem({
      publishEvent: (event) => outputEventSystem.publish(event),
      subscribeAction: (listener) => inputEventSystem.subscribeAll(listener),
    })
  );
  world.addSystem(new ActionSystem());
  world.addEntity(null, {
    components: {
      transform: {
        position: Vector.create(0, 0),
      },
      motion: { velocity: Vector.create(0, 0) },
      actor: { action: Action.none },
      player: {},
    },
  });
  world.addEntity(null, {
    components: {
      transform: {
        position: Vector.create(2, -2),
      },
      motion: { velocity: Vector.create(0, 0) },
      actor: { action: Action.none },
      ai: {},
    },
  });

  let lastTime = 0;
  const update = (time: number) => {
    if (!isActive) return;

    inputEventSystem.flushPublications();
    world.update(time - lastTime);
    outputEventSystem.flushPublications();
    lastTime = time;

    requestAnimationFrame(update);
  };

  return {
    executeAction: (action) => inputEventSystem.publish(action),
    subscribe: (type, listener) => outputEventSystem.subscribe(type, listener),
    start: () => {
      isActive = true;
      requestAnimationFrame((time) => {
        lastTime = time;
        requestAnimationFrame(update);
      });
    },
    stop: () => {
      isActive = false;
    },
    dispose: () => {
      isActive = false;
      inputEventSystem.dispose();
      outputEventSystem.dispose();
    },
  };
};
