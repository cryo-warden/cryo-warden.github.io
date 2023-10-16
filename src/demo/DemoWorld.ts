import { Vector } from "general/Vector";
import { World } from "GameEngine/World";
import { Action } from "./InputEvent";
import { MovementSystem } from "./System/MovementSystem";
import { PlayerSystem } from "./System/PlayerSystem";
import { ActionSystem } from "./System/ActionSystem";
import { InputSystem } from "./System/InputSystem";
import { OutputSystem } from "./System/OutputSystem";

export type DemoWorldContainer = {
  world: World;
  executeAction: InputSystem["publishInput"];
  subscribe: OutputSystem["subscribe"];
  dispose: () => void;
};

export const createDemoWorldContainer: () => DemoWorldContainer = () => {
  const inputSystem = new InputSystem();
  const outputSystem = new OutputSystem();

  const world: World = new World();

  world.addSystem(inputSystem);

  world.addSystem(new PlayerSystem());

  world.addSystem(new ActionSystem());

  world.addSystem(new MovementSystem());

  world.addSystem(outputSystem);

  world.addEntity(null, {
    components: {
      transform: {
        position: Vector.create(0, 0),
      },
      motion: { velocity: Vector.create(0, 0) },
      input: { events: [] },
      output: { events: [] },
      actor: { action: Action.none },
      player: true,
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

  return {
    world,
    executeAction: inputSystem.publishInput,
    subscribe: outputSystem.subscribe,
    dispose: () => {
      inputSystem.dispose();
      outputSystem.dispose();
    },
  };
};
