import { JsonSerializable } from "general/Object";
import { Vector } from "general/Vector";

export type Component = {
  [key: string]: JsonSerializable;
};

export interface TransformComponent extends Component {
  position: Vector;
}

export interface MoverComponent extends Component {
  velocity: Vector;
}

export type PathType = "library" | "descendant";

export type Path = [PathType, ...number[]];
