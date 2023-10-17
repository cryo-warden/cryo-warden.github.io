import { Vector } from "general/Vector";
import { Message } from "./OutputEvent";

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
      message: Message;
    };

export type ActionSource = {
  readonly none: Action;
  readonly move: (direction: Vector) => Action;
  readonly speak: (message: Message) => Action;
};

export const Action: ActionSource = {
  none: Object.freeze({ type: "none" }),
  move: (direction) => ({ type: "move", direction }),
  speak: (message) => ({ type: "speak", message }),
};

export type InputEvent = Action;
