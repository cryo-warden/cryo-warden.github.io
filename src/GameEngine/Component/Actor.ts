import { Vector } from "general/Vector";

export type Action =
  | {
      type: "none";
    }
  | {
      type: "move";
      direction: Vector;
    };

export type Actor = {
  action: Action;
};

export type ActionSource = {
  none: Action;
  move: (direction: Vector) => Action;
};

export const Action: ActionSource = {
  none: Object.freeze({ type: "none" }),
  move: (direction: Vector) => ({ type: "move", direction }),
};
