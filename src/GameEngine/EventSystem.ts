import { EventSystem, createEventSystem } from "general/EventSystem";
import { Vector } from "general/Vector";

export type OutputEvent =
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

export const createOutputEventSystem = (): EventSystem<OutputEvent> =>
  createEventSystem<OutputEvent>();

export type Action =
  | {
      type: "none";
    }
  | {
      type: "move";
      direction: Vector;
    }
  | {
      type: "speak";
      message: string;
    };

export type ActionSource = {
  readonly none: Action;
  readonly move: (direction: Vector) => Action;
  readonly speak: (message: string) => Action;
};

export const Action: ActionSource = {
  none: Object.freeze({ type: "none" }),
  move: (direction) => ({ type: "move", direction }),
  speak: (message) => ({ type: "speak", message }),
};

export type InputEvent = Action;

export const createInputEventSystem = (): EventSystem<InputEvent> =>
  createEventSystem<InputEvent>();
