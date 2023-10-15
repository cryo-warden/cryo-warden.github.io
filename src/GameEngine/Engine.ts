import { Subscribe } from "general/EventSystem";
import { EngineEvent, createEngineEventSystem } from "./EventSystem";
// import { MovementSystem, World } from "./World";
import { mockWorld } from "./mock";

type EngineAction = {
  type: "speak";
  content: string;
};

export type Engine = {
  subscribe: Subscribe<EngineEvent>;
  executeAction: (action: EngineAction) => void;
};

export const createEngine: () => Engine = () => {
  const eventSystem = createEngineEventSystem();
  // let world: World = new World();
  // world.addSystem(new MovementSystem());
  let world = mockWorld;

  return {
    subscribe: (type, listener) => eventSystem.subscribe(type, listener),
    executeAction: (action) => {
      if (action.type === "speak") {
        eventSystem.publish({
          type: "logMessage",
          message: action.content,
        });
      }
    },
  };
};
