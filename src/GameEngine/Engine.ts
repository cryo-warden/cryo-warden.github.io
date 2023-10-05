import { Subscribe } from "general/EventSystem";
import { EngineEvent, createEngineEventSystem } from "./EventSystem";

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
