import { Vector } from "general/Vector";
import { World } from "GameEngine/World";
import { Action } from "./InputEvent";
import { MovementSystem } from "./System/MovementSystem";
import { PlayerSystem } from "./System/PlayerSystem";
import { ActionSystem } from "./System/ActionSystem";
import { InputSystem } from "./System/InputSystem";
import { OutputSystem } from "./System/OutputSystem";
import { Entity } from "GameEngine/Entity";
import { ConversationSystem } from "./System/ConversationSystem";

export type DemoWorldContainer = {
  world: World;
  executeAction: InputSystem["publishInput"];
  subscribe: OutputSystem["subscribe"];
  dispose: () => void;
};

const demoPlayer: Entity = {
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
};

const greeter: Entity = {
  components: {
    transform: {
      position: Vector.create(2, -2),
    },
    motion: { velocity: Vector.create(0, 0) },
    greeting: {
      isInitialized: false,
      messageIndex: 0,
      messages: [
        ["Welcome!"],
        [
          "This is an in-progress demo of a text-based RPG system, controllable via point-and-click.",
        ],
        ["Games in this genre have a notorious reputation."],
        [
          "Players have to memorize a broad variety of commands to get anything done.",
        ],
        [
          "My goal here is to make all the possibilities smoothly discoverable.",
        ],
        [
          "You can check out the custom ECS engine and in-progress demo on ",
          {
            text: "Github",
            url: "https://github.com/cryo-warden/cryo-warden.github.io",
          },
          ".",
        ],
      ],
      lastMessageTime: 0,
      delayMS: 2000,
    },
    actor: { action: Action.none },
    ai: {},
  },
};

export const createDemoWorldContainer: () => DemoWorldContainer = () => {
  const inputSystem = new InputSystem();
  const outputSystem = new OutputSystem();

  const world: World = new World();

  world.addSystem(inputSystem);

  world.addSystem(new PlayerSystem());

  world.addSystem(new ConversationSystem());

  world.addSystem(new ActionSystem());

  world.addSystem(new MovementSystem());

  world.addSystem(outputSystem);

  world.addEntity(null, demoPlayer);
  world.addEntity(null, greeter);

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
