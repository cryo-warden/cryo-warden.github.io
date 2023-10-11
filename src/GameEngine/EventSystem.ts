import { EventSystem, createEventSystem } from "general/EventSystem";

export type EngineEvent =
  | {
      type: "logMessage";
      message: string; // WIP
    }
  | {
      type: "newRoom";
      contents: any; // WIP
    }
  | {
      type: "entityExit";
      entityID: number; // WIP
    }
  | {
      type: "entityEnter";
      entityID: number; // WIP
    };

export const createEngineEventSystem = (): EventSystem<EngineEvent> =>
  createEventSystem<EngineEvent>();
