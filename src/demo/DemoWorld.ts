import { Vector } from "general/Geometry/Geometry";
import { World } from "GameEngine/World";
import { Action } from "./InputEvent";
import { MovementSystem } from "./System/MovementSystem";
import { PlayerArchetype, PlayerSystem } from "./System/PlayerSystem";
import { ActionSystem } from "./System/ActionSystem";
import { InputSystem } from "./System/InputSystem";
import { OutputSystem } from "./System/OutputSystem";
import { Entity } from "GameEngine/Entity";
import { ConversationSystem } from "./System/ConversationSystem";
import {
  ObservationSystem,
  ObserverArchetype,
} from "./System/ObservationSystem";

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
    observable: {
      name: "The Player",
      description: "This is your avatar within the game world.",
    },
    player: { selfEntityId: null },
    observer: { observedEntities: [] },
  } as PlayerArchetype & ObserverArchetype,
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
    observable: {
      name: "The Greeter",
      description:
        "A formless entity poking and prodding at a mysterious, glowing device.",
    },
    ai: {},
  },
};

const inherentlyMysteriousDevice: Entity = {
  components: {
    transform: {
      position: Vector.create(2, -2),
    },
    motion: { velocity: Vector.create(0, 0) },
    actor: { action: Action.none },
    observable: {
      name: "The Inherently Mysterious Device",
      description:
        "A mysterious, glowing device emitting a soft hum. Somehow, the mystery of it feels embedded into it, rather than being a fact about a gap in your own knowledge.",
    },
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
  world.addSystem(new ObservationSystem());
  world.addSystem(outputSystem);

  world.addEntity(null, demoPlayer);
  world.addEntity(null, greeter);
  world.addEntity(null, inherentlyMysteriousDevice);

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
